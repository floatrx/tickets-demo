// Styles
import s from './logo.module.css';

export const Logo = () => {
  return (
    <span className={s.wrapper}>
      <img className={s.globe} src="/logo/globe.svg" alt="logo-globe" />
      <img className={s.plane} src="/logo/plane.svg" alt="logo-globe" />
    </span>
  );
};
