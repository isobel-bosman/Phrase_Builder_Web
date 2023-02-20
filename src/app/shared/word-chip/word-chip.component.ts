import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PartOfSpeech } from 'src/app/models/part-of-speech.interface';
import { Word } from 'src/app/models/word.interface';
import { SentenceService } from 'src/app/services/sentence.service';

@Component({
  selector: 'app-word-chip',
  templateUrl: './word-chip.component.html',
  styleUrls: ['./word-chip.component.scss'],
})
export class WordChipComponent implements OnInit {
  @Input() text = '';
  @Input() type = '';
  @Input() isEditable = false;
  @Input() isRemovable = false;
  @Input() word: Word = {
    id: '',
    word: '',
    partOfSpeech: {
      partOfSpeech: '',
      description: '',
    },
    type: '',
  }
  @Input() index = -1;

  @Output() posSelected = new EventEmitter<PartOfSpeech>();
  @Output() removeWord = new EventEmitter<number>();
  @Output() updateWord = new EventEmitter<{word: Word, index: number}>();

  words: Observable<Word[]> = new Observable();
  wordControl = new FormControl('');

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
    this.words = this.sentenceService.getWords(this.type, this.word.type);
  }

  selectItem(): void {
    this.posSelected.emit({
      partOfSpeech: this.type,
      description: this.text,
    });
  }

  removeItem(): void {
    this.removeWord.emit(this.index);
  }

  wordChanged(e: any): void {
    // console.log(e.option.value);
    this.updateWord.emit({word: e.option.value, index: this.index})
  }

  getOptionText(option: Word) {
    return option.word;
  }
}
