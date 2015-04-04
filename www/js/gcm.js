
var register_gcm = function (){
	var pushNotification = window.plugins.pushNotification;   
	pushNotification.register( 
		successHandler, 
		errorHandler, 
		{   'senderID':'your_sender_id', 
			'ecb':'onNotificationGCM' // callback function 
		} 
	);
};

function successHandler(result) 
{ 
	console.log('Success: '+ result);
}

function errorHandler(error) 
{ 
	console.log('Error: '+ error); 
}

function onNotificationGCM(e) 
{ 
	switch(e.event){ 
		case 'registered': 
			if (e.regid.length > 0){ 
				deviceRegistered(e.regid); 
			}
			break;   
		case 'message':
			if (e.foreground){
				 // When the app is running foreground. 
				alert('The room temperature is set too high') 
			} 
			break;
	    case 'error': 
	    	console.log('Error: ' + e.msg); 
	    	break;   
	    default: 
	    	console.log('An unknown event was received'); 
	    	break; 
	} 
}