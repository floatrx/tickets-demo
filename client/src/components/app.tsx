import { router } from '@/components/router/app-router';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
