import Text "mo:base/Text";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Types "types";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

module {

  type Response = Types.Response;

  func process_character(char : Char) : Char {
    let unicode_value = Char.toNat32(char);

    if (unicode_value >= 97 and unicode_value <= 122) {
      // leave as is
      return (Char.fromNat32(unicode_value));
    };
    if (unicode_value >= 65 and unicode_value <= 90) {
      // lowercase
      return (Char.fromNat32(unicode_value + 32));
    };
    if (unicode_value == 32) {
      // spaces to "-"
      return Char.fromNat32(45);
    };
    // remove everything else
    return Char.fromNat32(0);
  };

  public func slugify(word : Text) : Text {
    var slug : Text = "";
    var char : Char = '\u{0}';
    for (c in word.chars()) {
      char := process_character(c);
      if (char != '\u{0}') {
        slug #= Char.toText(char);
      };
    };
    slug;
  };

  // A 200 Ok response with picture
  public func picture(pic : Blob) : Response {
    {
      body = pic;
      headers = [
        ("Content-Type", "image/jpg"),
        ("Access-Control-Allow-Origin", "*")
        //("Expires", "Wed, 9 Jan 2099 09:09:09 GMT")
      ];
      status_code = 200;
      streaming_strategy = null;
    };
  };

  // A 404 response with an optional error message.
  public func http404(msg : ?Text) : Response {
    {
      body = Text.encodeUtf8(
        switch (msg) {
          case (?msg) msg;
          case null "Not found.";
        }
      );
      headers = [("Content-Type", "text/plain")];
      status_code = 404;
      streaming_strategy = null;
    };
  };

  /* let adminPrincipals : [Text] = [
    "4w6mb-vqaaa-aaaab-qac5q-cai"
  ]; */
  let adminPrincipals : [Text] = [
   "7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae",
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe",
    "w57ef-rb36t-mgpgw-rxtct-phpom-mj7ss-4iois-i2xll-6x7jy-stvlo-sae"
  ];

  /* public func isAdmin2(userPrincipal : Principal) : Bool {
    let userPrincipalStr = Principal.toText(userPrincipal);
    let foundAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal;
      }
    ); */

    public func isAdmin(userPrincipal : Principal) : Bool {
    let userPrincipalStr = Principal.toText(userPrincipal);
    let foundAdmin = Array.find<Text>(
      adminPrincipals,
      func(adminPrincipal : Text) : Bool {
        return userPrincipalStr == adminPrincipal;
      }
    );

    switch (foundAdmin) {
      case (null) { return false };
      case (_) { return true };
    };
  };

};
