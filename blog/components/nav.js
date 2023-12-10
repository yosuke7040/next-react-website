import Link from "next/link";
import { useState } from "react";
import styles from "styles/nav.module.css";

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggeleNav = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button className={styles.btn} onClick={toggeleNav}>
        MENU
      </button>
      <ul className={styles.list}>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <Link href="/blog">BLOG</Link>
        </li>
      </ul>
    </nav>
  );
}
