
var register_gcm = function (){
	console.log( "registering gcm")
	var pushNotification = window.plugins.pushNotification;   
	pushNotification.register( 
		successHandler, 
		errorHandler, 
		{   'senderID':'857748051873', 
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
				//deviceRegistered(e.regid); 
				console.log("Regid " + e.regid);
                alert('registration id = '+e.regid);
                save_gcm_key( 'generic', e.regid);
			}
			break;   
		case 'message':
			if (e.foreground){
				 // When the app is running foreground. 
				//alert('The room temperature is set too high') 
			} 
			break;
 	    case 'error': 
	    	console.log('Error: ' + e.msg); 
	    	alert("error was returned - " + e.msg)
	    	break;   
	    default: 
	    	console.log('An unknown event was received'); 
	    	alert( e.message );
	    	break; 
	} 
}