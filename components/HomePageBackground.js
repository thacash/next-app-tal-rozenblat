import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/HomePageBackground.module.css'
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function HomePageBackground({ children, home }) {
  return (
    <div className={styles.background}>
      
      <main>{children}</main>
      

    </div>
  );
}