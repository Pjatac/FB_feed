import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as featureActions from './posts.action';

import { IPost } from '../../models/Post';

export interface IFeatureState {
  searched: boolean;
  allLoaded: boolean;
  limit: number;
  skip: number;
  data: IPost[];
  error?: string;
}

const defaultState: IFeatureState = {
  searched: false,
  allLoaded: false,
  data: [],
  error: '',
  limit: 10,
  skip: 0
};

const getAppState = createFeatureSelector<IFeatureState>('posts');

export const getData = createSelector(getAppState, state => state.data);
export const getLimitValue = createSelector(getAppState, state => state.limit);
export const getSkipValue = createSelector(getAppState, state => state.skip);
export const isSearched = createSelector(getAppState, state => state.searched);
export const isAllLoaded = createSelector(getAppState, state => state.allLoaded);

const postsreducer = createReducer<IFeatureState>(
  defaultState,
  on(
    featureActions.fetchDataAction,
    (state) => {
      return {
        ...state,
        error: '',
        data: [],
        allLoaded: false
      };
    }
  ),
  on(
    featureActions.fetchDataSuccessAction,
    (state, action) => {
      return {
        ...state,
        error: '',
        searched: true,
        data: action.data
      };
    }
  ),
  on(
    featureActions.loadMoreDataSuccessAction,
    (state, action) => {
      return {
        ...state,
        error: '',
        data: [ ...state.data, ...action.data ]
      };
    }
  ),
  on(
    featureActions.fetchDataErrorAction,
    featureActions.loadMoreDataErrorAction,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  )
);

export function postsReducer(state: IFeatureState, action: any) {
  return postsreducer(state, action);
}
