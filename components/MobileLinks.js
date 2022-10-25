import { useState } from "react";
import Link from 'next/link'
import LoginBtn from './LoginBtn'
import styles from "../styles/NavbarSlim.module.css";
const MobileLinks = ({ open }) => {
  return (
    <nav
      className={open ? styles.mobileNavWrapperOpen : styles.mobileNavWrapper}
    >
      {/* <div className={styles.mobileLinks}> */}
        <Link href="/" activeClassName="active">
          Home
        </Link>
        <Link href="/about" activeClassName="active">
          About
        </Link>
        <Link href="/fire" activeClassName="active">
          Fire
        </Link>
        <Link href="/expenses" activeClassName="active">
          Expenses
        </Link>
        <Link href="/howtouse" activeClassName="active">
          How to use
        </Link>
        <Link href="/packages" activeClassName="active">
          Packages
        </Link>
        
        
      {/* </div> */}
      <LoginBtn />
    </nav>
  );
};

export default MobileLinks