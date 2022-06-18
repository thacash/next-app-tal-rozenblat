import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css';
import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';
import Date from '../../components/date';
import tal from '@talrozen/tal-npm';
import HomepageHeaderCard from '../../components/HomepageHeaderCard';
import styles from '../../styles/Home.module.css';
import HomePageBackground from '../../components/HomePageBackground';
import HomepageInfoCard from '../../components/HomepageInfoCard';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Packages({ allPostsData }) {

  

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <HomePageBackground>

       
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Packages</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/packages/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
      </HomePageBackground>

    </Layout>
  );
}