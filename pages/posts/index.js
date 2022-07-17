import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css';
import { getSortedPostsData } from '../../lib/test';
import Link from 'next/link';
import Date from '../../components/date';
import styles from '../../styles/Packages.module.css';


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
        <title>Posts</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className={styles.listContainer}>
          <h2 className={utilStyles.headingLg}>Posts</h2>

          <ul className={styles.list}>
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
        </div>
      </section>
    </Layout>
  );
}