import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

import type { PropsWithChildren } from 'react';

export const Layout = (props: Required<PropsWithChildren>) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="container my-8 flex-1">{props.children}</main>
    <Footer />
  </div>
);
