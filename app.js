//var yellowLineData = ["Samaypur Badli"
//    , "Rohini Sector 18, 19"
//    , "Haiderpur Badli Mor"
//    , "Jahangirpuri"
//    , "Adarsh Nagar"
//    , "Azadpur"
//    , "Model Town"
//    , "GTB Nagar"
//    , "Viswavidyalaya"
//    , "Vidhan Sabha"
//    , "Civil Lines"
//    , "Kashmere Gate "
//    , "Chandhni Chowk"
//    , "Chawri Bazar"
//    , "NewDelhi"
//    , "Rajiv Chowk"
//    , "Patel Chowk"
//    , "Central Secretariat"
//    , "Udyog Bhawan"
//    , "Lok Kalyan Marg"
//    , "Jorbagh"
//    , "INA"
//    , "AIIMS"
//    , "Green Park"
//    , "Hauz Khas"
//    , "MalviaNagar"
//    , "Saket"
//    , "Qutab Minar"
//    , "Chhattarpur"
//    , "Sultanpur"
//    , "Ghotorni"
//    , "Arjan Garh"
//    , "Gurudronacharya"
//    , "Sikandarpur"
//    , "MG Road"
//    , "IFFCO Chowk"
//    , "Huda City Centre"];

//var blueLineData = [
//    "Noida City Centre"
//    , "Golf Course      "
//    , "Botanical Garden "
//    , "Noida Sect 18    "
//    , "Noida Sect 16    "
//    , "Noida Sect 15    "
//    , "New Ashok Nagar  "
//    , "Mayur Vihar Ext  "
//    , "Mayur Vihar- I   "
//    , "Akshardham       "
//    , "Yamuna Bank      "
//    , "Indraprasta      "
//    , "Pragati Maidan"
//    , "Mandi House"
//    , "Barakhamba"
//    , "Rajiv Chowk"
//    , "RK Ashram Marg"
//    , "Jhandewalan"
//    , "Karol Bagh"
//    , "Rajendra Place"
//    , "Patel Nagar"
//    , "Shadi Pur"
//    , "Kirti Nagar"
//    , "Moti Nagar"
//    , "Ramesh Nagar"
//    , "Rajouri Garden"
//    , "Tagore Garden"
//    , "Subash Nagar"
//    , "Tilak Nagar"
//    , "Janak Puri East"
//    , "Janak Puri West"
//    , "Uttam Nagar East"
//    , "Uttam Nagar West "
//    , "Nawada           "
//    , "Dwaraka Mor      "
//    , "Dwarka           "
//    , "Dwarka Sector - 14"
//    , "Dwarka Sector - 13"
//    , "Dwarka Sector - 12"
//    , "Dwarka Sector - 11"
//    , "Dwarka Sector - 10"
//    , "Dwarka Sector - 9 "
//    , "Dwarka Sector - 8 "
//    , "Dwarka Sector - 21"
//];

// Setup Restify Server

// var makeFunc = require('./getLongLatitude.js');

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

//Getting modules for Google Api
var PlaceSearch = require("./PlaceSearch.js");
var distance = require('google-distance');
var config = require("./config.js");
var resultsMetroName=[];
var returningResultKeyval=[];
var longitude,latitude,passingStationName="";
var nearfromPlace = "";



var yellowLineData1 = ["Samaypur Badli", "Jahangirpuri", "Change Red Line Kashmere Gate", "Change Orange Line New Delhi", "Chawri Bazaar", "Change Blue Line Rajiv Chowk metro", "Change  Violet Line Central Secretariat", "Qutub Minar", "Chhatarpur", "Change Rapid MetroRail Line Sikanderpur", "HUDA City Centre"];

var blueLineData1 = ["change Orange Line Dwarka Sector 21", "Dwarka Sub City", "Dwarka Sector 9", "Change Green Line Kirti Nagar", "Change Line yellow Rajiv Chowk","Change Violet line Mandi House","Barakhamba Road", "Pragati Maidan","Indraprastha", "Change Vaishali Line Yamuna Bank","Noida City Centre"];
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 

});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "3dfa0867-614d-40d2-8092-08fd56df09f6",
    appPassword:"mHCEFZUbfZnFH5HLUseuJK1"
});

var redJn=["Kashimiri Gate","Inderlok"]
var blueJn=["Rajiv Chowk","Kirti Nagar"];
var violetJn=["Central Secretariat","Kashimiri Gate"];
var orangeJn=["Dwarka Sector 21","New Delhi"];
var yellowjn=["Rajiv Chowk","Central Secretariat","Kashimiri Gate","New Delhi"];
var greenJn=["Kirti Nagar"];


// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Send welcome when conversation with bot is started, by initiating the root dialog
var bot = new builder.UniversalBot(connector);

var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/dd2533b4-f80d-4a4c-a529-c5ed09f9923c?subscription-key=038dfe1286be41f48393267d754125eb&timezoneOffset=0&verbose=true&spellCheck=true");

bot.recognizer(recognizer);
  var greeting = "Hope You are good";

// var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
// bot.dialog('/', dialog);


// Send welcome when conversation with bot is started, by initiating the root dialog

bot.dialog('greeting', function (session, args) {
 session.send("Hello hope you are good ,Please start finding nearest metro by messaging me 'PlaceName City' like nearest gip noida or closest to akshardham or way you want");
greeting="";
   }).triggerAction({
    matches: 'greeting'
});

// // Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
bot = new builder.UniversalBot(connector, function (session) {

//     if(args.intent.entities[args.intent.entities.length-1].type=="Places"){
//         nearfromPlace=args.intent.entities[args.intent.entities.length-1].entity
// }
if(!(session.message.text.toLowerCase().includes("from")||session.message.text.toLowerCase().includes("frm"))){

if(!session.message.text.toLowerCase().includes("Get Route Details")) {
  session.send("Hello hope you are good ,Please start finding nearest metro by messaging me 'PlaceName City' like nearest gip noida or closest to akshardham");
}
}

// // Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
    if (session.message.text.includes("Get Route Details")) {

    var msg = new builder.Message(session)
        .addAttachment({
            contentUrl: 'http://www.mapsofindia.com/maps/delhi/delhi-metro-map.jpg',
            contentType: 'image/jpg',
            name: 'route.jpg'
        });

    session.send(msg);
     // session.send('If you want exact route , Please message in format "Starting place/Metro to Destination Place/Metro Name" ISBT to Akshardham');
    }

if ((session.message.text.toLowerCase().includes("from")||session.message.text.toLowerCase().includes("frm"))) {
       

        //FindingPlace
    //   nearfromPlace = builder.EntityRecognizer.findEntity(args.intent.entities, 'Place');

        nearfromPlace = session.message.text.split("from")[1];

        if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
            nearfromPlace = session.message.text.split("From")[1];
        }

        if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
            nearfromPlace = session.message.text.split("frm")[1];
        }
		if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
            nearfromPlace = session.message.text.split("Frm")[1];
        }

        if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
            nearfromPlace = session.message.text;
        }


    //"2017-06-18T11:58:26+05:30"
    var messageTiming = session.message.timestamp;
  

    // if (messageTiming != undefined && messageTiming != null) {
		
	// 	var date = new Date();

    // var hour = date.getHours();
	// console.log(hour);
    // }
	

    //     if ((hour >= 17) && (hour< 23)) {

    //         greeting = "Good Evening";
    //     }
    //     if ((hour >= 4) && (hour < 12)) { greeting = "Good Morning"; }

    //     if ((hour >= 12) && (hour < 17)) { greeting = "Good After Noon" }
		
	//     if ((hour >= 23) && (hour < 4)) { greeting = "So Late , I am here to help" }
		
	// 	greeting="Hope You are good :) ";
    // }
    session.send("Hi " + session.message.user.name + ", " + greeting + " You asked for nearest metro station from: %s", nearfromPlace);	


var options = {
  provider: 'google',
 
  // Optional depending on the providers 
  // Default 
  apiKey: 'AIzaSyACurvXGgbQqG6fSe4-P1sOcEtwmyhXoTM', // for Mapquest, OpenCage, Google Premier 
  formatter: "json"         // 'gpx', 'string', ... 
};
 
var geocoder = NodeGeocoder(options);
// Using callback 
geocoder.geocode(nearfromPlace, function(err, res) {
		
		latitude=res[0].latitude;
        longitude = res[0].longitude;

        var placeSearch = new PlaceSearch(config.apiKey, config.outputFormat);
        var parameters = {
            location: [latitude, longitude],
            rankby: "distance",
            types: "subway_station"
        };

        placeSearch(parameters, function (error, response) {
            resultsMetroName = [];
            for (var i = 0; i < response.results.length; i++) {
                resultsMetroName.push(response.results[i].name);
            }
            var org = [resultsMetroName[0] + "Metro", resultsMetroName[1] + "Metro", resultsMetroName[2] + "Metro"];
            distance.get(
                {
                    origins:
                    org,
                    destinations: [nearfromPlace]
                },
                function (err, data) {
                    if (err) return console.log(err);
                    returningResultKeyval = [];

                    var cards = [new builder.HeroCard(session)
                        .title('Nearest Metro Station')
                        .subtitle('Station Name: ' + resultsMetroName[0] + ' Distance:' + data[0].distance)
                        .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
                        .images([
                            builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
                        ])
                        .buttons([
                            builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[0], "Get Route")
                            //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
                        ]),

                        new builder.HeroCard(session)
                            .title('Nearest Metro Station')
                            .subtitle('Station Name: ' + resultsMetroName[1] + ' Distance:' + data[1].distance)
                            .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
                            .images([
                                builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
                            ])
                            .buttons([
                                builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[1], "Get Route")
                                //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
                            ]),
                        new builder.HeroCard(session)
                            .title('Nearest Metro Station')
                            .subtitle('Station Name: ' + resultsMetroName[2] + ' Distance:' + data[2].distance)
                            .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
                            .images([

                                builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
                            ])
                            .buttons([
                               
                                builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[1], "Get Route")
                                //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
                            ])
                    ]
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(cards);     
                    session.send(reply);
                });
            if (error) throw error;
            assert.notEqual(response.results.length, 0, "Ranked place search must not return 0 results");
        });	
});
    }
});

                


// bot.on('conversationUpdate', function (message) {

//     console.log(message.address.bot.name);

//      if(message.membersAdded[0].name== message.address.bot.name){
//    if (message.membersAdded && message.membersAdded.length > 0) {
      
//             var membersAdded = message.membersAdded
//                 .map(function (m) {
//                     var isSelf = m.id === message.address.bot.id;
//                     return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
//                 }).join(', ');

//             bot.send(new builder.Message()
//                 .address(message.address)
//                 .text("Hello You can start finding Near By Metro from any place ,By typing from Place city .. Example message me 'from gip noida' or 'from govindpuri delhi' "+message.membersAdded[0].name));
        
//    }
// 	}
    
    
    

//     if (message.membersRemoved && message.membersRemoved.length > 0) {
//         var membersRemoved = message.membersRemoved
//             .map(function (m) {
//                 var isSelf = m.id === message.address.bot.id;
//                 return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
//             })
//             .join(', ');

//         bot.send(new builder.Message()
//             .address(message.address)
//             .text('The following members ' + membersRemoved + ' were removed or left the conversation :('));
//     }
// });


