import Layout from '../../components/layout';
import { getAllPackagesIds, getPackagesData } from '../../lib/packages';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
    const postData = await getPackagesData(params.id);
    return {
        props: {
            packageData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPackagesIds();
    return {
        paths,
        fallback: false,
    };
}

// export default function Post({ packageData }) {
//     return (
//       <Layout>
//         <Head>
//           <title>{postData.title}</title>
//         </Head>
//         <article>
//           <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//           <div className={utilStyles.lightText}>
//             <Date dateString={postData.date} />
//           </div>
//           <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//         </article>
//       </Layout>
//     );
//   }

  
export default function Post() {
  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>title</h1>
        <div className={utilStyles.lightText}>
        </div>
      </article>
    </Layout>
  );
}