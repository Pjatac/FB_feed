import { Injectable } from '@angular/core';
import { combineLatest, fromEvent, Observable, of } from 'rxjs';
import { delay, map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as appActions from './../state/app.action';
import * as featureActions from '../scroll/State/posts.action';
import { IFeatureState, isSearched, isAllLoaded, getLimitValue, getSkipValue } from '../scroll/State/posts.reducer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { IPost } from '../models/Post';



@Injectable()
export class DataService {

  sampleData: IPost[] = [];

  constructor(private readonly store: Store<IFeatureState>, private http: HttpClient) {}

  private readonly url = 'https://localhost:44398/posts';

  readonly scrollAction$: Observable<Event> = fromEvent(document, 'scroll');
  readonly isSearched$: Observable<boolean> = this.store.select(isSearched);
  readonly isAllLoaded$: Observable<boolean> = this.store.select(isAllLoaded);
  readonly getLimitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly getSkipValue$: Observable<number> = this.store.select(getSkipValue);

  readonly loadMoreData$: Observable<boolean> = combineLatest([
    this.isSearched$,
    this.scrollAction$,
    this.isAllLoaded$
  ]).pipe(
    map(([searched, _, allLoaded]) => {
      if (searched && !allLoaded) {
        let screen = Math.floor(
          document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight
        );
        return screen <= 0;
      }
      return false;
    })
  );

  fetchData(): Observable<IPost[]> {
    let httpParams = new HttpParams()
          .set('skip', this.sampleData.length)
          .set('count', 10)
        return this.http.get<IPost[]>(this.url, {
          params: httpParams,
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
          withCredentials: true
        })
          .pipe(
            tap(res => {
              this.sampleData.push(...res);
            })
          ).pipe(delay(1500), take(1));
  }

  fetchDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.fetchDataAction());
  }

  loadMoreDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.loadMoreDataAction());
  }
}
