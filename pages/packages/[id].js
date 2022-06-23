import Layout from '../../components/layout';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import HomePageBackground from '../../components/HomePageBackground';
import { useRouter } from "next/router";
import talNpm from '@talrozen/tal-npm';
import cashNpm from '@talrozen/cash-manage';

// import cashfinancefinance from "@thacash/cash_finance";

export async function getStaticProps({ params }) {

  // console.log(params.id)
  // console.log(cashfinancefinance)
  console.log(talNpm)

  let pacakgeContents;
  if (params.id === "tal-npm") {
    pacakgeContents = Object.values(talNpm).map((item) => {
      return {
        body: item.toString(),
        name: item.name,
        length: item.length,
      };
    });
  } else if (params.id === "cash-manage") {
    pacakgeContents = Object.values(cashNpm).map((item) => {
      return {
        body: item.toString(),
        name: item.name,
        length: item.length,
      };
    });
  }


  const postData = await getPostData(params.id);
  const files = getSortedPostsData();
  files.map((item) => item.level);
  const levelsSet = new Set(files.map((item) => item.level));

  const levels = Object.assign(...Array.from(levelsSet, (v) => ({ [v]: [] })));
  files.forEach((file) => {
    levels[file.level].push(file);
  });


  return {
    props: {
      postData,
      levels,
      pacakgeContents,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Package({ postData, levels, pacakgeContents }) {
  const router = useRouter();


  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {/* <HomePageBackground> */}

        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          {pacakgeContents.map((item, index) => {
            console.log("item", item);
            return (
              <div className={utilStyles.card} key={item.name + index}>
                <div>Function Name: {item.name}</div>
                <div>{item.body}</div>
                <div>{item.length}</div>
              </div>
            );
          })}
          <div>{talNpm.name}</div>
          <div>{talNpm.length}</div>
          <br></br>
          <div>{talNpm.toString()}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      {/* </HomePageBackground> */}

    </Layout>
  );
}