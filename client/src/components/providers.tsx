import { store } from '@/store/store';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const Providers = (props: PropsWithChildren) => (
  <Provider store={store}>
    <BrowserRouter>{props.children}</BrowserRouter>
  </Provider>
);
