import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import data from '../assets/words'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data;
  beforeStart = true;
  fetched = false;
  synth = window.speechSynthesis;
  voice = this.synth.getVoices()[0];
  utterThis;
  wordsList = data.split(" ");
  goodAns = 0;
  badAns = 0;
  pickedWord = ""
  answer = ""
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  startGame() {
    this.beforeStart = false;
    this.prepare();
  }

  randomNum() {
    return Math.floor(Math.random() * (this.wordsList.length - 0 + 1)) + 0
  }

  pickWord() {
    return this.wordsList[this.randomNum()]
  }

  prepare() {
    this.data = null;
    this.fetched = false;
    this.pickedWord = this.pickWord();
    console.log(this.pickedWord)
    this.utterThis = new SpeechSynthesisUtterance(this.pickedWord);
    this.utterThis.lang = 'en-US';
    this.utterThis.rate = 0.4;
    this.speak()
  }

  speak() {
    this.synth.speak(this.utterThis)
  }

  checkWord() {
    if(this.answer==this.pickedWord && !this.fetched) this.goodAns++
    else if(this.answer!=this.pickedWord) this.badAns++;
    this.answer = '';
    this.prepare();
  }

  search(word) {
    this.fetched = true;
    return this.http.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word).subscribe(el => {
      console.log(el[0].meanings);
      this.data = el[0].meanings
    })
  }
}