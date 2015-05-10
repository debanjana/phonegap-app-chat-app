/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        onReady();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

var onReady = function(){
     $("#send-button").click(onMessageSend);
     set_database();
     sync_messages();
     console.log("device is now ready, will setup gcm");
     if ( get_gcm_key('generic') === null ){
        alert("Registering GCM since reg id wasn't found on device");
        register_gcm();
     }
     

};
// this is for the Enter key press
$('#messageText').keypress(function(event){

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
         event.preventDefault();
         onMessageSend();      
    }
});

var onMessageSend = function (){
    //on Send button click
    var message = $("#messageText").val();
    var userName = $("#input-userName").val();
    //userName = userName.toUpperCase();
    //userName = userName.bold();
    //console.log("inside onMessageSend");
    send_message(userName , message);
    $("#messageText").val("");
}
var update_chat_div = function( user, message ){
    console.log("Adding new messahe to the ALL MESSAGES div");
    var newDivObj = document.createElement('div');
    var fullmessage = user +  " : " + message;
    var leng = fullmessage.length; 

    // if length is more than ...... then split and make two messages 

   /* 
    if(leng>40)
        {
        var divmessage = ' ';
        for(var i = 0 ; i<leng ; i++)
        {
            if((i%40)==0)
            {
                divmessage = divmessage + "<br>";
            }
            divmessage = divmessage + fullmessage[i];
        }
        fullmessage = divmessage;
        divwidth=360;
       }*/
       if(leng>40)        
            var divwidth = 400;        
        else
            var divwidth = leng*9;

    
    var divColor = getColorByUser(user);
   // $(newDivObj).attr("style" , " background-color : "+divColor+";  width: "+divwidth+"px;"  );
    $(newDivObj).attr("style" , " background-color : "+divColor+";"  );
    $(newDivObj).attr("class" , "newMessage");
    $(newDivObj).html(fullmessage);
    $("#chatboxView").append(newDivObj);
    // scroll down to the last message after appending child
    var $cont = $("#chatboxView");
    $cont[0].scrollTop = $cont[0].scrollHeight;


  };

  var getColorByUser = function(user){
        var userSmall = user.toLowerCase();
        console.log(userSmall);
        var colorByUser = {};
        colorByUser["shoubhik"] = "rgb(31,192,226)";
        colorByUser["debanjana"] = "rgb(253,96,103)";

        return colorByUser[userSmall];

};


