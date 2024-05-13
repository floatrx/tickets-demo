import { Header } from '@/components/layout/header';

import type { PropsWithChildren } from 'react';

export const Layout = (props: Required<PropsWithChildren>) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="container my-8 flex-1">{props.children}</main>
    <footer className="border-t">
      <div className="container p-4 text-xs text-gray-400 text-center">
        <p>
          © 2024 AviaSales {' | '}
          <a href="https://github.com/floatrx/resp-aviasales" target="_blank" rel="noopener" className="text-blue-500">
            GitHub.
          </a>
        </p>
      </div>
    </footer>
  </div>
);
