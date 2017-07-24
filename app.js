


var restify = require('restify');

     
var server = restify.createServer();
var builder = require('botbuilder');
var passingresult="";
var assert = require("assert");

var fs = require('fs');

var connector = new builder.ChatConnector({
      appId: "eaf65756-b1d0-4740-8da1-e856c5296019",
    appPassword:"Ls0UBt0aTnTRKbSYf8x2eNk"
});

server.post('/api/messages', connector.listen());



// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
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
