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
      {/* <HomePageBackground> */}
       <div className={styles.about}>
       <h1 className={styles.h1}>About us</h1>

          <div className={styles.p}>

            <p>Cash manage is here to help you manage your finances, by combining your financial information into a simple and easy to understand collection of data.</p>
            <p>Cash Manage is here to give you the tools to achieve financial freedom.</p>
            <p>With our "Fire" calculator, abbreviation for "Financial independence, retire early", you can enter simple financial data about yourself and get a rough estimate as to when you can retire.</p>

            <p>By logging your income and expenses, you can see your spending habits, with that knowledge, you can make informed decisions regarding your spendings.  </p>

          </div>

       </div>
      {/* </HomePageBackground> */}
    </Layout>
  );
}
