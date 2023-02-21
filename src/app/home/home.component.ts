import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sentence } from '../models/sentence.interface';
import { SentenceService } from '../services/sentence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sentenceHistory: Observable<Sentence[]> =
    this.sentenceService.getSentenceHistory();

  constructor(private sentenceService: SentenceService) {}
}
