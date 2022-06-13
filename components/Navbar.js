import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {


    return (
    <div className={styles.Navbar}>
        <div className={styles.links}>

            <Link href = "/"> Home</Link>
            <Link href = "/packages"> Packges</Link>
            

        </div>
    </div>
    );
};


export default Navbar;