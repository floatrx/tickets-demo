import { Logo } from '@/components/layout/logo';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <div className="container flex justify-center py-4">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  </header>
);
