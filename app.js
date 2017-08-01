
// myParams is parameters that you will pass to this function
const cognitiveServices = require('cognitive-services');



 var base64Img = require('base64-img');
 
var url = 'http://www.apctips.in/wp-content/uploads/2017/02/WhatsApp-Bringing-Back-Old-Status-Text-Style-By-Taglin-Feature.jpg';
base64Img.requestBase64(url ,function(err, res, body) {
  console.log("in base64");


	
});


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
    appId: "eaf65756-b1d0-4740-8da1-e856c5296019",
    appPassword:"9r89jdUk4YrRGgTJSGiP6Yp"
});

const microsofComputerVision = require("microsoft-computer-vision");





server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
		 session.send("In bot");
		
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
	 var data=[];
	
			 session.send(attachment.contentUrl);
url=attachment.contentUrl;
base64Img.requestBase64(url ,function(err, res, body) {
  console.log("in base64==================================");
 data.push(body);
    console.log(body);

//====

microsofComputerVision.orcImage({
     "Ocp-Apim-Subscription-Key": "2b4043ad15ef443eb4b25182c6ac9dab",
     "request-origin":"westcentralus",
    // // "content-type": "application/json",
    // "url": "http://cdn.quotesgram.com/img/81/49/660235022-Random-Funny-Quotes-.jpg",
	   "content-type": "application/octet-stream",
       "body": data,
     "language": "en",
     "detect-orientation": true
}).then((result)=>{

  console.log("fdsssssssssssssssssssssssssssssssssssssssssssssssssssss=================================================="); 
   console.log(JSON.stringify(result));        // {
                 
                              // // }
 }).catch((err)=>{
   throw err;
 })
});

//===
	
	
    } 
	
	else {
        // Echo back users text
        session.send("You said: %s", session.message.text);
    }
});