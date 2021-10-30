import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './posts.action';
import * as appActions from './../../state/app.action';

import { IPost } from './../../models/Post';

import { DataService } from './../../services/data.service';

@Injectable()
export class PostsEffects {

  constructor(private action$: Actions, private dataService: DataService) {}

  readonly fetchData$ = createEffect(() =>
  this.action$.pipe(
      ofType(featureActions.fetchDataAction),
      exhaustMap(action => this.dataService.fetchData().pipe(
        switchMap((data: IPost[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.fetchDataSuccessAction({ data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.fetchDataErrorAction({ error })
          ])
        )
      ))
    )
  );

  readonly fetchMoreData$ = createEffect(() =>
    this.action$.pipe(
      ofType(featureActions.loadMoreDataAction),
      exhaustMap(action => this.dataService.fetchData().pipe(
        switchMap((data: IPost[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.loadMoreDataSuccessAction({ data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.loadMoreDataErrorAction({ error })
          ])
        )
      ))
    )
  );
}
