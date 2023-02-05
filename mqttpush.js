var express = require("express");
var app = express();
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://t1.arcischain.io:1883");

client.on("connect", function () {
  console.log("Connected to MQTT broker");
});

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("push-to-talk");
});

app.post("/audio", function (req, res) {
  var audioBlob = req.body;
  console.log("Sending audio data to MQTT broker...");
  client.publish("audio_topic", audioBlob);
  console.log("Audio data sent to MQTT broker");
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});
