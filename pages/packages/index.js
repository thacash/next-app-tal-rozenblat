import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';




export default function Packages({ postData }) {
    return (
      <Layout>
        <Head>
          <title>test</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>test</h1>
          <div className={utilStyles.lightText}>
          test
          </div>
          
        </article>
      </Layout>
    );
  }