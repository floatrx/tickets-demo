import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';

export type BaseQueryHandler = (
  args: FetchArgs | string,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>,
) => Promise<any>;
