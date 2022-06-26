import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Profile.module.css';
import { useSession, signIn, signOut } from "next-auth/react"




export default function Component() {

  const handleSignout = () => {


    signOut({
      callbackUrl: `${window.location.origin}`
    });

  }

  const { data: session } = useSession()
  if (session) {
    return (
      <div className={styles.container}>
        <Image className={styles.picture} src={session.user.image}
          width={40}
          height={40}
          alt='' />
        <p> Name: {session.user.name} </p>
        <p> Email: {session.user.email} </p>

        <button onClick={handleSignout}>Sign out</button>


      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}