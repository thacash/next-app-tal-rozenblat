import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import LoginBtn from './LoginBtn.js';

const Navbar = () => {


    return (
    <div className={styles.Navbar}>
        <div className={styles.links}>

            <Link href = "/"> Home</Link>
            <Link href = "/packages"> Packges</Link>
            <LoginBtn/>

            

        </div>
    </div>
    );
};


export default Navbar;