import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/HomepageInfoCard.module.css';
import arrow from '../public/images/arrow.png';

export default function HomepageHeaderCard() {
  const { data: session } = useSession()
  
  return (
    <div className={styles.card}>
        <p className={styles.h1}>Managing expenses, at the touch of a button</p>
        <p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor gravida tempus. Nullam suscipit laoreet risus, non euismod elit laoreet eu.</p>
        <div className={styles.links}>

        <Image src = {arrow} width = {40} height= {40} alt = ''></Image>
        </div>
    </div>
  )
}