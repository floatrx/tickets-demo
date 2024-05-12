import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import type { PropsWithChildren } from 'react';

/**
 * Providers
 * 1. Redux Provider
 * 2. React Router Provider
 */
export const Providers = (props: PropsWithChildren) => (
  <Provider store={store}>
    <BrowserRouter>{props.children}</BrowserRouter>
  </Provider>
);
