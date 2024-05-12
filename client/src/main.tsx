import { Providers } from '@/components/providers';
import { createRoot } from 'react-dom/client';
import { App } from '@/components/App';

// Styles
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
);
