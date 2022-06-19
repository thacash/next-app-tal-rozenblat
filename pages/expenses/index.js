import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import Date from '../../components/date';
import styles from '../../styles/Packages.module.css';
import HomePageBackground from '../../components/HomePageBackground';
import AddExpenseForm from '../../components/AddExpenseForm';


export default function Expenses({ allPostsData }) {

  

  return (
    <Layout home>
      <Head>
        <title>Expenses</title>
      </Head>
      <HomePageBackground>

       
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <AddExpenseForm/>
      </section>
      </HomePageBackground>

    </Layout>
  );
}