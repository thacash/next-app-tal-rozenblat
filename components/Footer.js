import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';
import LoginBtn from './LoginBtn';

export default function Footer() {
  const { data: session } = useSession()
  
  return (
    <div className={styles.footer}>

         <div className={styles.links}>

            <Link href = "/"> Home</Link>
            <Link href = "/about"> About</Link>
            <Link href = "/packages"> Packges</Link>

            <LoginBtn/>

            

        </div>
    </div>
  )
}