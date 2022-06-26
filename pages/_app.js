import '../styles/globals.css';
import { AuthContextProvider } from '../context/authContext';
import { SessionProvider } from "next-auth/react"
import { getUserByEmail }from '../lib/users';
import { useEffect } from 'react';
// import { useSession } from 'next-auth-client';
import { useSession, signIn, signOut } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  // const [userSession, loading] = useSession();
  // const { data: session } = useSession()

  // const [userProfile, setUserProfile] = useState();


  // useEffect(() => {
  //   if (session) {
  //     const dbUser = getUserByEmail(session.user.email);
  //     dbUser.then((data) => setUserProfile(data));
  //   }
  //   if (!session) {
  //     setUserProfile();
  //   }
  // }, [session]);

  // useEffect(() => {
  //   if (!session) {
  //     setUserProfile();
  //   }
  // }, [loading]);


  // useEffect(() => {
  //   if (userProfile) {
  //     console.log(userProfile);
  //   }
  // }, [userProfile]);

  
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp
