import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Navbar from './Navbar';
import NavbarSlim from './NavbarSlim';
import Footer from './Footer';
export const siteTitle = 'Cash Manage';
import { useEffect, useState } from 'react';
import HomePageBackground from "../components/HomePageBackground";


export default function Layout({ children, home }) {

  // const [scroll, setScroll] = useState(false);
  // const changeScroll = (e) => {
  //   console.log(e);
      // if(window.scrollY <= 80){
      //     // setScroll(true);
      //     return true;
      // }

      // else{
      //     // setScroll(false);
      //     return false;
      // }
  // }

  // useEffect(() => {
  //   if (window){
  //     console.log(window);
  //   }
  // }, [window])

  // window.addEventListener('scroll', changeScroll);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* {scroll ? <Navbar /> : <NavbarSlim/>} */}
      <HomePageBackground>

     <Navbar/>
      <main className={styles.main}>{children}</main>
    

      <Footer></Footer>
      </HomePageBackground>

    </div>
  );
}