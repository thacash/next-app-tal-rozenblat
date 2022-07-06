import '../styles/globals.css';
import { AuthContextProvider } from '../context/authContext';
import { SessionProvider } from "next-auth/react"



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp
