import List "mo:base/List";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Utils "utils";
import Types "types";
import Memory "mo:base/ExperimentalStableMemory";

/* import BitcoinIntegration "./BitcoinIntegration";
import BitcoinApiTypes "bitcoin-api/Types";
 */
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

/* import Config "config"; */

import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Bool "mo:base/Bool";

/* import BitcoinTypes "mo:bitcoin/bitcoin/Types";
import Payments "./payments"; */
import EXTNFT "./v2";

actor {

  private stable var nextProduct : Types.ProductId = 1;
  private stable var nextVideo : Types.VideoId = 1;

  // Type import
  type ProductId = Types.ProductId;
  type ContactId = Types.ContactId;
  type CartId = Types.CartId;
  type WishlistId = Types.WishlistId;
  type SlugId = Types.SlugId;
  type CreateProductError = Types.CreateProductError;
  type GetProductError = Types.GetProductError;
  type UpdateProductError = Types.UpdateProductError;
  type DeleteProductError = Types.DeleteProductError;
  type CreateCartItemsError = Types.CreateCartItemsError;
  type GetCartItemsError = Types.GetCartItemsError;
  type UpdateCartItemsError = Types.UpdateCartItemsError;
  type DeleteCartItemsError = Types.DeleteCartItemsError;
  type CreateWishlistItemError = Types.CreateWishlistItemError;
  type GetWishlistItemError = Types.GetWishlistItemError;
  type UpdateWishlistItemError = Types.UpdateWishlistItemError;
  type DeleteWishlistItemError = Types.DeleteWishlistItemError;
  type CreateCategoryError = Types.CreateCategoryError;
  type CreateContactError = Types.CreateContactError;
  type GetContactError = Types.GetContactError;
  type DeleteContactError = Types.DeleteContactError;
  type UpdateContactError = Types.UpdateContactError;
  type GetCategoryError = Types.GetCategoryError;
  type UpdateCategoryError = Types.UpdateCategoryError;
  type DeleteCategoryError = Types.DeleteCategoryError;
  type Category = Types.Category;
  type Contact = Types.Contact;
  type UserContact = Types.UserContact;
  type UserProduct = Types.UserProduct;
  type Product = Types.Product;
  type CartItem = Types.CartItem;
  type WishlistItem = Types.WishlistItem;
  type Order = Types.Order;
  type NewOrder = Types.NewOrder;
  type OrderId = Types.OrderId;
  type OrderError = Types.OrderError;
  type OrderStatus = Types.OrderStatus;
  type PanelInfo = Types.PanelInfo;
  type ImgId = Types.ImgId;
  type Request = Types.Request;
  type Response = Types.Response;
  type Rating = Types.Rating;
  type Review = Types.Review;
  type User = Types.User;
  type Course = Types.Course;
  type UserId = Types.UserId;
  type VideoId = Types.VideoId;
  type NewVideo = Types.NewVideo;
  type Video = Types.Video;
  type CreateUserError = Types.CreateUserError;
  type GetUserError = Types.GetUserError;
  type UpdateUserError = Types.UpdateUserError;
  type DeleteUserError = Types.DeleteUserError;
  type CreateCourseError = Types.CreateCourseError;
  type GetCourseError = Types.GetCourseError;
  type UpdateCourseError = Types.UpdateCourseError;
  type DeleteCourseError = Types.DeleteCourseError;
  type CreateVideoError = Types.CreateVideoError;
  type GetVideoError = Types.GetVideoError;
  type UpdateVideoError = Types.UpdateVideoError;
  type DeleteVideoError = Types.DeleteVideoError;
  type DeleteOrderError = Types.DeleteOrderError;
  type UpdateOrderError = Types.UpdateOrderError;
  // Bitcoin Types
  /*  type GetUtxosResponse = BitcoinApiTypes.GetUtxosResponse;
  type MillisatoshiPerByte = BitcoinApiTypes.MillisatoshiPerByte;
  type SendRequest = BitcoinApiTypes.SendRequest;
  type Network = BitcoinApiTypes.Network;
  type BitcoinAddress = BitcoinApiTypes.BitcoinAddress;
  type Satoshi = BitcoinApiTypes.Satoshi; */

  private var products = Map.HashMap<SlugId, Product>(0, Text.equal, Text.hash);
  private var cartItems = Map.HashMap<CartId, CartItem>(0, Text.equal, Text.hash);
  private var wishlistItems = Map.HashMap<WishlistId, WishlistItem>(0, Text.equal, Text.hash);
  private var categories = Map.HashMap<SlugId, Category>(0, Text.equal, Text.hash);
  private var contacts = Map.HashMap<ContactId, Contact>(0, Text.equal, Text.hash);
  private var users = Map.HashMap<UserId, User>(0, Text.equal, Text.hash);
  private var courses = Map.HashMap<SlugId, Course>(0, Text.equal, Text.hash);
  private var videos = Map.HashMap<SlugId, Video>(0, Text.equal, Text.hash);

  private stable var stableproducts : [(SlugId, Product)] = [];
  private stable var stablecategories : [(SlugId, Category)] = [];
  private stable var stablecontacts : [(ContactId, Contact)] = [];

  private var orders = Map.HashMap<OrderId, Order>(0, Text.equal, Text.hash);
  private var addressToOrder = Map.HashMap<Text, OrderId>(0, Text.equal, Text.hash);
  private stable var stableorders : [(OrderId, Order)] = [];
  private stable var stableaddresstoorder : [(Text, OrderId)] = [];

  // for testing
  private stable var ownerExtendedPublicKeyBase58Check : Text = "tpubDD9S94RYo2MraS7QbRhA64Nr56BzCYN2orJUkk2LE4RkB2npb9SFyiCuofbapC9wNW2hLJqkWwSpGoaE9pZC6fLBQdms5HYS9dsvw79nSWy";
  private stable var currentChildKeyIndex : Nat = 0;
  //  Debug.print(debug_show ("currentChildKeyIndex: ", currentChildKeyIndex));

  // Image storage
  private stable var currentMemoryOffset : Nat64 = 2;
  private stable var stableimgOffset : [(ImgId, Nat64)] = [];
  private var imgOffset : Map.HashMap<ImgId, Nat64> = Map.fromIter(stableimgOffset.vals(), 0, Text.equal, Text.hash);
  private stable var stableimgSize : [(ImgId, Nat)] = [];
  private var imgSize : Map.HashMap<ImgId, Nat> = Map.fromIter(stableimgSize.vals(), 0, Text.equal, Text.hash);

  //access admin user
  let adminPrincipals : [Text] = [
    "7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae",
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe",
    "w57ef-rb36t-mgpgw-rxtct-phpom-mj7ss-4iois-i2xll-6x7jy-stvlo-sae",
  ];

  // create a default product, we will remove it later
  let p : Product = {
    id = 0;
    title = "Test product 1";
    category = "t-shirts";
    price = 5.0;
    inventory = 10;
    description = "Test product";
    status = "active";
    //img = "";
    img1 = "";
    img2 = "";
    img3 = "";
    slug = "test-product-0";
    time_created = Time.now();
    time_updated = Time.now()
  };

  products.put("test-product-0", p);

  // create a default category, we will remove it later
  let c : Category = {
    name = "T-shirts";
    slug = "t-shirts";
    status = "active"
  };

  categories.put("t-shirts", c);

  // create a default cart, we will remove it later
  /*   let ca : CartItem = {
    id = "qwerty";
    product_slug = "test-product-0";
    principal = "test-principal";
    qty = 1;
    time_created = Time.now();
    time_updated = Time.now()
  };

  cartItems.put("qwerty" , ca); */

  let ct : Contact = {
    id = "qwerty";
    name = "John Smith";
    email = "john.smith@gmail.com";
    message = "test";
    read = false;
    time_created = Time.now();
    time_updated = Time.now()
  };

  contacts.put("qwerty", ct);

  let g = Source.Source();

  public shared (msg) func createProduct(p : UserProduct) : async Result.Result<(Product), CreateProductError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);
    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );
    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    if (p.title == "") { return #err(#EmptyTitle) };
    let productId = nextProduct;
    nextProduct += 1;
    // increment the counter so we never try to create a product under the same index

    let newSlug = Utils.slugify(p.title) # "-" # Nat.toText(nextProduct); //this should keep slug always unique and we can key hashMap with it

    /*  var imgSlug : SlugId = "";
    switch (img) {
      case null {
        // do nothing if there is no image attached
      };
      case (?imageBlob) {
        storeBlobImg(newSlug, imageBlob);
        imgSlug := newSlug
      }
    }; */

    let product : Product = {
      title = p.title;
      id = productId;
      price = p.price;
      category = p.category;
      inventory = p.inventory;
      description = p.description;
      status = p.status;
      //img = imgSlug;
      img1 = p.img1;
      img2 = p.img2;
      img3 = p.img3;
      slug = newSlug;
      time_created = Time.now();
      time_updated = Time.now()
    };

    products.put(newSlug, product);
    return #ok(product);
    // Return an OK result
  };

  public query func getProduct(id : SlugId) : async Result.Result<Product, GetProductError> {
    let product = products.get(id);
    return Result.fromOption(product, #ProductNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func updateProduct(
    id : SlugId,
    p : UserProduct,
  ) : async Result.Result<(Product), UpdateProductError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    if (p.title == "") {
      return #err(#EmptyTitle)
    };

    let result = products.get(id);
    switch (result) {
      case null {
        // If the result is null, we return a ProductNotFound error.
        return #err(#ProductNotFound)
      };
      case (?v) {
        //If the product was found, we try to update it.
        /* var imgSlug : SlugId = v.img;
        switch (img) {
          case null {
            // do nothing if there is no image update
          };
          case (?imageBlob) {
            storeBlobImg(v.slug, imageBlob);
            imgSlug := v.slug
          }
        }; */

        let product : Product = {
          title = p.title;
          id = v.id;
          price = p.price;
          category = p.category;
          inventory = p.inventory;
          description = p.description;
          status = p.status;
          img1 = p.img1;
          img2 = p.img2;
          img3 = p.img3;
          //img = imgSlug;
          // keep persistent URLS
          slug = v.slug;
          time_created = v.time_created;
          // only update time_updated
          time_updated = Time.now()
        };
        products.put(id, product);
        return #ok(product)
      }
    }
  };

  public shared (msg) func deleteProduct(id : SlugId) : async Result.Result<(), DeleteProductError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    products.delete(id);
    return #ok(())
  };

  public query func listProducts() : async [(SlugId, Product)] {
    return Iter.toArray(products.entries())
  };

  //category

  public shared (msg) func createCategory(name : Text, status : Text) : async Result.Result<(Category), CreateCategoryError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    // Check if the name is empty
    if (name == "") { return #err(#EmptyName) };

    // Generate a new slug for the category
    let new_slug = Utils.slugify(name);

    // Check if the category already exists
    switch (categories.get(new_slug)) {
      case null {
        // Category doesn't exist, create a new one
        let category : Category = {
          name = name;
          slug = new_slug;
          status = status
        };

        categories.put(new_slug, category);
        return #ok(category)
      };
      case (?v) {
        // Category already exists
        return #err(#CategoryAlreadyExists)
      }
    }
  };

  public shared (msg) func updateCategory(
    id : SlugId,
    name : Text,
    status : Text,
  ) : async Result.Result<(Category), UpdateCategoryError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    if (name == "") {
      return #err(#EmptyName)
    };

    let result = categories.get(id);

    switch (result) {
      case null {
        return #err(#CategoryNotFound)
      };
      case (?v) {
        let category : Category = {
          name = name;
          slug = v.slug;
          status = status
        };
        categories.put(id, category);
        return #ok(category)
      }
    }
  };

  public query func getCategory(id : SlugId) : async Result.Result<Category, GetCategoryError> {
    let category = categories.get(id);
    return Result.fromOption(category, #CategoryNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func deleteCategory(id : SlugId) : async Result.Result<(), DeleteCategoryError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    categories.delete(id);
    return #ok(())
  };

  public query func listCategories() : async [(SlugId, Category)] {
    return Iter.toArray(categories.entries())
  };

  // Preupgrade function will store all posts into stable array before update
  system func preupgrade() {
    stableproducts := Iter.toArray(products.entries());
    stablecategories := Iter.toArray(categories.entries());
    stableorders := Iter.toArray(orders.entries());
    stableaddresstoorder := Iter.toArray(addressToOrder.entries());
    stableimgOffset := Iter.toArray(imgOffset.entries());
    stableimgSize := Iter.toArray(imgSize.entries());

  };

  // Postupgrade function will then poppulate HashMap with posts after the update is finished
  system func postupgrade() {
    products := Map.fromIter<SlugId, Product>(
      stableproducts.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    categories := Map.fromIter<SlugId, Category>(
      stablecategories.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    orders := Map.fromIter<OrderId, Order>(
      stableorders.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    addressToOrder := Map.fromIter<Text, OrderId>(
      stableaddresstoorder.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    stableimgOffset := [];
    stableimgSize := []
  };

  // payments

  /*  public shared (msg) func getOwnerXPUB() : async Result.Result<Text, Payments.XPUBManipulationError> {
    // if(Utils.isAdmin(msg.caller)){
    //     return #err(#UserNotAdmin); // We require the user to be admin
    // };
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    return #ok(ownerExtendedPublicKeyBase58Check)
  }; */

  /*   public shared (msg) func setOwnerXPUB(xpub : Text) : async Result.Result<(), Payments.GetParseError> {
    // if(Utils.isAdmin(msg.caller)){
    //     return #err(#UserNotAdmin); // We require the user to be admin
    // };
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    switch (Payments.parse(xpub, Config.config.network)) {
      case null return #err(#Base58PubKeyWrongFormatError);
      case (?parsedPublicKey) {
        ownerExtendedPublicKeyBase58Check := xpub;
        return #ok(())
      }
    }
  }; */

  /*   public shared (msg) func deleteOwnerXPUB() : async Result.Result<(), Payments.XPUBManipulationError> {
    // if(Utils.isAdmin(msg.caller)){
    //     return #err(#UserNotAdmin); // We require the user to be admin
    // };
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    ownerExtendedPublicKeyBase58Check := "";
    currentChildKeyIndex := 0;
    return #ok(())
  }; */

  /*   public shared (msg) func getAdminPanelInfo() : async Result.Result<PanelInfo, Payments.XPUBManipulationError> {
    // if(Utils.isAdmin(msg.caller)){
    //     return #err(#UserNotAdmin); // We require the user to be admin
    // };
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };

    let getTotalPrice = func(order : Order) : Satoshi {
      return order.totalPrice
    };
    // hashmap values iter to array of orders
    var orderValues = Iter.toArray<Order>(orders.vals());
    // orders array to totalPrices array
    var values = Array.map<Order, Satoshi>(orderValues, getTotalPrice);
    // reduce totalPrices
    var totalRevenue : Satoshi = Array.foldLeft<Satoshi, Satoshi>(values, 0, Nat64.add);

    var info : PanelInfo = {
      ordersCount = orders.size();
      totalRevenue = totalRevenue;
      accountBalance = await BitcoinIntegration.get_total_balance(ownerExtendedPublicKeyBase58Check, currentChildKeyIndex)
    };

    return #ok(info)
  }; */

  /*   public func generateNextPaymentAddress() : async Result.Result<Text, Payments.GetDerivationError> {
    if (ownerExtendedPublicKeyBase58Check == "") {
      return #err(#OwnerExtendedPubKeyNotSet)
    };
    return switch (Payments.parse(ownerExtendedPublicKeyBase58Check, Config.config.network)) {
      case null return #err(#Base58PubKeyWrongFormatError);
      case (?parsedPublicKey) {
        switch (parsedPublicKey.derivePath(Payments.getRelativePath(0))) {
          case null return #err(#ChildKeyDerivationError);
          case (?derivedFirstNonHardenedChild) {
            switch (derivedFirstNonHardenedChild.derivePath(Payments.getRelativePath(currentChildKeyIndex))) {
              case null return #err(#ChildKeyDerivationError);
              case (?derived) {
                currentChildKeyIndex := currentChildKeyIndex + 1;
                let address : Text = Payments.getP2PKHAddress(derived.key, Config.config.network);
                return #ok(address)
              }
            }
          }
        }
      }
    }
  }; */

  public func createOrder(order : NewOrder) : async Result.Result<Order, OrderError> {
    return switch (addressToOrder.get(order.paymentAddress)) {
      case (?order) return #err(#PaymentAddressAlreadyUsed);
      case null {
        let orderId : OrderId = UUID.toText(await g.new());

        var newOrder : Order = {
          id = orderId;
          shippingAddress = order.shippingAddress;
          products = order.products;
          userId = order.userId;
          totalAmount = order.totalAmount;
          subTotalAmount = order.subTotalAmount;
          shippingAmount = order.shippingAmount;
          orderStatus = order.orderStatus;
          paymentStatus = order.paymentStatus;
          paymentAddress = order.paymentAddress;
          paymentMethod = order.paymentMethod;
          awb = order.awb;
          timeCreated = Time.now();
          timeUpdated = Time.now()
        };

        orders.put(orderId, newOrder);
        addressToOrder.put(newOrder.paymentAddress, newOrder.id);

        return #ok(newOrder)
      }
    }
  };

  public shared (msg) func updateTrackingUrl(id : OrderId, awb : Text) : async Result.Result<(Order), UpdateOrderError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    let result = orders.get(id);
    switch (result) {
      case null {
        return #err(#OrderNotFound)
      };
      case (?v) {
        let order : Order = {
          id = v.id;
          shippingAddress = v.shippingAddress;
          products = v.products;
          userId = v.userId;
          totalAmount = v.totalAmount;
          subTotalAmount = v.subTotalAmount;
          shippingAmount = v.shippingAmount;
          orderStatus = v.orderStatus;
          paymentStatus = v.paymentStatus;
          paymentAddress = v.paymentAddress;
          paymentMethod = v.paymentMethod;
          awb = awb;
          timeCreated = v.timeCreated;
          timeUpdated = Time.now()
        };
        orders.put(id, order);
        return #ok(order)
      }
    }
  };

   public shared (msg) func updateOrderStatus(id : OrderId, orderStatus : Text) : async Result.Result<(Order), UpdateOrderError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    let result = orders.get(id);
    switch (result) {
      case null {
        return #err(#OrderNotFound)
      };
      case (?v) {
        let order : Order = {
          id = v.id;
          shippingAddress = v.shippingAddress;
          products = v.products;
          userId = v.userId;
          totalAmount = v.totalAmount;
          subTotalAmount = v.subTotalAmount;
          shippingAmount = v.shippingAmount;
          orderStatus = orderStatus;
          paymentStatus = v.paymentStatus;
          paymentAddress = v.paymentAddress;
          paymentMethod = v.paymentMethod;
          awb = v.awb;
          timeCreated = v.timeCreated;
          timeUpdated = Time.now()
        };
        orders.put(id, order);
        return #ok(order)
      }
    }
  };

   public shared (msg) func updatePaymentStatus(id : OrderId, paymentStatus : Text) : async Result.Result<(Order), UpdateOrderError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    let result = orders.get(id);
    switch (result) {
      case null {
        return #err(#OrderNotFound)
      };
      case (?v) {
        let order : Order = {
          id = v.id;
          shippingAddress = v.shippingAddress;
          products = v.products;
          userId = v.userId;
          totalAmount = v.totalAmount;
          subTotalAmount = v.subTotalAmount;
          shippingAmount = v.shippingAmount;
          orderStatus = v.orderStatus;
          paymentStatus = paymentStatus;
          paymentAddress = v.paymentAddress;
          paymentMethod = v.paymentMethod;
          awb = v.awb;
          timeCreated = v.timeCreated;
          timeUpdated = Time.now()
        };
        orders.put(id, order);
        return #ok(order)
      }
    }
  };

  public query func listOrders() : async [(OrderId, Order)] {
    // if(Utils.isAdmin(msg.caller)){
    //     return #err(#UserNotAdmin); // We require the user to be admin
    // };
    return Iter.toArray(orders.entries())
  };

  public shared (msg) func deleteOrder(id : OrderId) : async Result.Result<(), DeleteOrderError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    orders.delete(id);
    return #ok(())
  };

  public query func getOrder(orderId : Text) : async Result.Result<Order, OrderError> {
    let order = orders.get(orderId);
    return Result.fromOption(order, #OrderNotFound)
  };

  /*  public func setUserInputTransactionId(address : Text, transactionId : Text) : async Result.Result<OrderId, OrderError> {
    return switch (addressToOrder.get(address)) {
      case null return #err(#OrderNotFound);
      case (?orderId) {
        switch (orders.get(orderId)) {
          case null return #err(#OrderNotFound);
          case (?order) {

            var newOrder : Order = {
              id = order.id;
              shippingAddress = order.shippingAddress;
              products = order.products;
              userId = order.userId;
              totalAmount = order.totalAmount;
              subTotalAmount = order.subTotalAmount;
              shippingAmount = order.shippingAmount;
              status = order.status;
              paymentAddress = order.paymentAddress;
              paymentMethod = order.paymentMethod;
              timeCreated = order.timeCreated;
              transactionId = transactionId
            };
            orders.put(newOrder.id, newOrder);
            return #ok(order.id)
          }
        }
      }
    }
  }; */

  /*   public func checkOrderStatus(orderId : Text) : async Result.Result<OrderStatus, OrderError> {
    return switch (orders.get(orderId)) {
      case null return #err(#OrderNotFound);
      case (?order) {
        let transactionBalance : Satoshi = await BitcoinIntegration.get_balance_of_transaction(order.paymentAddress, order.transactionId);
        //        Debug.print(debug_show (transactionBalance, order.totalPrice));
        if (transactionBalance == order.totalPrice) {
          var newOrder = {
            id = orderId;
            shippingAddress = order.shippingAddress;
            products = order.products;
            totalPrice = order.totalPrice;
            status = #Verified;
            paymentAddress = order.paymentAddress;
            timeCreated = order.timeCreated;
            transactionId = order.transactionId
          };
          orders.put(orderId, newOrder);
          return #ok(newOrder.status)
        };
        return #ok(order.status)
      }
    }
  }; */

  public shared query ({ caller }) func greet(name : Text) : async Text {
    return "Hello, " # name # "! " # "Your PrincipalId is: " # Principal.toText(caller)
  };

  // Images
  private func storeBlobImg(imgId : ImgId, value : Blob) {
    var size : Nat = Nat32.toNat(Nat32.fromIntWrap(value.size()));
    // Each page is 64KiB (65536 bytes)
    var growBy : Nat = size / 65536 + 1;
    let a = Memory.grow(Nat64.fromNat(growBy));
    Memory.storeBlob(currentMemoryOffset, value);
    imgOffset.put(imgId, currentMemoryOffset);
    imgSize.put(imgId, size);
    size := size + 4;
    currentMemoryOffset += Nat64.fromNat(size)
  };

  private func loadBlobImg(imgId : ImgId) : ?Blob {
    let offset = imgOffset.get(imgId);
    switch (offset) {
      case (null) {
        return null
      };
      case (?offset) {
        let size = imgSize.get(imgId);
        switch (size) {
          case (null) {
            return null
          };
          case (?size) {
            return ?Memory.loadBlob(offset, size)
          }
        }
      }
    }
  };

  public query func http_request(request : Request) : async Response {
    if (Text.contains(request.url, #text("imgid"))) {
      let imgId = Iter.toArray(Text.tokens(request.url, #text("imgid=")))[1];
      var pic = loadBlobImg(imgId);
      switch (pic) {
        case (null) {
          return Utils.http404(?"no picture available")
        };
        case (?existingPic) {
          return Utils.picture(existingPic)
        }
      }
    };
    return Utils.http404(?"Path not found.")
  };

  //contact
  public shared (msg) func createContact(co : UserContact) : async Result.Result<(Contact), CreateContactError> {

    if (co.name == "") { return #err(#EmptyName) };
    if (co.email == "") { return #err(#EmptyEmail) };
    if (co.message == "") { return #err(#EmptyMessage) };

    let contactId : ContactId = UUID.toText(await g.new());

    let contact : Contact = {
      id = contactId;
      name = co.name;
      email = co.email;
      message = co.message;
      read = co.read;
      time_created = Time.now();
      time_updated = Time.now()
    };

    contacts.put(contactId, contact);
    return #ok(contact)
  };

  public shared (msg) func updateContact(
    id : ContactId,
    read : Bool,
  ) : async Result.Result<(Contact), UpdateContactError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    let result = contacts.get(id);
    switch (result) {
      case null {
        return #err(#ContactNotFound)
      };
      case (?v) {
        let contact : Contact = {
          id = id;
          email = v.email;
          name = v.name;
          message = v.message;
          read = read;
          time_created = v.time_created;
          // only update time_updated
          time_updated = Time.now()
        };
        contacts.put(id, contact);
        return #ok(contact)
      }
    }
  };

  public query func getContact(id : ContactId) : async Result.Result<Contact, GetContactError> {
    let contact = contacts.get(id);
    return Result.fromOption(contact, #ContactNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func deleteContact(id : ContactId) : async Result.Result<(), DeleteContactError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    contacts.delete(id);
    return #ok(())
  };

  public query func listContacts() : async [(ContactId, Contact)] {
    return Iter.toArray(contacts.entries())
  };

  //cartitems list
  public shared (msg) func addtoCartItems(product_slug : Text, qty : Int) : async Result.Result<(CartItem), CreateCartItemsError> {

    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    };

    if (product_slug == "") { return #err(#EmptyProductSlug) };

    let cartId : CartId = UUID.toText(await g.new());

    let userP : Principal = msg.caller;

    let cartItem : CartItem = {
      id = cartId;
      product_slug = product_slug;
      principal = userP;
      qty = qty;
      time_created = Time.now();
      time_updated = Time.now()
    };

    cartItems.put(cartId, cartItem);
    return #ok(cartItem);

  };

  public query (msg) func getCartItems(id : CartId) : async Result.Result<CartItem, GetCartItemsError> {
    let cartItem = cartItems.get(id);
    return Result.fromOption(cartItem, #CartItemNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func updateCartItems(
    id : CartId,
    qty : Int,
  ) : async Result.Result<(CartItem), UpdateCartItemsError> {
    // commented for local development
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    };

    let result = cartItems.get(id);
    switch (result) {
      case null {
        // If the result is null, we return a ProductNotFound error.
        return #err(#CartItemNotFound)
      };
      case (?v) {

        let cartItem : CartItem = {
          id = v.id;
          product_slug = v.product_slug;
          principal = v.principal;
          qty = qty;
          time_created = v.time_created;
          time_updated = Time.now()
        };
        cartItems.put(id, cartItem);
        return #ok(cartItem)
      }
    }
  };

  public shared (msg) func deleteCartItems(id : CartId) : async Result.Result<(), DeleteCartItemsError> {

    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    cartItems.delete(id);
    return #ok(())
  };

  public query func listCartItems() : async [(CartId, CartItem)] {
    /* if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */

    return Iter.toArray(cartItems.entries())
  };

  //wishlistitems list
  public shared (msg) func addtoWishlist(product_slug : Text) : async Result.Result<(WishlistItem), CreateWishlistItemError> {

    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    };

    if (product_slug == "") { return #err(#EmptyProductSlug) };

    let wishlistId : WishlistId = UUID.toText(await g.new());

    let userP : Principal = msg.caller;

    let wishlistItem : WishlistItem = {
      id = wishlistId;
      product_slug = product_slug;
      principal = userP;
      time_created = Time.now();
      time_updated = Time.now()
    };

    wishlistItems.put(wishlistId, wishlistItem);
    return #ok(wishlistItem);

  };

  /*   public query (msg) func getCartItems(id : CartId) : async Result.Result<CartItem, GetCartItemsError> {
    let cartItem = cartItems.get(id);
    return Result.fromOption(cartItem, #CartItemNotFound);
    // If the post is not found, this will return an error as result.
  }; */

  public shared (msg) func updateWishlistItems(
    id : WishlistId
  ) : async Result.Result<(WishlistItem), UpdateWishlistItemError> {
    // commented for local development
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    };

    let result = wishlistItems.get(id);
    switch (result) {
      case null {
        // If the result is null, we return a ProductNotFound error.
        return #err(#WishlistItemNotFound)
      };
      case (?v) {

        let wishlistItem : WishlistItem = {
          id = v.id;
          product_slug = v.product_slug;
          principal = v.principal;
          time_created = v.time_created;
          time_updated = Time.now()
        };
        wishlistItems.put(id, wishlistItem);
        return #ok(wishlistItem)
      }
    }
  };

  public shared (msg) func deleteWishlistItems(id : WishlistId) : async Result.Result<(), DeleteWishlistItemError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    wishlistItems.delete(id);
    return #ok(())
  };

  public query func listWishlistItems() : async [(WishlistId, WishlistItem)] {

    return Iter.toArray(wishlistItems.entries())
  };

  //user list
  public shared (msg) func createUser(email : Text, discord : Text, twitter : Text) : async Result.Result<(User), CreateUserError> {

    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    };
    if (email == "") { return #err(#EmptyEmail) };

    //let userId : UserId = UUID.toText(await g.new());

    let userP : Principal = msg.caller;

    let p = Principal.toText(userP);

    let user : User = {
      id = p;
      //principal = userP;
      email = email;
      discord = discord;
      twitter = twitter;
      time_created = Time.now();
      time_updated = Time.now()
    };

    users.put(p, user);
    return #ok(user);

  };

  public query (msg) func getUser(id : UserId) : async Result.Result<User, GetUserError> {
    let user = users.get(id);
    return Result.fromOption(user, #UserNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func updateUser(id : UserId) : async Result.Result<(User), UpdateUserError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    let result = users.get(id);
    switch (result) {
      case null {
        return #err(#UserNotFound)
      };
      case (?v) {

        let user : User = {
          id = v.id;
          //principal = v.principal;
          email = v.email;
          discord = v.discord;
          twitter = v.twitter;
          time_created = v.time_created;
          time_updated = Time.now()
        };
        users.put(id, user);
        return #ok(user)
      }
    }
  };

  public shared (msg) func deleteUser(id : UserId) : async Result.Result<(), DeleteUserError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    users.delete(id);
    return #ok(())
  };

  public query func listUsers() : async [(UserId, User)] {
    /* if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */

    return Iter.toArray(users.entries())
  };

  //course
  public shared (msg) func createCourse(title : Text, status : Text) : async Result.Result<(Course), CreateCourseError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    if (title == "") { return #err(#EmptyTitle) };

    let new_slug = Utils.slugify(title);

    let result = courses.get(new_slug);
    switch (result) {
      case null {
        let course : Course = {
          title = title;
          slug = new_slug;
          status = status
        };

        courses.put(new_slug, course);
        return #ok(course)
      };
      case (?v) {
        // We want category to exist only once
        return #err(#CourseAlreadyExists)
      }
    }
  };

  public shared (msg) func updateCourse(
    id : SlugId,
    title : Text,
    status : Text,
  ) : async Result.Result<(Course), UpdateCourseError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    if (title == "") {
      return #err(#EmptyTitle)
    };

    let result = courses.get(id);

    switch (result) {
      case null {
        return #err(#CourseNotFound)
      };
      case (?v) {
        let course : Course = {
          title = title;
          slug = v.slug;
          status = status
        };
        courses.put(id, course);
        return #ok(course)
      }
    }
  };

  public query func getCourse(id : SlugId) : async Result.Result<Course, GetCourseError> {
    let course = courses.get(id);
    return Result.fromOption(course, #CourseNotFound);
    // If the post is not found, this will return an error as result.
  };

  public shared (msg) func deleteCourse(id : SlugId) : async Result.Result<(), DeleteCourseError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    courses.delete(id);
    return #ok(())
  };

  public query func listCourse() : async [(SlugId, Course)] {
    return Iter.toArray(courses.entries())
  };

  //video function

  public shared (msg) func createVideo(vd : NewVideo) : async Result.Result<(Video), CreateVideoError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };
    if (vd.title == "") { return #err(#EmptyTitle) };

    let videoId = nextVideo;
    nextVideo += 1;

    let newSlug = Utils.slugify(vd.title) # "-" # Nat.toText(nextVideo); //this should keep slug always unique and we can key hashMap with it

    /* var imgSlug : SlugId = "";
    switch (img) {
      case null {
        // do nothing if there is no image attached
      };
      case (?imageBlob) {
        storeBlobImg(newSlug, imageBlob);
        imgSlug := newSlug
      }
    }; */

    let video : Video = {
      title = vd.title;
      id = videoId;
      course = vd.course;
      video_url = vd.video_url;
      description = vd.description;
      status = vd.status;
      img1 = vd.img1;
      //img = imgSlug;
      slug = newSlug;
      time_created = Time.now();
      time_updated = Time.now()
    };

    videos.put(newSlug, video);
    return #ok(video);
    // Return an OK result
  };

  public query func getVideo(id : SlugId) : async Result.Result<Video, GetVideoError> {
    let video = videos.get(id);
    return Result.fromOption(video, #VideoNotFound)
  };

  public shared (msg) func updateVideo(
    id : SlugId,
    vd : NewVideo,
  ) : async Result.Result<(Video), UpdateVideoError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    if (vd.title == "") {
      return #err(#EmptyTitle)
    };

    let result = videos.get(id);
    switch (result) {
      case null {
        return #err(#VideoNotFound)
      };
      case (?v) {
        /* var imgSlug : SlugId = v.img;
        switch (img) {
          case null {
            // do nothing if there is no image update
          };
          case (?imageBlob) {
            storeBlobImg(v.slug, imageBlob);
            imgSlug := v.slug
          }
        };
 */
        let video : Video = {
          title = vd.title;
          id = v.id;
          course = vd.course;
          video_url = vd.video_url;
          description = vd.description;
          status = vd.status;
          //img = imgSlug;
          img1 = vd.img1;
          // keep persistent URLS
          slug = v.slug;
          time_created = v.time_created;
          // only update time_updated
          time_updated = Time.now()
        };
        videos.put(id, video);
        return #ok(video)
      }
    }
  };

  public shared (msg) func deleteVideo(id : SlugId) : async Result.Result<(), DeleteVideoError> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated)
    };
    let userPrincipalStr = Principal.toText(msg.caller);

    // Check if the caller is an admin
    let isAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (isAdmin) {
      case null { return #err(#UserNotAdmin) };
      case _ {}
    };

    videos.delete(id);
    return #ok(())
  };

  public query func listVideos() : async [(SlugId, Video)] {
    return Iter.toArray(videos.entries())
  };

  //admin function
  public func isAdmin(userPrincipal : Text) : async Bool {
    let userPrincipalStr = userPrincipal;
    let foundAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal
      },
    );

    switch (foundAdmin) {
      case (null) { return false };
      case (_) { return true }
    }
  };

}
