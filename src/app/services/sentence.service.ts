import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartOfSpeech } from '../models/part-of-speech.interface';
import { Sentence } from '../models/sentence.interface';
import { Word } from '../models/word.interface';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  apiBaseUrl = `${environment.apiBaseUrl}`;

	constructor(private httpClient: HttpClient) {}

	getWords(partOfSpeech: string, type: string): Observable<Word[]> {
		return this.httpClient.get<Word[]>(
			`${this.apiBaseUrl}/api/Sentence/words?pos=${partOfSpeech}&type=${type}`,
		);
	}

  getPartsOfSpeech(): Observable<PartOfSpeech[]> {
		return this.httpClient.get<PartOfSpeech[]>(
			`${this.apiBaseUrl}/api/Sentence/partsofspeech`,
		);
	}

  createSentence(sentence: Sentence): Observable<Sentence> {
		return this.httpClient.post<Sentence>(
			`${this.apiBaseUrl}/api/Sentence`, sentence
		);
	}

  getSentenceHistory(): Observable<Sentence[]> {
		return this.httpClient.get<Sentence[]>(
			`${this.apiBaseUrl}/api/Sentence/saved`,
		);
	}

}
