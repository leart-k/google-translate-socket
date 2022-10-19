import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface Translation {
  textTranslate: string,
  targetLang: string,
  translatedText: ''
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  socket: any;

  translationReq: Translation = {
    textTranslate: '',
    targetLang: '',
    translatedText: ''
  };

  translatedDB: any[] = [];

  ngOnInit() {
    this.socket = io();
    this.listenTranslation();
    console.log(typeof (this.socket));
  };

  listenTranslation() {
    this.socket.on('dataTranslated', (data: Translation) => {
      this.translatedDB.push(data);
    });
  };

  sendTranslation() {
    this.socket.emit('translateData', this.translationReq);
  };

};



