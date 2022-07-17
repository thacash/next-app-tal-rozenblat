import Head from "next/head";
import Image from 'next/image';
import Layout from "../components/layout";
import styles from "../styles/Fire.module.css";
import { useEffect } from "react";

import { server } from '../config/index.js'
import RetirementCalculator from "../components/RetirementCalculatorNew";






export default function Fire() {

   
  return (
    <Layout>
      <Head>
        <title>Fire</title>
      </Head>
      <div className={styles.main}>
        <RetirementCalculator/>
        
      </div>
    </Layout>
  );
}
