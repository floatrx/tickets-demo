import { glob } from 'glob';
import type { FunctionComponent, PropsWithChildren } from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_PORT: string;
      VITE_API_BASE_URL: string;
    }
  }
}

declare global {
  type FC<T = object> = FunctionComponent<PropsWithChildren<T>>;
  type SearchResults<T> = {
    data: T[];
    total: number;
  };
}
