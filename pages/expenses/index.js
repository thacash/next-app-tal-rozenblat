import Head from "next/head";
import Layout from "../../components/layout";
import HomePageBackground from "../../components/HomePageBackground";
import AddExpenseForm from "../../components/AddExpenseForm";

export default function Expenses() {
  return (
    <Layout home>
      <Head>
        <title>Expenses</title>
      </Head>
      {/* <HomePageBackground> */}
        <AddExpenseForm />


      {/* </HomePageBackground> */}
    </Layout>
  );
}
