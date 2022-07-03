import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import LoginBtn from './LoginBtn.js';
import Image from 'next/image';
import logo from '../public/images/navbarLogo.png';


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
                <LoginBtn />
            </div>
        </div>
    );
};


export default Navbar;