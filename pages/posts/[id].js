import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/test';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useState, useEffect } from 'react';
import YoutubeIframe from '../../components/YoutubeIframe';
import VideoTableOfContents from '../../components/TableOfContents';
import styles from '../../styles/Package.module.css';
import TableOfContents from '../../components/newTOC';
import { useRouter } from 'next/router';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const paths = getAllPostIds();
  postData.title = postData.title.replace(/-/g, ' ');
  const pathsArray = paths.map(path => path.params.id);

  return {
    props: {
      postData,
      pathsArray,
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


export default function Post({ postData, pathsArray }) {
  const router = useRouter();
  const [tableOfContents, setTableOfContents] = useState([]);


  //pages useEffect
  useEffect(() => {

  })

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const headingElementsText = [];
    headingElements.forEach((item) => {
      item.id = item.innerText.replace(/ /g, "").replace(".", "");
      headingElementsText.push(item.innerText);
    });

    setTableOfContents(headingElementsText);

  }, [router.query.id]);

  // const [iframeSrc, setIframeSrc] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);

  useEffect(() => {
    const iframeElement = Array.from(document.querySelectorAll("h6"));
    const parent = document.getElementById('post-data');
    const iframeElementText = [];
    const titlesArray = [];

    iframeElement.forEach((item) => {
      // item.id = "iframe";

      const newItem = document.createElement('div');
      let newSrc = item.innerText.split(';');
      const src = newSrc[0];

      const newItemId = newSrc[1].replace(/ /g, "").replace(/[^a-zA-Z0-9 ]/g, "");

      newItem.innerHTML = `<iframe
      id=${newItemId}
      key={index}
      width="560"
      height="315"
      src=${src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>`;


      titlesArray.push(newSrc[1]);
      parent.replaceChild(newItem, item);

    });
    console.log(router.query.id)
    setVideoTitles(titlesArray);
  }, [router.query.id]);


  const handlePrev = () => {
    const index = pathsArray.indexOf(router.query.id) - 1;
    router.push(`/posts/${pathsArray[index]}`);
  }

  const handleNext = () => {
    const index = pathsArray.indexOf(router.query.id) + 1;
    router.push(`/posts/${pathsArray[index]}`);
  }

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
          <div className={styles.postData} id='post-data' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <div className={styles.btns}>
            <button className={styles.navBtns} disabled={router.query.id === pathsArray[0]} onClick={handlePrev}>Previous</button>
            <button className={styles.navBtns} disabled={router.query.id === pathsArray[pathsArray.length - 1]} onClick={handleNext}>Next</button>
          </div>

          <div className={styles.pageNumbers}>
            {pathsArray.map((page, index) => {
              return (
                <button key = {index} className={styles.pageNumber} disabled={router.query.id === pathsArray[index]} onClick={() => {router.push(`/posts/${pathsArray[index]}`)}}>{index + 1}</button>
              )
            })}
          </div>
        </article>
        <div className={styles.toc}>
          <TableOfContents tableOfContents={tableOfContents} />
          <VideoTableOfContents tableOfContents={videoTitles} />

        </div>
      </div>
    </Layout>
  );
} 