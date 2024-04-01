import clasess from './header.module.css';

export default function Header() {
  return (
    <header className={clasess.header}>
      <div>Realworld Blog</div>
      <div>
        <button type="button" className={clasess.in}>
          Sign In
        </button>
        <button type="button" className={clasess.up}>
          Sing Up
        </button>
      </div>
    </header>
  );
}
