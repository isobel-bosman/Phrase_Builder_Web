import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  filter,
  first,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
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
  };
  @Input() index = -1;

  @Output() posSelected = new EventEmitter<PartOfSpeech>();
  @Output() removeWord = new EventEmitter<number>();
  @Output() updateWord = new EventEmitter<{ word: Word; index: number }>();

  words: Word[] = [];
  filteredWords: Observable<Word[]> = new Observable();
  wordControl = new FormControl('');

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
    if (this.isEditable) {
      this.sentenceService
        .getWords(
          this.word.partOfSpeech.partOfSpeech === 'PUN'
            ? '.'
            : this.word.partOfSpeech.partOfSpeech,
          this.word.type
        )
        .pipe(
          first(),
          filter((v) => !!v),
          tap((x) => (this.words = x)),
          switchMap(
            () =>
              (this.filteredWords = this.wordControl.valueChanges.pipe(
                startWith(''),
                map((value) => {
                  const word = typeof value === 'string' ? value : value?.word;
                  return word
                    ? this._filter(word as string)
                    : this.words.slice();
                })
              ))
          )
        )
        .subscribe();
    }
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
    this.updateWord.emit({ word: e.option.value, index: this.index });
  }

  getOptionText(option: Word) {
    return option.word;
  }

  private _filter(value: string): Word[] {
    const filterValue = value.toLowerCase();
    return this.words.filter((word) =>
      word.word.toLowerCase().includes(filterValue)
    );
  }
}
