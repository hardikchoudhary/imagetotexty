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


var server = restify.createServer();
var builder = require('botbuilder');
var passingresult="";
var assert = require("assert");

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

bot.dialog('/', function (session) {
    session.send("Hello");
   
});


// Send welcome when conversation with bot is started, by initiating the root dialog
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

// // Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// bot = new builder.UniversalBot(connector, function (session) {


	
//     if (session.message.text.includes("Get Route Details")) {

//        // session.send("I am getting your route to" + session.message.text.split("Get Route Details:")[1]);
//         session.send("Getting route is in development phase, please use google as of now");
//         //http://ridlr.in/news/wp-content/uploads/2015/11/delhi-metro-phase-3-map.jpg

//     }

//     else { 

//         nearfromPlace = session.message.text.split("from")[1];

//         if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
//             nearfromPlace = session.message.text.split("From")[1];
//         }

//         if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
//             nearfromPlace = session.message.text.split("frm")[1];
//         }
// 		if (nearfromPlace == "" || nearfromPlace == undefined || nearfromPlace == null) {
//             nearfromPlace = session.message.text.split("Frm")[1];
//         }

//     //"2017-06-18T11:58:26+05:30"
//     var messageTiming = session.message.timestamp;
//     var greeting = "";

//     if (messageTiming != undefined && messageTiming != null) {
		
// 		var date = new Date();

//     var hour = date.getHours();
// 	console.log(hour);
	

//         if ((hour >= 17) && (hour< 23)) {

//             greeting = "Good Evening";
//         }
//         if ((hour >= 4) && (hour < 12)) { greeting = "Good Morning"; }

//         if ((hour >= 12) && (hour < 17)) { greeting = "Good After Noon" }
		
// 	    if ((hour >= 23) && (hour < 4)) { greeting = "So Late , I am here to help" }
		
// 		greeting="Hope You are good :) ";



//     }
//     session.send("Hi " + session.message.user.name + ", " + greeting + " You asked for nearest metro station from: %s", nearfromPlace);	


// var options = {
//   provider: 'google',
 
//   // Optional depending on the providers 
//   // Default 
//   apiKey: 'AIzaSyACurvXGgbQqG6fSe4-P1sOcEtwmyhXoTM', // for Mapquest, OpenCage, Google Premier 
//   formatter: "json"         // 'gpx', 'string', ... 
// };
 
// var geocoder = NodeGeocoder(options);
// // Using callback 
// geocoder.geocode(nearfromPlace, function(err, res) {
		
// 		latitude=res[0].latitude;
//         longitude = res[0].longitude;

//         var placeSearch = new PlaceSearch(config.apiKey, config.outputFormat);
//         var parameters = {
//             location: [latitude, longitude],
//             rankby: "distance",
//             types: "subway_station"
//         };

//         placeSearch(parameters, function (error, response) {
//             resultsMetroName = [];

//             console.log(response);

//             // result=response;
//             for (var i = 0; i < response.results.length; i++) {
//                 // passingStationName=response.results[i].name;

//                 resultsMetroName.push(response.results[i].name);
//             }
//             var org = [resultsMetroName[0] + "Metro", resultsMetroName[1] + "Metro", resultsMetroName[2] + "Metro"];
//             distance.get(
//                 {
//                     origins:
//                     org,
//                     destinations: [nearfromPlace]
//                 },
//                 function (err, data) {
//                     if (err) return console.log(err);
//                     returningResultKeyval = [];

//                     var cards = [new builder.HeroCard(session)
//                         .title('Nearest Metro Station')
//                         .subtitle('Station Name: ' + resultsMetroName[0] + ' Distance:' + data[0].distance)
//                         .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
//                         .images([
//                             builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
//                         ])
//                         .buttons([
//                             builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[0], "Get Route")
//                             //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
//                         ]),

//                         new builder.HeroCard(session)
//                             .title('Nearest Metro Station')
//                             .subtitle('Station Name: ' + resultsMetroName[1] + ' Distance:' + data[1].distance)
//                             .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
//                             .images([
//                                 builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
//                             ])
//                             .buttons([
//                                 builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[1], "Get Route")
//                                 //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
//                             ]),
//                         new builder.HeroCard(session)
//                             .title('Nearest Metro Station')
//                             .subtitle('Station Name: ' + resultsMetroName[2] + ' Distance:' + data[2].distance)
//                             .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
//                             .images([

//                                 builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
//                             ])
//                             .buttons([
                               
//                                 builder.CardAction.postBack(session, "Get Route Details:" + resultsMetroName[1], "Get Route")
//                                 //builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
//                             ])
//                     ]

//                     var reply = new builder.Message(session)
//                         .attachmentLayout(builder.AttachmentLayout.carousel)
//                         .attachments(cards);     
//                     session.send(reply);

//                     for (var i = 0; i < data.length; i++) {
//                         returningResultKeyval.push(resultsMetroName[i] + "-Distance-" + data[i].distance);

// //                        var card =[ new builder.HeroCard(session)
// //                            .title('Nearest Metro Station')
// //                            .subtitle('Station Name: '+ resultsMetroName[0] + ' Distance:' + data[0].distance)
// //                            .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
// //                            .images([
// //                                builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
// //                            ])
// //                            .buttons([
// //                                builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
// //                            ]),

// //                            new builder.HeroCard(session)
// //                                .title('Nearest Metro Station')
// //                                .subtitle('Station Name: ' + resultsMetroName[1] + ' Distance:' + data[1].distance)
// //                                .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
// //                                .images([
// //                                    builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
// //                                ])
// //                                .buttons([
// //                                    builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
// //                                ]),
// //                            new builder.HeroCard(session)
// //                                .title('Nearest Metro Station')
// //                                .subtitle('Station Name: ' + resultsMetroName[2] + ' Distance:' + data[2].distance)
// //                                .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
// //                                .images([
// //                                    builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
// //                                ])
// //                                .buttons([
// //                                    builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
// //                                ])
// //]
//                         //var msg = new builder.Message(session).addAttachment(card);
//                         //session.send(msg);
//                     }

//                     //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//                     //var card = createCard(selectedCardName, session);


//                     //var card= new builder.HeroCard(session)
//                     //    .title('Nearest Metro Station')
//                     //    .subtitle('Station Name: 'resultsMetroName[i] + 'Distance:' + data[i].distance)
//                     //    .text('Results shown are shown in order of nearest station , you can click on get route to get complete Metro Route ex. Where you have to change and on which line you have to go')
//                     //    .images([
//                     //        builder.CardImage.create(session, 'http://uptunotes.com/wp-content/uploads/2016/06/dmrc.jpg')
//                     //    ])
//                     //    .buttons([
//                     //        builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Route')
//                     //    ]);
//                     //var msg = new builder.Message(session).addAttachment(card);
//                     //session.send(msg);

//                     //==================================================================

//                     //session.send("Here are the results for nearest metro station that I have found for you along with the distance: "+ returningResultKeyval);

//                 });
//             if (error) throw error;
//             assert.notEqual(response.results.length, 0, "Ranked place search must not return 0 results");
//         });	
// });
//     }
// });


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


