import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/test';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useState, useEffect } from 'react';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
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


// video test
// const [nestedHeadings, setNestedHeadings] = useState([]);
    
//     useEffect(() => {
//         const headingElements = Array.from(
//             document.querySelectorAll("h2, h3")
//         );

//         const newNestedHeadings = getNestedHeadings(headingElements);
//         setNestedHeadings(newNestedHeadings);
//     }, []);

//     const getNestedHeadings = (headingElements) => {
//         const nestedHeadings = [];

//         headingElements.forEach((heading, index) => {
//             const { innerText: title, id } = heading;

//             if (heading.nodeName === "H2") {
//                 nestedHeadings.push({ id, title, items: [] });
//             } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
//                 nestedHeadings[nestedHeadings.length - 1].items.push({
//                     id,
//                     title,
//                 });
//             }
//         });

//         return nestedHeadings;
//     };

    //end of test

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  } 