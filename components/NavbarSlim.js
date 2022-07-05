import Link from "next/link";
import styles from "../styles/NavbarSlim.module.css";
import LoginBtn from "./LoginBtn.js";
import Image from "next/image";
import logo from "../public/images/navbarLogo.png";
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
                <Image src={logo} width={100} height={50} alt="" />
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
            {/* <LoginBtn size={"small"} /> */}
          </span>
        </div>
      </header>
      <MobileLinks open = {mobileNavOpen}/>
    </div>
  );
};

export default NavbarSlim;
