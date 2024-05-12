import { api } from '@/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// defaults to localStorage for web

// Combine reducers
export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

// Setup store
const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
        devTools: process.env.NODE_ENV !== 'production',
      }).concat([api.middleware]),
  });

export const store = setupStore();

/*
 * * Types
 * * https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState = () => RootState;
