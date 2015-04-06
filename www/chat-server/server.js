var Firebase = require('firebase');
var gcm = require('node-gcm');


var key_data = null;
var chat_data = null;

var all_reg_keys = [];

var set_database = function(){
    key_data = new Firebase('https://sbose78.firebaseio.com/keys');
    chat_data = new Firebase('https://sbose78.firebaseio.com/');
}



var get_keys = function(){

    key_data.on('child_added', function(snapshot) {
      	var message = snapshot.val();
      	all_reg_keys.push( message.gcm_key )
      	//console.log( "Discovered GCM reg id  " + message.gcm_key);
    });
};

var get_chats = function(){

	chat_data.on('child_added', function(snapshot) {
      	var message = snapshot.val();
      	console.log("---- new chat message ---" + message);
      	notify_user();
    });

};

var notify_user = function(){

	var message = new gcm.Message();
 
	 //API Server Key
	var sender = new gcm.Sender('AIzaSyAGa2mz-Qw4izMSe9NRJ2dl4OKqHyQUY7c');
	
  // Value the payload data to send...
  message.addData('message',"Open the app to get the new message");
  message.addData('title','DebanjanaBose' );
  message.addData('msgcnt','3'); // Shows up in the notification in the status bar
  //message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
  //message.collapseKey = 'demo';
  //message.delayWhileIdle = true; //Default is false
  message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
   
   // At least one reg id required
    
   sender.send(message, all_reg_keys, 4, function (result) {
        console.log(result + "( send notification done )");
	});

};

set_database();
get_keys();
get_chats();