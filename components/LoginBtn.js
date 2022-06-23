import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/LoginBtn.module.css';

export default function Component(props) {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className={styles.pic}>
        <Link href = '/profile'>
            {/* {session.user.image} */}
            <Image className = {styles.picture} src = {session.user.image}
            width = {40}
            height = {40}
            alt = ''/>
        </Link>
             <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}