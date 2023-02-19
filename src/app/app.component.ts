import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PartOfSpeech } from './models/part-of-speech.interface';
import { SentenceService } from './services/sentence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sentence-builder';
  partsOfSpeech: Observable<PartOfSpeech[]> = this.sentenceService.getPartsOfSpeech();

  // private destroy$ = new Subject();

  constructor(private sentenceService: SentenceService){}

  ngOnInit(){
    // this.partsOfSpeech =
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }
}
