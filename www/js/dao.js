var myDataRef =  null ;//new Firebase('https://sbose78.firebaseio.com/'); //https://efddaqye3pd.firebaseio-demo.com/');

var set_database = function(){

    myDataRef = new Firebase('https://sbose78.firebaseio.com/'); //https://efddaqye3pd.firebaseio-demo.com/');

}

var send_message = function( user, text ){
	//myDataRef.set('User ' + user + ' says ' + message);
	//myDataRef.set({name: user, text: message});
	text = encrypt_message( text );
	myDataRef.push({name: user, text: text});          
	console.log( " Sent message ");
};


var sync_messages = function(){

    myDataRef.on('child_added', function(snapshot) {
      	var message = snapshot.val();
      	text = decrypt_message( message.text );
    	displayChatMessage(message.name, text);
    });
}


var displayChatMessage = function(name,text){
	console.log( "Recieved chat message !! " + name + " : " + text);
    update_chat_div(name ,  text );
};

var SECRET_PASSPHRASE = "8884314202" ;

var encrypt_message = function( message ){
	 var encrypted = CryptoJS.AES.encrypt( message  , SECRET_PASSPHRASE, { format: JsonFormatter });
	 //console.log( encrypted.format.stringify());
	 return encrypted.toString();
};

var decrypt_message = function( encrypted ){
	var decrypted = CryptoJS.AES.decrypt(encrypted,  SECRET_PASSPHRASE , { format: JsonFormatter });
    return (decrypted.toString(CryptoJS.enc.Utf8)); // Message	
};

/********** utils for encryption decryption ****/

 var JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }

            // stringify json object
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }

            return cipherParams;
        }
    };

    //var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase", { format: JsonFormatter });

    //alert(encrypted); // {"ct":"tZ4MsEnfbcDOwqau68aOrQ==","iv":"8a8c8fd8fe33743d3638737ea4a00698","s":"ba06373c8f57179c"}

    //var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase", { format: JsonFormatter });

    //alert(decrypted.toString(CryptoJS.enc.Utf8)); // Message