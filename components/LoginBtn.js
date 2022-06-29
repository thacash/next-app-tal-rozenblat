import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/LoginBtn.module.css';
import { getUserByEmail }from '../lib/users';
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";


export default function Component(props) {
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState();
  const [currentUser, setCurrentUser] = useAuthContext();

  useEffect(() => {
    if (session) {
      const dbUser = getUserByEmail(session.user.email);
      dbUser.then((data) =>{
        setUserProfile(data);
        setCurrentUser(data);
      });
    }
    if (!session) {
      setUserProfile();
      setCurrentUser({});
    }
  }, [session]);

  useEffect(() => {
    if (!session) {
      setUserProfile();
    }
  }, [session]);


  // useEffect(() => {
  //   if (userProfile) {
  //     console.log(userProfile);
  //     console.log('this', currentUser);
  //   }
  // }, [userProfile]);

  if (session) {
    return (
      <div className={styles.pic}>
        <Link href = '/profile'>
            <Image className = {styles.picture} src = {session.user.image}
            width = {40}
            height = {40}
            alt = ''/>
        </Link>
             <br />
      </div>
    )
  }
  
  else if (props.big){
    return (
      <div className={styles.big}>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    ) 
  }
  return (
    <div className={styles.container}>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}