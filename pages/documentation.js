import Head from "next/head";
import Image from 'next/image';
import Layout from "../components/layout";
import styles from "../styles/Documentation.module.css";
import deleteIcon from '../public/images/delete.svg';
import { getExamples } from '../lib/documentation.js';
import { useEffect } from "react";



export async function getStaticProps() {
    const expensesData = await getExamples('expenses');
  
    return {
      props: {
        expensesData,
      },
    };
  }
export default function Documentation( { expensesData } ) {

    useEffect(() => {
        console.log(expensesData);
    },[])
  return (
    <Layout>
      <Head>
        <title>Documentation</title>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.h1}>
          Here are some examples of our app in action
        </h1>
        <div className={styles.card}>
            <h2 className = {styles.h2}>
                Expenses 
            </h2>
            <h4 className = {styles.h4}>
                Adding and deleteing expenses:
            </h4>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>

                    </tr>

                    {expensesData.map(({ category, amount, desc, _id, date }) => (

                        <tr key={_id}>
                            <td>{category}</td>
                            <td>{`${amount}₪`}</td>
                            <td>{desc === 'null' ? '' : desc}</td>
                            <td>{date}</td>
                            <td><button className={styles.deleteBtn}>
                                <Image src = {deleteIcon} width ={40} height ={40} alt = ""></Image>    
                            </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.p}>
            
        </div>
      </div>
    </Layout>
  );
}