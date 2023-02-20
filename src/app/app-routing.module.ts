import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SentenceBuilderComponent } from './sentence-builder/sentence-builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sentence-builder/:sentenceType', component: SentenceBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
