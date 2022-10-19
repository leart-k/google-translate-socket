const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const fs = require("fs");
const {
  Translate
} = require('@google-cloud/translate').v2;

const translate = new Translate();

server.listen(port);

app.use(express.static(path.join(__dirname, 'dist', 'week12lab')));


let translateData = {
  translateText: '',
  targetLang: '',
  translatedText: ''
}

// Imports the Google Cloud client library


io.on("connection", function (socket) {

  socket.on('translateData', (data) => {
    quickStart();
    async function quickStart() {
      let text = data.textTranslate;
      let target = data.targetLang;
      let [translation] = await translate.translate(text, target);
      translateData = data;
      translateData.translatedText = translation;
      io.sockets.emit("dataTranslated", translateData);
    };
  });






});
