import { PartOfSpeech } from "./part-of-speech.interface";

export interface Word {
  id:	string,
  word:	string,
  type:	string,
  partOfSpeech:	PartOfSpeech
}
