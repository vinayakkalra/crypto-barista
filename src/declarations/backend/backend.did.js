export const idlFactory = ({ IDL }) => {
  const CartId__1 = IDL.Text;
  const Time = IDL.Int;
  const CartItem = IDL.Record({
    'id' : CartId__1,
    'qty' : IDL.Int,
    'time_created' : Time,
    'principal' : IDL.Principal,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
  });
  const CreateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'ProductSlugAlreadyExists' : IDL.Null,
  });
  const Result_33 = IDL.Variant({
    'ok' : CartItem,
    'err' : CreateCartItemsError,
  });
  const WishlistId__1 = IDL.Text;
  const WishlistItem = IDL.Record({
    'id' : WishlistId__1,
    'time_created' : Time,
    'principal' : IDL.Principal,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
  });
  const CreateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'WishlistItemAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_32 = IDL.Variant({
    'ok' : WishlistItem,
    'err' : CreateWishlistItemError,
  });
  const Category = IDL.Record({
    'status' : IDL.Text,
    'name' : IDL.Text,
    'slug' : IDL.Text,
  });
  const CreateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_31 = IDL.Variant({
    'ok' : Category,
    'err' : CreateCategoryError,
  });
  const UserContact = IDL.Record({
    'name' : IDL.Text,
    'read' : IDL.Bool,
    'email' : IDL.Text,
    'message' : IDL.Text,
  });
  const ContactId__1 = IDL.Text;
  const Contact = IDL.Record({
    'id' : ContactId__1,
    'time_created' : Time,
    'name' : IDL.Text,
    'read' : IDL.Bool,
    'email' : IDL.Text,
    'time_updated' : Time,
    'message' : IDL.Text,
  });
  const CreateContactError = IDL.Variant({
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_30 = IDL.Variant({ 'ok' : Contact, 'err' : CreateContactError });
  const Course = IDL.Record({
    'status' : IDL.Text,
    'title' : IDL.Text,
    'slug' : IDL.Text,
  });
  const CreateCourseError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CourseAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_29 = IDL.Variant({ 'ok' : Course, 'err' : CreateCourseError });
  const ShippingAddress = IDL.Record({
    'postCode' : IDL.Text,
    'street' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'mail' : IDL.Text,
    'state' : IDL.Text,
    'mobile' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const ProductId = IDL.Nat;
  const OrderProduct = IDL.Record({
    'id' : ProductId,
    'title' : IDL.Text,
    'img1' : IDL.Text,
    'slug' : IDL.Text,
    'description' : IDL.Text,
    'quantity' : IDL.Nat8,
    'price' : IDL.Float64,
  });
  const NewOrder = IDL.Record({
    'awb' : IDL.Text,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : IDL.Float64,
    'orderStatus' : IDL.Text,
    'userId' : IDL.Text,
    'paymentAddress' : IDL.Text,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : ShippingAddress,
    'products' : IDL.Vec(OrderProduct),
    'subTotalAmount' : IDL.Float64,
  });
  const OrderId__1 = IDL.Text;
  const Order = IDL.Record({
    'id' : OrderId__1,
    'awb' : IDL.Text,
    'timeUpdated' : Time,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : IDL.Float64,
    'orderStatus' : IDL.Text,
    'userId' : IDL.Text,
    'paymentAddress' : IDL.Text,
    'timeCreated' : Time,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : ShippingAddress,
    'products' : IDL.Vec(OrderProduct),
    'subTotalAmount' : IDL.Float64,
  });
  const OrderError = IDL.Variant({
    'PaymentAddressAlreadyUsed' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'MissingData' : IDL.Null,
    'UnableToCreate' : IDL.Null,
    'UnableToUpdate' : IDL.Null,
  });
  const Result_12 = IDL.Variant({ 'ok' : Order, 'err' : OrderError });
  const SlugId__1 = IDL.Text;
  const UserProduct = IDL.Record({
    'status' : IDL.Text,
    'title' : IDL.Text,
    'img1' : IDL.Text,
    'img2' : IDL.Text,
    'img3' : IDL.Text,
    'inventory' : IDL.Nat8,
    'description' : IDL.Text,
    'category' : SlugId__1,
    'price' : IDL.Float64,
  });
  const Product = IDL.Record({
    'id' : ProductId,
    'status' : IDL.Text,
    'time_created' : Time,
    'title' : IDL.Text,
    'img1' : IDL.Text,
    'img2' : IDL.Text,
    'img3' : IDL.Text,
    'inventory' : IDL.Nat8,
    'slug' : IDL.Text,
    'description' : IDL.Text,
    'time_updated' : Time,
    'category' : SlugId__1,
    'price' : IDL.Float64,
  });
  const CreateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_28 = IDL.Variant({ 'ok' : Product, 'err' : CreateProductError });
  const UserId__1 = IDL.Text;
  const User = IDL.Record({
    'id' : UserId__1,
    'time_created' : Time,
    'twitter' : IDL.Text,
    'email' : IDL.Text,
    'time_updated' : Time,
    'discord' : IDL.Text,
  });
  const CreateUserError = IDL.Variant({
    'EmailAlreadyExists' : IDL.Null,
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_27 = IDL.Variant({ 'ok' : User, 'err' : CreateUserError });
  const NewVideo = IDL.Record({
    'status' : IDL.Text,
    'title' : IDL.Text,
    'img1' : IDL.Text,
    'description' : IDL.Text,
    'video_url' : IDL.Text,
    'course' : IDL.Text,
  });
  const VideoId = IDL.Nat;
  const Video = IDL.Record({
    'id' : VideoId,
    'status' : IDL.Text,
    'time_created' : Time,
    'title' : IDL.Text,
    'img1' : IDL.Text,
    'slug' : IDL.Text,
    'description' : IDL.Text,
    'video_url' : IDL.Text,
    'time_updated' : Time,
    'course' : IDL.Text,
  });
  const CreateVideoError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'VideoAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_26 = IDL.Variant({ 'ok' : Video, 'err' : CreateVideoError });
  const CartId = IDL.Text;
  const DeleteCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_25 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCartItemsError,
  });
  const SlugId = IDL.Text;
  const DeleteCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_24 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCategoryError,
  });
  const ContactId = IDL.Text;
  const DeleteContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_23 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteContactError,
  });
  const DeleteCourseError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_22 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteCourseError });
  const OrderId = IDL.Text;
  const DeleteOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_21 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteOrderError });
  const DeleteProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_20 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteProductError,
  });
  const UserId = IDL.Text;
  const DeleteUserError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_19 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteUserError });
  const DeleteVideoError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_18 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteVideoError });
  const WishlistId = IDL.Text;
  const DeleteWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_17 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteWishlistItemError,
  });
  const GetCartItemsError = IDL.Variant({ 'CartItemNotFound' : IDL.Null });
  const Result_16 = IDL.Variant({ 'ok' : CartItem, 'err' : GetCartItemsError });
  const GetCategoryError = IDL.Variant({ 'CategoryNotFound' : IDL.Null });
  const Result_15 = IDL.Variant({ 'ok' : Category, 'err' : GetCategoryError });
  const GetContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_14 = IDL.Variant({ 'ok' : Contact, 'err' : GetContactError });
  const GetCourseError = IDL.Variant({ 'CourseNotFound' : IDL.Null });
  const Result_13 = IDL.Variant({ 'ok' : Course, 'err' : GetCourseError });
  const GetProductError = IDL.Variant({ 'ProductNotFound' : IDL.Null });
  const Result_11 = IDL.Variant({ 'ok' : Product, 'err' : GetProductError });
  const GetUserError = IDL.Variant({ 'UserNotFound' : IDL.Null });
  const Result_10 = IDL.Variant({ 'ok' : User, 'err' : GetUserError });
  const GetVideoError = IDL.Variant({ 'VideoNotFound' : IDL.Null });
  const Result_9 = IDL.Variant({ 'ok' : Video, 'err' : GetVideoError });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const Request = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }),
  });
  const Response = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const UpdateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CartItemNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_8 = IDL.Variant({
    'ok' : CartItem,
    'err' : UpdateCartItemsError,
  });
  const UpdateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_7 = IDL.Variant({
    'ok' : Category,
    'err' : UpdateCategoryError,
  });
  const UpdateContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_6 = IDL.Variant({ 'ok' : Contact, 'err' : UpdateContactError });
  const UpdateCourseError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
    'CourseNotFound' : IDL.Null,
  });
  const Result_5 = IDL.Variant({ 'ok' : Course, 'err' : UpdateCourseError });
  const UpdateOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : Order, 'err' : UpdateOrderError });
  const UpdateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_4 = IDL.Variant({ 'ok' : Product, 'err' : UpdateProductError });
  const UpdateUserError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : User, 'err' : UpdateUserError });
  const UpdateVideoError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'VideoNotFound' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : Video, 'err' : UpdateVideoError });
  const UpdateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'WishlistItemNotFound' : IDL.Null,
  });
  const Result = IDL.Variant({
    'ok' : WishlistItem,
    'err' : UpdateWishlistItemError,
  });
  return IDL.Service({
    'addtoCartItems' : IDL.Func([IDL.Text, IDL.Int], [Result_33], []),
    'addtoWishlist' : IDL.Func([IDL.Text], [Result_32], []),
    'createCategory' : IDL.Func([IDL.Text, IDL.Text], [Result_31], []),
    'createContact' : IDL.Func([UserContact], [Result_30], []),
    'createCourse' : IDL.Func([IDL.Text, IDL.Text], [Result_29], []),
    'createOrder' : IDL.Func([NewOrder], [Result_12], []),
    'createProduct' : IDL.Func([UserProduct], [Result_28], []),
    'createUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_27], []),
    'createVideo' : IDL.Func([NewVideo], [Result_26], []),
    'deleteCartItems' : IDL.Func([CartId], [Result_25], []),
    'deleteCategory' : IDL.Func([SlugId], [Result_24], []),
    'deleteContact' : IDL.Func([ContactId], [Result_23], []),
    'deleteCourse' : IDL.Func([SlugId], [Result_22], []),
    'deleteOrder' : IDL.Func([OrderId], [Result_21], []),
    'deleteProduct' : IDL.Func([SlugId], [Result_20], []),
    'deleteUser' : IDL.Func([UserId], [Result_19], []),
    'deleteVideo' : IDL.Func([SlugId], [Result_18], []),
    'deleteWishlistItems' : IDL.Func([WishlistId], [Result_17], []),
    'getCartItems' : IDL.Func([CartId], [Result_16], ['query']),
    'getCategory' : IDL.Func([SlugId], [Result_15], ['query']),
    'getContact' : IDL.Func([ContactId], [Result_14], ['query']),
    'getCourse' : IDL.Func([SlugId], [Result_13], ['query']),
    'getOrder' : IDL.Func([IDL.Text], [Result_12], ['query']),
    'getProduct' : IDL.Func([SlugId], [Result_11], ['query']),
    'getUser' : IDL.Func([UserId], [Result_10], ['query']),
    'getVideo' : IDL.Func([SlugId], [Result_9], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'http_request' : IDL.Func([Request], [Response], ['query']),
    'isAdmin' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'listCartItems' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CartId, CartItem))],
        ['query'],
      ),
    'listCategories' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(SlugId, Category))],
        ['query'],
      ),
    'listContacts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ContactId, Contact))],
        ['query'],
      ),
    'listCourse' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(SlugId, Course))],
        ['query'],
      ),
    'listOrders' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(OrderId, Order))],
        ['query'],
      ),
    'listProducts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(SlugId, Product))],
        ['query'],
      ),
    'listUsers' : IDL.Func([], [IDL.Vec(IDL.Tuple(UserId, User))], ['query']),
    'listVideos' : IDL.Func([], [IDL.Vec(IDL.Tuple(SlugId, Video))], ['query']),
    'listWishlistItems' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(WishlistId, WishlistItem))],
        ['query'],
      ),
    'updateCartItems' : IDL.Func([CartId, IDL.Int], [Result_8], []),
    'updateCategory' : IDL.Func([SlugId, IDL.Text, IDL.Text], [Result_7], []),
    'updateContact' : IDL.Func([ContactId, IDL.Bool], [Result_6], []),
    'updateCourse' : IDL.Func([SlugId, IDL.Text, IDL.Text], [Result_5], []),
    'updateOrderStatus' : IDL.Func([OrderId, IDL.Text], [Result_3], []),
    'updatePaymentStatus' : IDL.Func([OrderId, IDL.Text], [Result_3], []),
    'updateProduct' : IDL.Func([SlugId, UserProduct], [Result_4], []),
    'updateTrackingUrl' : IDL.Func([OrderId, IDL.Text], [Result_3], []),
    'updateUser' : IDL.Func([UserId], [Result_2], []),
    'updateVideo' : IDL.Func([SlugId, NewVideo], [Result_1], []),
    'updateWishlistItems' : IDL.Func([WishlistId], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
