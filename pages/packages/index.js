import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import { getPackagesData } from '../../lib/packages'


export async function getStaticProps() {
  const allPackagesData = getPackagesData();

  return {
    props: {
      allPackagesData,
    },
  };
}

export default function Packages({ allPackagesData }) {
    return (
      <Layout>
        <Head>
          <title>test</title>
        </Head>
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
      </section>
      </Layout>
    );
  }