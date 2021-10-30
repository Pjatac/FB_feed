import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsReducer } from './State/posts.reducer';
import { PostsEffects } from './State/posts.effect';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ScrollComponent } from './scroll.component';
import { DataService } from '../services/data.service';

const homeRoutes: Routes = [
  { path: 'scroll', component: ScrollComponent }
];

@NgModule({
  declarations: [
    ScrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    MatListModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataService
  ]
})
export class ScrollModule {}
