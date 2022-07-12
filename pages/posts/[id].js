import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/test';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useState, useEffect } from 'react';
import YoutubeIframe from '../../components/YoutubeIframe';
// import TableOfContents from '../../components/TableOfContents';
import styles from '../../styles/Package.module.css';
import TableOfContents from '../../components/newTOC';
import { useRouter } from 'next/router';

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





//second video test


export default function Post({ postData }) {

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

  const [iframeSrc, setIframeSrc] = useState([])

  useEffect(() => {
    const iframeElement = Array.from(document.querySelectorAll("h6"));
    const iframeElementText = [];
    iframeElement.forEach((item) => {
      item.id = "iframe";
      iframeElementText.push(item.innerText);
      item.replaceWith('');

    });

    setIframeSrc(iframeElementText);
  }, []);


  //toc 
  // const [nestedHeadings, setNestedHeadings] = useState([]);

  // useEffect(() => {
  //   const headingElements = Array.from(
  //     document.querySelectorAll("h2, h3")
  //   );

  //   const newNestedHeadings = getNestedHeadings(headingElements);
  //   setNestedHeadings(newNestedHeadings);
  // }, []);

  // const getNestedHeadings = (headingElements) => {
  //   const nestedHeadings = [];

  //   headingElements.forEach((heading, index) => {
  //     const { innerText: title, id } = heading;

  //     if (heading.nodeName === "H2") {
  //       nestedHeadings.push({ id, title, items: [] });
  //     } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
  //       nestedHeadings[nestedHeadings.length - 1].items.push({
  //         id,
  //         title,
  //       });
  //     }
  //   });

  //   return nestedHeadings;
  // };
  //

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className={styles.main}>

        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          {iframeSrc &&
            iframeSrc.map((src, index) => (
              <iframe
                key={index}
                width="560"
                height="315"
                src={src}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
        </article>
        <div className={styles.toc}>
          <TableOfContents tableOfContents={tableOfContents} />
        </div>
      </div>
    </Layout>
  );
} 