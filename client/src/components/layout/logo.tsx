export const Logo = () => {
  return (
    <span className="relative size-[60px] flex items-center justify-center">
      <img src="/logo/globe.svg" alt="logo-globe" />
      <img className="absolute inset-1" src="/logo/plane.svg" alt="logo-globe" />
    </span>
  );
};
