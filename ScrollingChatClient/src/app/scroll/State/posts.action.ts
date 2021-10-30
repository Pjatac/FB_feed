import { createAction, props } from '@ngrx/store';

import { IPost } from '../../models/Post';

export const fetchDataAction = createAction(
  '[Feature] Fetch Data'
);

export const fetchDataSuccessAction = createAction(
  '[Feature] Fetch Data Success',
  props<{ data: IPost[] }>()
);

export const fetchDataErrorAction = createAction(
  '[Feature] Fetch Data Error',
  props<{ error: string }>()
);

export const loadMoreDataAction = createAction(
  '[Feature] Load Data'
);

export const loadMoreDataSuccessAction = createAction(
  '[Feature] Load Data Success',
  props<{ data: IPost[] }>()
);

export const loadMoreDataErrorAction = createAction(
  '[Feature] Load Data Error',
  props<{ error: string }>()
);
