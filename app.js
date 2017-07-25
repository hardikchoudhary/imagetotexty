


// Setup Restify Server
var NodeGeocoder = require('node-geocoder');
 
// myParams is parameters that you will pass to this function

var restify = require('restify');

// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
// var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/dd2533b4-f80d-4a4c-a529-c5ed09f9923c?subscription-key=038dfe1286be41f48393267d754125eb&timezoneOffset=0&verbose=true&spellCheck=true");

// bot.recognizer(recognizer);

// var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
// bot.dialog('/', dialog);

  // try extracting entities
     


var server = restify.createServer();
var builder = require('botbuilder');
var passingresult="";
var assert = require("assert");

var fs = require('fs');

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 

});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "3dfa0867-614d-40d2-8092-08fd56df09f6",
    appPassword:"mHCEFZUbfZnFH5HLUseuJK1"
});


server.post('/api/messages', connector.listen());



// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
		 session.send("In bot");
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
	 session.send(attachment.contentUrl);
	 
	    var subscriptionKey = "13hc77781f7e4b19b5fcdd72a8df7156";

        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/RecognizeText";

        // Request parameters.
        var params = {
            "handwriting": "true",
        };
	 
	       // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", "2b4043ad15ef443eb4b25182c6ac9dab");
            },

            type: "POST",

            // Request body.
            data: attachment.contentUrl,
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
           session.send("");
		   session.send(data);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
	 
        session.send({
            text: "You sent:",
            attachments: [
                {
                    contentType: attachment.contentType,
                    contentUrl: attachment.contentUrl,
                    name: attachment.name
                }
            ]
        });
    } else {
        // Echo back users text
        session.send("You said: %s", session.message.text);
    }
});
