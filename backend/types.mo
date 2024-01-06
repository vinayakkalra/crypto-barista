import Time "mo:base/Time";
import Float "mo:base/Float";
//import BitcoinApiTypes "bitcoin-api/Types";

module {

  public type ProductId = Nat;
  public type CartId = Text;
  public type WishlistId = Text;
  public type ContactId = Text;
  public type VideoId = Nat;
  public type SlugId = Text;
  public type UserId = Text;

  public type CreateProductError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle
  };

  public type GetProductError = {
    #ProductNotFound
  };

  public type UpdateProductError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle;
    #ProductNotFound
  };

  public type DeleteProductError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type CreateCartItemsError = {
    #UserNotAuthenticated;
    #EmptyProductSlug;
    #ProductSlugAlreadyExists;
    #UserNotAdmin
  };

  public type GetCartItemsError = {
    #CartItemNotFound
  };

  public type UpdateCartItemsError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #CartItemNotFound
  };

  public type DeleteCartItemsError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type CreateWishlistItemError = {
    #UserNotAuthenticated;
    #EmptyProductSlug;
    #WishlistItemAlreadyExists;
    #UserNotAdmin
  };

  public type GetWishlistItemError = {
    #WishlistItemNotFound
  };

  public type UpdateWishlistItemError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #WishlistItemNotFound
  };

  public type DeleteWishlistItemError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type CreateUserError = {
    #UserNotAuthenticated;
    #EmailAlreadyExists;
    #EmptyEmail;
    #UserNotAdmin
  };

  public type GetUserError = {
    #UserNotFound
  };

  public type UpdateUserError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #UserNotFound
  };

  public type DeleteUserError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type CreateCategoryError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyName;
    #CategoryAlreadyExists;
    // TODO add verification to category_create function
  };

  public type GetCategoryError = {
    #CategoryNotFound
  };

  public type UpdateCategoryError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyName;
    #CategoryNotFound
  };

  public type DeleteCategoryError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  //contact
  public type CreateContactError = {
    #EmptyName;
    #EmptyEmail;
    #EmptyMessage
  };

  public type GetContactError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #ContactNotFound
  };

  public type UpdateContactError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyName;
    #EmptyEmail;
    #EmptyMessage;
    #ContactNotFound
  };

  public type DeleteContactError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type OrderError = {
    #MissingData;
    #PaymentAddressAlreadyUsed;
    #UnableToCreate;
    #OrderNotFound;
    #UnableToUpdate
  };

    public type UpdateOrderError = {
    #OrderNotFound;
        #UserNotAuthenticated;
    #UserNotAdmin;
  };

  public type DeleteOrderError = {
    #OrderNotFound;
        #UserNotAuthenticated;
    #UserNotAdmin;
  };

  public type CreateCourseError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle;
    #CourseAlreadyExists
  };

  public type GetCourseError = {
    #CourseNotFound
  };

  public type UpdateCourseError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle;
    #CourseNotFound
  };

  public type DeleteCourseError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type CreateVideoError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle;
    #VideoAlreadyExists
  };

  public type GetVideoError = {
    #VideoNotFound
  };

  public type UpdateVideoError = {
    #UserNotAuthenticated;
    #UserNotAdmin;
    #EmptyTitle;
    #VideoNotFound
  };

  public type DeleteVideoError = {
    #UserNotAdmin;
    #UserNotAuthenticated
  };

  public type Review = {
    userId : Text;
    productId : Nat;
    reviewText : Text
  };

  public type Rating = {
    userId : Text;
    productId : Nat;
    rate : Nat
  };

  public type Category = {
    name : Text;
    slug : Text;
    status : Text
  };

  //contact

  public type UserContact = {
    name : Text;
    email : Text;
    message : Text;
    read : Bool
  };

  public type Contact = UserContact and {
    id : ContactId;
    time_created : Time.Time;
    time_updated : Time.Time
  };

  //user login
  public type User = {
    id : UserId;
    email : Text;
    discord : Text;
    twitter : Text;
    time_created : Time.Time;
    time_updated : Time.Time
  };

  // User input data
  public type UserProduct = {
    title : Text;
    price : Float;
    inventory : Nat8;
    description : Text;
    category : SlugId;
    img1: Text;
    img2: Text;
    img3: Text;
    status : Text;
  };

  // Backend data
  public type Product = UserProduct and {
    id : ProductId;
    slug : Text;
    //img : ImgId;
    time_created : Time.Time;
    time_updated : Time.Time
  };

  // cart items
  public type CartItem = {
    id : CartId;
    product_slug : Text;
    principal : Principal;
    qty : Int;
    time_created : Time.Time;
    time_updated : Time.Time
  };

  // wishlist items
  public type WishlistItem = {
    id : WishlistId;
    product_slug : Text;
    principal : Principal;
    time_created : Time.Time;
    time_updated : Time.Time
  };

  public type ShippingAddress = {
    mail : Text;
    firstName : Text;
    lastName : Text;
    street : Text;
    city : Text;
    state : Text;
    postCode : Text;
    country : Text;
    mobile : Text
  };

  public type OrderId = Text;
  public type OrderProduct = {
    id : ProductId;
    title : Text;
    description : Text;
    price : Float;
    slug : Text;
    img1 : Text;
    quantity : Nat8
  };

  public type OrderStatus = {
    #UserConfirmedPayment;
    #TransactionIdSet;
    #Verified
  };

  public type NewOrder = {
    shippingAddress : ShippingAddress;
    products : [OrderProduct];
    userId : Text;
    totalAmount : Float;
    subTotalAmount : Float;
    shippingAmount : Float;
    paymentAddress : Text;
    paymentMethod : Text;
    orderStatus : Text;
    paymentStatus : Text;
    awb : Text;
  };

  public type Order = NewOrder and {
    id : OrderId;
    timeCreated : Time.Time;
    timeUpdated : Time.Time;
  };

  public type PanelInfo = {
    ordersCount : Nat;
    // totalRevenue : BitcoinApiTypes.Satoshi;
    // accountBalance : BitcoinApiTypes.Satoshi;
  };

  public type ImgId = Text;

  public type HeaderField = (Text, Text);

  public type StreamingStrategy = {
    #Callback : {
      callback : StreamingCallback;
      token : StreamingCallbackToken
    }
  };

  public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

  public type StreamingCallbackToken = {
    content_encoding : Text;
    index : Nat;
    key : Text
  };

  public type StreamingCallbackResponse = {
    body : Blob;
    token : ?StreamingCallbackToken
  };

  public type Request = {
    body : Blob;
    headers : [HeaderField];
    method : Text;
    url : Text
  };

  public type Response = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?StreamingStrategy;
    status_code : Nat16
  };

  public type Course = {
    title : Text;
    slug : Text;
    status : Text
  };

  // User input data
  public type NewVideo = {
    title : Text;
    description : Text;
    course : Text;
    video_url : Text;
    status : Text;
    img1: Text;
  };

  // Backend data
  public type Video = NewVideo and {
    id : VideoId;
    slug : Text;
    //img : ImgId;
    time_created : Time.Time;
    time_updated : Time.Time
  };

}
