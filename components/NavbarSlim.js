import Link from "next/link";
import styles from "../styles/NavbarSlim.module.css";
import LoginBtn from "./LoginBtn.js";
import Image from "next/image";
import logo from "../public/images/navbarLogo.png";
import fireLogo from '../public/images/fire.png';
import { useState } from "react";
import MobileLinks from './MobileLinks';

const NavbarSlim = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const handleOpenMobile = () => {
        setMobileNavOpen(!mobileNavOpen);
    }
  return (
    <div>
      <header className={styles.navigationWrapper}>
        <div className={styles.navigationHeader}>
          <span className={styles.navigationNames}>
            <Link href={"/"}>
              <button className={styles.btn}>
                <Image src={fireLogo} width={50} height={50} alt="" />
              </button>
            </Link>
          </span>
          <span className={styles.navigationLinks}>
            <button
              className={mobileNavOpen ? styles.mobileMenuOpen : styles.mobileMenu}
              onClick={handleOpenMobile}
            >
              <div className={styles.bar1}></div>
              <div className={styles.bar2}></div>
              <div className={styles.bar3}></div>
            </button>
          </span>

          <nav className = {styles.webNav}>
            
                    <ul className={styles.nav_links}>
                        <li><Link href="/"> Home</Link></li>
                        <li><Link href="/about"> About</Link></li>
                        <li><Link href="/fire"> Fire</Link></li>
                        <li><Link href="/packages"> Packages</Link></li>
                        <li><Link href="/expenses"> Expenses</Link></li>
                        <li><Link href="/documentation"> Documentation</Link></li>

                        <li><LoginBtn /></li>
                    </ul>

                </nav>
        </div>
      </header>
      <MobileLinks open = {mobileNavOpen}/>
    </div>
  );
};

export default NavbarSlim;
