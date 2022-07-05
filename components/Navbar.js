import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import LoginBtn from './LoginBtn.js';
import Image from 'next/image';
import logo from '../public/images/navbarLogo.png';
import menuIcon from '../public/images/menuIcon.svg';
import { useState } from 'react';


const Navbar = () => {
    const [open, setOpen] = useState(false);


    const handleOpenMobile = () => {
        setOpen(!open);
    }

    return (

        <div className={styles.Navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>

                    <Link href={'/'}>
                        <button className={styles.btn}>
                            <Image src={logo} width={100} height={50} alt="" />
                        </button>
                    </Link>

                </div>

                <nav>
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
                <div className={styles.mobileMenu}>



                    <div className={open ? styles.mobileLinks : styles.mobileLinksClose}>
                        <Link href="/"> Home</Link>
                        <Link href="/about"> About</Link>
                        <Link href="/fire"> Fire</Link>
                        <Link href="/packages"> Packages</Link>
                        <Link href="/expenses"> Expenses</Link>
                        <Link href="/documentation"> Documentation</Link>
                        <LoginBtn />
                    </div>
                    <button className={open ? styles.menuBtn : styles.menuBtnClose} onClick={handleOpenMobile}>
                        {/* <Image src={menuIcon} width={24} height={24} alt="menu" /> */}
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>

                    </button>

                </div>

            </div>
        </div>
    );
};


export default Navbar;