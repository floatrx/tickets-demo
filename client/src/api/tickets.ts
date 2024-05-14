import { api } from '@/api/index';

import type { ITicket, ITicketCreate, ITicketListFilters } from '@/types/ticket';

const path = '/tickets';
const type = 'Ticket';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    listTickets: query<SearchResults<ITicket>, ITicketListFilters>({
      query: (params) => ({ url: path, params }),
      providesTags: [type],
    }),
    getTicket: query<ITicket, string | undefined>({
      query: (id) => `${path}/${id}`,
      providesTags: [type],
    }),
    createTicket: mutation<ITicket, ITicketCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useListTicketsQuery, useGetTicketQuery, useLazyGetTicketQuery, useCreateTicketMutation } =
  injectedRtkApi;
