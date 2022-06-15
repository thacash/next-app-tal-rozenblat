import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useAuthContext } from '../context/authContext';
import tal from '@talrozen/tal-npm';
import HomepageHeaderCard from '../components/HomepageHeaderCard';
import styles from '../styles/Home.module.css';
import HomePageBackground from '../components/HomePageBackground';
import HomepageInfoCard from '../components/HomepageInfoCard';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {

  const [currentUser, setCurrentUser] = useAuthContext();
  const logTal = () => {
    console.log(tal);
    
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <HomePageBackground>

        {/* <div className={styles.container}> */}
        <div>

          <HomepageHeaderCard></HomepageHeaderCard>
        </div>

        <div className={styles.cardsContainer}>
          <HomepageInfoCard/>
          <HomepageInfoCard/>
          <HomepageInfoCard/>
        </div>
      </HomePageBackground>
      {/* <section className={utilStyles.headingMd}>
        <p>Hello, I am Tal. I am a fullstack software developer.
          You can contact me at <a href = "https://www.linkedin.com/in/tal-rozenblat-a389ab207/">LinkedIn</a> </p>
        <p>{currentUser}
          (This is a sample website - you will be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <button onClick={logTal}>console log </button>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}