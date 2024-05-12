import { Route, Routes } from 'react-router';
import { Home } from '@/components/pages/home-page';
import { Layout } from '@/components/layout/layout';
import { NotFound } from '@/components/pages/not-found';
import { Providers } from '@/components/providers';

export const App = () => (
  <Providers>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Providers>
);
