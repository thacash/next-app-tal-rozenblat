import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import LoginBtn from './LoginBtn.js';
import Image from 'next/image';
import logo from '../public/images/navbarLogo.png';
import menuIcon from '../public/images/menuIcon.svg';


const Navbar = () => {

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
                        <li><Link href="/packages"> Packages</Link></li>
                        <li><Link href="/expenses"> Expenses</Link></li>
                        <li><Link href="/documentation"> Documentation</Link></li>

                    </ul>

                </nav>
                <div className={styles.mobileMenu}>

                    <LoginBtn />
                    
                    <div className={styles.mobileLinks}>
                        <Link href="/"> Home</Link>
                        <Link href="/about"> About</Link>
                        <Link href="/packages"> Packages</Link>
                        <Link href="/expenses"> Expenses</Link>
                        <Link href="/documentation"> Documentation</Link>
                    </div>
                    <button className={styles.menuBtn}>
                        <Image src={menuIcon} width={24} height={24} alt="menu" />
                    </button>
                    
                </div>
               
            </div>
        </div>
    );
};


export default Navbar;