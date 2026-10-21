/// <reference types="vite/client" />

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-app-title'?: boolean | string;
    'data-app-font-exception'?: boolean | string;
  }
}
