var fs = require("fs");
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://t1.arcischain.io:1883");
var child_process = require("child_process");



// Connect to MQTT broker
client.on("connect", function () {
    console.log("Connected to MQTT broker");

    // Subscribe to audio_topic
    client.subscribe("audio_topic");
});

// Event listener for incoming audio data on audio_topic
client.on("message", function (topic, message) {
    if (topic == "audio_topic") {
        console.log("Received audio data from MQTT broker...");
        console.log("Audio data length: ", message.length);
        console.log("Audio data: ", message);






        // Write audio data to file
        var tmpFile = "audio.pcm";
        console.log("Writing audio data to file: ", tmpFile);
        try {
            fs.writeFileSync(tmpFile, message);
            console.log("Successfully wrote audio data to file: ", tmpFile);
        } catch (err) {
            console.error("Error writing audio data to file: ", tmpFile, err);
        }

        // Play audio file using QuickTime Player
        console.log("Playing audio file using mPlayer");
        try {
            child_process.exec("mplayer " + tmpFile);
        } catch (err) {
            console.error("Error playing audio file using QuickTime Player: ", err);
        }
    }
});
