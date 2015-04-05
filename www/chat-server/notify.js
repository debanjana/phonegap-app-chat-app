
var gcm = require('node-gcm');
var message = new gcm.Message();
 
 //API Server Key
 var sender = new gcm.Sender('AIzaSyAGa2mz-Qw4izMSe9NRJ2dl4OKqHyQUY7c');
 var registrationIds = [];
  
  // Value the payload data to send...
  message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
  message.addData('title','Push Notification Sample' );
  message.addData('msgcnt','3'); // Shows up in the notification in the status bar
  //message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
  //message.collapseKey = 'demo';
  //message.delayWhileIdle = true; //Default is false
  message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
   
   // At least one reg id required
   registrationIds.push('APA91bG9-B9lvLZAwofm99oNJ2skZ3SHfxSOa__PqF1OiuYTxzVmOCnXCSCW9FTlb4OxqgjFLOm2YLiFkLGj_nlbuYgPNJ3yq1k3pu4iSJ8uZbzWkLJztX4ikCTiNCq0aKQlUJPuykmVE7BoiBAgbwBJy3AguDY41A');
    

    sender.send(message, registrationIds, 8, function (result) {
        console.log(result);
	});


