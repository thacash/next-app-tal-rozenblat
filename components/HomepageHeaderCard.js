import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/HomepageHeaderCard.module.css';

export default function HomepageHeaderCard() {
  const { data: session } = useSession()
  
  return (
    <div className={styles.card}>
        <h1 className={styles.h1}>Managing expenses, at the touch of a button</h1>
        <p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor gravida tempus. Nullam suscipit laoreet risus, non euismod elit laoreet eu.</p>
        <div className={styles.links}>

          <Link href = '/about' >LEARN MORE</Link>
        </div>
    </div>
  )
}