import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Documentation.module.css";
import deleteIcon from "../public/images/delete.svg";
import { server } from "../config/index.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TableOfContents from "../components/newTOC";

export async function getStaticProps() {
  const expensesData = await fetch(
    `${server}/api/mongo/documentation/expenses`
  ).then((response) => response.json());
  return {
    props: {
      expensesData,
    },
  };
}
export default function Documentation({ expensesData }) {
  const router = useRouter();

  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const headingElementsText = [];
    headingElements.forEach((item) => {
      item.id = item.innerText.replace(/ /g, "").replace(".", "");
      headingElementsText.push(item.innerText);
    });

    setTableOfContents(headingElementsText);
  }, [router.query.id]);

  return (
    <Layout>
      <Head>
        <title>Documentation</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.article}>
          <h1 className={styles.h1}>
            Here are some examples of our app in action
          </h1>
          <div className={styles.card}>
            <h2 className={styles.h2}>Expenses</h2>
            <h4 className={styles.h4}>Adding and deleteing expenses:</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

                {expensesData.map(({ category, amount, desc, _id, date }) => (
                  <tr key={_id}>
                    <td>{category}</td>
                    <td>{`${amount}₪`}</td>
                    <td>{date}</td>
                    <td>
                      <button className={styles.deleteBtn}>
                        <Image
                          src={deleteIcon}
                          width={40}
                          height={40}
                          alt=""
                        ></Image>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.p}></div>
        </div>
        <div className={styles.toc}>
          <TableOfContents tableOfContents={tableOfContents} />

        </div>
      </div>
    </Layout>
  );
}
