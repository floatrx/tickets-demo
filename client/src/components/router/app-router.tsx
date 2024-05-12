import { Home } from '@/components/pages/home-page';
import { TicketCreate } from '@/components/pages/ticket-create';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// You can do this:
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="create" element={<TicketCreate />} />
    </Route>,
  ),
);
