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

var fs = require('fs');





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


// Create your bot with a function to receive messages from the user
bot = new builder.UniversalBot(connector, function (session) {
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
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
