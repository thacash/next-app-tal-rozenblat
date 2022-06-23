import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/About.module.css";
import HomePageBackground from "../components/HomePageBackground";
import HomepageInfoCard from '../components/HomepageInfoCard'
import HomepageHeaderCard from "../components/HomepageHeaderCard";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <HomePageBackground>
       <div className={styles.about}>
          <h1 className={styles.h1}>about us</h1>
          <div className={styles.p}>

            <p>Cash manage is here to help you manage your finances, by combining your financial information into a simple and easy to understand collection of data.</p>
            <p>By logging you income and expenses, you can see organized </p>

          </div>
       </div>
      </HomePageBackground>
    </Layout>
  );
}
