import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CartId = string;
export type CartId__1 = string;
export interface CartItem {
  'id' : CartId__1,
  'qty' : bigint,
  'time_created' : Time,
  'principal' : Principal,
  'product_slug' : string,
  'time_updated' : Time,
}
export interface Category {
  'status' : string,
  'name' : string,
  'slug' : string,
}
export interface Contact {
  'id' : ContactId__1,
  'time_created' : Time,
  'name' : string,
  'read' : boolean,
  'email' : string,
  'time_updated' : Time,
  'message' : string,
}
export type ContactId = string;
export type ContactId__1 = string;
export interface Course { 'status' : string, 'title' : string, 'slug' : string }
export type CreateCartItemsError = { 'UserNotAdmin' : null } |
  { 'EmptyProductSlug' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'ProductSlugAlreadyExists' : null };
export type CreateCategoryError = { 'UserNotAdmin' : null } |
  { 'CategoryAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null };
export type CreateContactError = { 'EmptyName' : null } |
  { 'EmptyMessage' : null } |
  { 'EmptyEmail' : null };
export type CreateCourseError = { 'UserNotAdmin' : null } |
  { 'CourseAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type CreateProductError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type CreateUserError = { 'EmailAlreadyExists' : null } |
  { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyEmail' : null };
export type CreateVideoError = { 'UserNotAdmin' : null } |
  { 'VideoAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type CreateWishlistItemError = { 'UserNotAdmin' : null } |
  { 'EmptyProductSlug' : null } |
  { 'WishlistItemAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteCartItemsError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteCategoryError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteContactError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteCourseError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteOrderError = { 'UserNotAdmin' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteProductError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteUserError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteVideoError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteWishlistItemError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type GetCartItemsError = { 'CartItemNotFound' : null };
export type GetCategoryError = { 'CategoryNotFound' : null };
export type GetContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type GetCourseError = { 'CourseNotFound' : null };
export type GetProductError = { 'ProductNotFound' : null };
export type GetUserError = { 'UserNotFound' : null };
export type GetVideoError = { 'VideoNotFound' : null };
export type HeaderField = [string, string];
export interface NewOrder {
  'awb' : string,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : number,
  'orderStatus' : string,
  'userId' : string,
  'paymentAddress' : string,
  'totalAmount' : number,
  'shippingAddress' : ShippingAddress,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export interface NewVideo {
  'status' : string,
  'title' : string,
  'img1' : string,
  'description' : string,
  'video_url' : string,
  'course' : string,
}
export interface Order {
  'id' : OrderId__1,
  'awb' : string,
  'timeUpdated' : Time,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : number,
  'orderStatus' : string,
  'userId' : string,
  'paymentAddress' : string,
  'timeCreated' : Time,
  'totalAmount' : number,
  'shippingAddress' : ShippingAddress,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export type OrderError = { 'PaymentAddressAlreadyUsed' : null } |
  { 'OrderNotFound' : null } |
  { 'MissingData' : null } |
  { 'UnableToCreate' : null } |
  { 'UnableToUpdate' : null };
export type OrderId = string;
export type OrderId__1 = string;
export interface OrderProduct {
  'id' : ProductId,
  'title' : string,
  'img1' : string,
  'slug' : string,
  'description' : string,
  'quantity' : number,
  'price' : number,
}
export interface Product {
  'id' : ProductId,
  'status' : string,
  'time_created' : Time,
  'title' : string,
  'img1' : string,
  'img2' : string,
  'img3' : string,
  'inventory' : number,
  'slug' : string,
  'description' : string,
  'time_updated' : Time,
  'category' : SlugId__1,
  'price' : number,
}
export type ProductId = bigint;
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface Response {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Result = { 'ok' : WishlistItem } |
  { 'err' : UpdateWishlistItemError };
export type Result_1 = { 'ok' : Video } |
  { 'err' : UpdateVideoError };
export type Result_10 = { 'ok' : User } |
  { 'err' : GetUserError };
export type Result_11 = { 'ok' : Product } |
  { 'err' : GetProductError };
export type Result_12 = { 'ok' : Order } |
  { 'err' : OrderError };
export type Result_13 = { 'ok' : Course } |
  { 'err' : GetCourseError };
export type Result_14 = { 'ok' : Contact } |
  { 'err' : GetContactError };
export type Result_15 = { 'ok' : Category } |
  { 'err' : GetCategoryError };
export type Result_16 = { 'ok' : CartItem } |
  { 'err' : GetCartItemsError };
export type Result_17 = { 'ok' : null } |
  { 'err' : DeleteWishlistItemError };
export type Result_18 = { 'ok' : null } |
  { 'err' : DeleteVideoError };
export type Result_19 = { 'ok' : null } |
  { 'err' : DeleteUserError };
export type Result_2 = { 'ok' : User } |
  { 'err' : UpdateUserError };
export type Result_20 = { 'ok' : null } |
  { 'err' : DeleteProductError };
export type Result_21 = { 'ok' : null } |
  { 'err' : DeleteOrderError };
export type Result_22 = { 'ok' : null } |
  { 'err' : DeleteCourseError };
export type Result_23 = { 'ok' : null } |
  { 'err' : DeleteContactError };
export type Result_24 = { 'ok' : null } |
  { 'err' : DeleteCategoryError };
export type Result_25 = { 'ok' : null } |
  { 'err' : DeleteCartItemsError };
export type Result_26 = { 'ok' : Video } |
  { 'err' : CreateVideoError };
export type Result_27 = { 'ok' : User } |
  { 'err' : CreateUserError };
export type Result_28 = { 'ok' : Product } |
  { 'err' : CreateProductError };
export type Result_29 = { 'ok' : Course } |
  { 'err' : CreateCourseError };
export type Result_3 = { 'ok' : Order } |
  { 'err' : UpdateOrderError };
export type Result_30 = { 'ok' : Contact } |
  { 'err' : CreateContactError };
export type Result_31 = { 'ok' : Category } |
  { 'err' : CreateCategoryError };
export type Result_32 = { 'ok' : WishlistItem } |
  { 'err' : CreateWishlistItemError };
export type Result_33 = { 'ok' : CartItem } |
  { 'err' : CreateCartItemsError };
export type Result_4 = { 'ok' : Product } |
  { 'err' : UpdateProductError };
export type Result_5 = { 'ok' : Course } |
  { 'err' : UpdateCourseError };
export type Result_6 = { 'ok' : Contact } |
  { 'err' : UpdateContactError };
export type Result_7 = { 'ok' : Category } |
  { 'err' : UpdateCategoryError };
export type Result_8 = { 'ok' : CartItem } |
  { 'err' : UpdateCartItemsError };
export type Result_9 = { 'ok' : Video } |
  { 'err' : GetVideoError };
export interface ShippingAddress {
  'postCode' : string,
  'street' : string,
  'country' : string,
  'city' : string,
  'mail' : string,
  'state' : string,
  'mobile' : string,
  'lastName' : string,
  'firstName' : string,
}
export type SlugId = string;
export type SlugId__1 = string;
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken],
  StreamingCallbackResponse
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : string,
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export type Time = bigint;
export type UpdateCartItemsError = { 'UserNotAdmin' : null } |
  { 'CartItemNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type UpdateCategoryError = { 'UserNotAdmin' : null } |
  { 'CategoryNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null };
export type UpdateContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null } |
  { 'EmptyMessage' : null } |
  { 'EmptyEmail' : null };
export type UpdateCourseError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null } |
  { 'CourseNotFound' : null };
export type UpdateOrderError = { 'UserNotAdmin' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type UpdateProductError = { 'UserNotAdmin' : null } |
  { 'ProductNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type UpdateUserError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'UserNotFound' : null };
export type UpdateVideoError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'VideoNotFound' : null } |
  { 'EmptyTitle' : null };
export type UpdateWishlistItemError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'WishlistItemNotFound' : null };
export interface User {
  'id' : UserId__1,
  'time_created' : Time,
  'twitter' : string,
  'email' : string,
  'time_updated' : Time,
  'discord' : string,
}
export interface UserContact {
  'name' : string,
  'read' : boolean,
  'email' : string,
  'message' : string,
}
export type UserId = string;
export type UserId__1 = string;
export interface UserProduct {
  'status' : string,
  'title' : string,
  'img1' : string,
  'img2' : string,
  'img3' : string,
  'inventory' : number,
  'description' : string,
  'category' : SlugId__1,
  'price' : number,
}
export interface Video {
  'id' : VideoId,
  'status' : string,
  'time_created' : Time,
  'title' : string,
  'img1' : string,
  'slug' : string,
  'description' : string,
  'video_url' : string,
  'time_updated' : Time,
  'course' : string,
}
export type VideoId = bigint;
export type WishlistId = string;
export type WishlistId__1 = string;
export interface WishlistItem {
  'id' : WishlistId__1,
  'time_created' : Time,
  'principal' : Principal,
  'product_slug' : string,
  'time_updated' : Time,
}
export interface _SERVICE {
  'addtoCartItems' : ActorMethod<[string, bigint], Result_33>,
  'addtoWishlist' : ActorMethod<[string], Result_32>,
  'createCategory' : ActorMethod<[string, string], Result_31>,
  'createContact' : ActorMethod<[UserContact], Result_30>,
  'createCourse' : ActorMethod<[string, string], Result_29>,
  'createOrder' : ActorMethod<[NewOrder], Result_12>,
  'createProduct' : ActorMethod<[UserProduct], Result_28>,
  'createUser' : ActorMethod<[string, string, string], Result_27>,
  'createVideo' : ActorMethod<[NewVideo], Result_26>,
  'deleteCartItems' : ActorMethod<[CartId], Result_25>,
  'deleteCategory' : ActorMethod<[SlugId], Result_24>,
  'deleteContact' : ActorMethod<[ContactId], Result_23>,
  'deleteCourse' : ActorMethod<[SlugId], Result_22>,
  'deleteOrder' : ActorMethod<[OrderId], Result_21>,
  'deleteProduct' : ActorMethod<[SlugId], Result_20>,
  'deleteUser' : ActorMethod<[UserId], Result_19>,
  'deleteVideo' : ActorMethod<[SlugId], Result_18>,
  'deleteWishlistItems' : ActorMethod<[WishlistId], Result_17>,
  'getCartItems' : ActorMethod<[CartId], Result_16>,
  'getCategory' : ActorMethod<[SlugId], Result_15>,
  'getContact' : ActorMethod<[ContactId], Result_14>,
  'getCourse' : ActorMethod<[SlugId], Result_13>,
  'getOrder' : ActorMethod<[string], Result_12>,
  'getProduct' : ActorMethod<[SlugId], Result_11>,
  'getUser' : ActorMethod<[UserId], Result_10>,
  'getVideo' : ActorMethod<[SlugId], Result_9>,
  'greet' : ActorMethod<[string], string>,
  'http_request' : ActorMethod<[Request], Response>,
  'isAdmin' : ActorMethod<[string], boolean>,
  'listCartItems' : ActorMethod<[], Array<[CartId, CartItem]>>,
  'listCategories' : ActorMethod<[], Array<[SlugId, Category]>>,
  'listContacts' : ActorMethod<[], Array<[ContactId, Contact]>>,
  'listCourse' : ActorMethod<[], Array<[SlugId, Course]>>,
  'listOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listProducts' : ActorMethod<[], Array<[SlugId, Product]>>,
  'listUsers' : ActorMethod<[], Array<[UserId, User]>>,
  'listVideos' : ActorMethod<[], Array<[SlugId, Video]>>,
  'listWishlistItems' : ActorMethod<[], Array<[WishlistId, WishlistItem]>>,
  'updateCartItems' : ActorMethod<[CartId, bigint], Result_8>,
  'updateCategory' : ActorMethod<[SlugId, string, string], Result_7>,
  'updateContact' : ActorMethod<[ContactId, boolean], Result_6>,
  'updateCourse' : ActorMethod<[SlugId, string, string], Result_5>,
  'updateOrderStatus' : ActorMethod<[OrderId, string], Result_3>,
  'updatePaymentStatus' : ActorMethod<[OrderId, string], Result_3>,
  'updateProduct' : ActorMethod<[SlugId, UserProduct], Result_4>,
  'updateTrackingUrl' : ActorMethod<[OrderId, string], Result_3>,
  'updateUser' : ActorMethod<[UserId], Result_2>,
  'updateVideo' : ActorMethod<[SlugId, NewVideo], Result_1>,
  'updateWishlistItems' : ActorMethod<[WishlistId], Result>,
}
