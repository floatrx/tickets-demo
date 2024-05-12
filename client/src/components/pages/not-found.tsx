import { Ghost } from 'lucide-react';

export const NotFound = () => (
  <div className="space-y-4 text-center sm:text-xl">
    <h1 className="flex flex-col items-center">
      <Ghost size={80} className="text-cyan-500" />
      <br />
      <span className="text-2xl font-bold sm:text-4xl">404 - Not Found!</span>
    </h1>
    <p className="text-muted-foreground">The page you're looking for not found or not implemented yet...</p>
  </div>
);
