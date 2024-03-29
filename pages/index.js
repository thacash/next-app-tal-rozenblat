import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/layout";
import HomepageHeaderCard from "../components/HomepageHeaderCard";
import HomepageInfoCard from "../components/HomepageInfoCard";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <HomepageHeaderCard />
      </div>
      <div className={styles.cardsContainer}>
        <HomepageInfoCard
          title="About us"
          body="Learn more about Cash Manage"
          route='/about'
        />
        {/* <HomepageInfoCard title="Packages" body="NPM packages I created" route='/packages' /> */}
        <HomepageInfoCard title="Fire Calculator" body="A tool for calculating your way to financial freedom" route='/fire' />

        <HomepageInfoCard title="Expenses" body="Manage your expenses" route='/expenses' />
      </div>
    </Layout>
  );
}
