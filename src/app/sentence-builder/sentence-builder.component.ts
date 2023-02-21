import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PartOfSpeech } from '../models/part-of-speech.interface';
import { Sentence } from '../models/sentence.interface';
import { Word } from '../models/word.interface';
import { SentenceService } from '../services/sentence.service';

@Component({
  selector: 'app-sentence-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.scss']
})
export class SentenceBuilderComponent implements OnInit {
  sentenceType: string = "";
  partsOfSpeech: Observable<PartOfSpeech[]> = this.sentenceService.getPartsOfSpeech();
  sentence: Sentence = {
    words: []
  };
  isValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sentenceService: SentenceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sentenceType = this.route.snapshot.paramMap.get('sentenceType') ?? "";
  }

  selectPos(e: PartOfSpeech):void{
    this.isValid = false;
    this.sentence.words.push({
      id: "",
      word: "",
      partOfSpeech: e,
      type: this.sentenceType
    });
  }

  updateWord(word: {word:Word, index:number}):void{
    this.sentence.words[word.index] = word.word;
    this.updateValidity();
  }

  removeWord(index:number):void{
    this.sentence.words.splice(index, 1);
    this.updateValidity();
  }

  saveSentence():void{
    if(this.isValid){
      this.sentenceService.createSentence(this.sentence).subscribe(val =>{
        if(val){
          this.sentence = {
            words: []
          };
          this.backToHome();
        }
      });
    }
  }

  backToHome():void{
    this.router.navigate(["/"])
  }

  private updateValidity(): void {
    const empytWords = this.sentence.words.filter(word => word.id == "");
    this.isValid = empytWords.length === 0 && this.sentence.words.length > 0;
  }

}
