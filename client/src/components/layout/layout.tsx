import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import type { PropsWithChildren } from 'react';

export const Layout = (props: Required<PropsWithChildren>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container my-8 flex-1">{props.children}</main>

      <footer className="border-t">
        <div className="container p-4 text-xs text-gray-400">
          <p>
            © 2024 AviaSales {' | '}
            <a
              href="https://github.com/floatrx/resp-aviasales"
              target="_blank"
              rel="noopener"
              className="text-blue-500"
            >
              GitHub.
            </a>
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
