import Layout from '../../components/layout';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/Package.module.css';
import { useRouter } from "next/router";
import talNpm from '@talrozen/tal-npm';
import cashNpm from '@talrozen/cash-manage';

export async function getStaticProps({ params }) {

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

      <article className={styles.packages}>
        <h1 className={styles.heading}>{postData.title}</h1>
        <div className ={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        {pacakgeContents.map((item, index) => {
          return (
            <div className={styles.package} key={item.name + index}>
              <div className={styles.funcName}>Function Name: {item.name}</div>
              <div className={styles.funcLength}>Arguments: {item.length}</div>

              {/* <code className={styles.funcBody}>{item.body}</code> */}
              <textarea readOnly className={styles.funcBody}>{item.body}</textarea>

            </div>
          );
        })}

        {postData.title === 'tal-npm' &&
          <div className={styles.package}>
            <div className={styles.funcName}>Function Name: {talNpm.name}</div>
            <div className={styles.funcLength}>Arguments: {talNpm.length}</div>
            <textarea className={styles.funcBody}>{talNpm.toString()}</textarea>
            
          </div>}
      </article>

    </Layout>
  );
}