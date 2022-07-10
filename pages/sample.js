import Head from "next/head";
import styles from "../styles/sample.module.css";
import Layout from "../components/layout";
import useHeadingsData from "../hooks/useHeadingsData";
import TableOfContents from "../components/TableOfContents";
import { useState, useEffect } from "react";

export default function Home() {

    const [nestedHeadings, setNestedHeadings] = useState([]);
    
    useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll("h2, h3")
        );

        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
    }, []);

    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];

        headingElements.forEach((heading, index) => {
            const { innerText: title, id } = heading;

            if (heading.nodeName === "H2") {
                nestedHeadings.push({ id, title, items: [] });
            } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
                nestedHeadings[nestedHeadings.length - 1].items.push({
                    id,
                    title,
                });
            }
        });

        return nestedHeadings;
    };
    // const headingsData = useHeadingsData;

    return (
        <Layout>
            <Head>
                <title>TOC Sample</title>
            </Head>
            <div className={styles.main}>


                <div className={styles.articles}>
                    <article>
                        <h2 id="google-header">Google Chrome</h2>
                        <p>Google Chrome is a web browser developed by Google, released in 2008. Chrome is the world's most popular web browser today!</p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tortor semper, pretium dui vel, eleifend justo. Suspendisse vel nunc risus. Nulla facilisi. Donec id diam ullamcorper, eleifend erat quis, faucibus dolor. Donec arcu erat, facilisis ac congue sed, tempor eget nunc. Phasellus sit amet faucibus sem. Nullam eget massa a lorem ultrices elementum. Vestibulum venenatis metus lacus, eget dignissim mi euismod non.

                            Nam imperdiet fermentum ligula id consequat. In elit orci, suscipit in tempus nec, lacinia sit amet eros. Donec efficitur consequat risus, non tempor ante dictum sit amet. Morbi nec mauris in lorem porta tincidunt. Morbi ultrices eros a turpis eleifend aliquet. Nam rhoncus placerat justo sed imperdiet. Praesent ac ex posuere, dictum purus quis, efficitur nisi. Nullam blandit orci non ex tristique egestas nec eget mi. Nam orci felis, convallis ac semper eget, pulvinar eu sapien. Donec sed ultrices ipsum. Sed condimentum ante sed diam porttitor, eu imperdiet ipsum dictum.

                            Integer tincidunt quam aliquet tempor pulvinar. Morbi porttitor mauris purus, at suscipit justo eleifend nec. Phasellus ullamcorper tellus vel nisl porta, vel rutrum sem maximus. Nam dictum ultrices lacus ut eleifend. Pellentesque malesuada, nulla at tristique posuere, lacus mauris fermentum risus, ut blandit sem dui sit amet libero. Nunc ut nisi felis. Vivamus porta risus id justo condimentum venenatis. In ornare at nibh eu molestie.

                            Duis iaculis ornare sem, vitae imperdiet dolor auctor non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare a dui non laoreet. Fusce aliquam velit non erat hendrerit semper. Aliquam erat volutpat. Vivamus pellentesque tristique libero ut aliquam. Pellentesque et placerat mi, vitae molestie augue. Vivamus sodales velit non lorem dignissim commodo. Nulla malesuada dolor ut pretium mattis. Proin ut justo felis. Ut euismod, diam quis tempor mattis, turpis leo facilisis quam, sed eleifend mauris diam non risus.

                            Praesent molestie velit sit amet elit molestie hendrerit. Curabitur ligula mauris, consectetur ut consectetur nec, auctor fringilla tortor. Morbi malesuada elementum orci, eget lacinia est pulvinar sit amet. Pellentesque aliquet ultrices viverra. Donec a convallis ipsum. Nulla scelerisque augue vel metus mattis tincidunt. Phasellus mollis felis egestas ante feugiat feugiat. Morbi sagittis id ligula eget pharetra. Sed ut metus quis metus accumsan pharetra nec vel ex. Cras sagittis eu mi ac imperdiet. Ut ac erat erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur posuere congue nisi vitae lobortis. Pellentesque ut justo lorem.</p>
                    </article>

                    <article>
                        <h2 id="mozilla-header">Mozilla Firefox</h2>
                        <p>Mozilla Firefox is an open-source web browser developed by Mozilla. Firefox has been the second most popular web browser since January, 2018.</p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tortor semper, pretium dui vel, eleifend justo. Suspendisse vel nunc risus. Nulla facilisi. Donec id diam ullamcorper, eleifend erat quis, faucibus dolor. Donec arcu erat, facilisis ac congue sed, tempor eget nunc. Phasellus sit amet faucibus sem. Nullam eget massa a lorem ultrices elementum. Vestibulum venenatis metus lacus, eget dignissim mi euismod non.

                            Nam imperdiet fermentum ligula id consequat. In elit orci, suscipit in tempus nec, lacinia sit amet eros. Donec efficitur consequat risus, non tempor ante dictum sit amet. Morbi nec mauris in lorem porta tincidunt. Morbi ultrices eros a turpis eleifend aliquet. Nam rhoncus placerat justo sed imperdiet. Praesent ac ex posuere, dictum purus quis, efficitur nisi. Nullam blandit orci non ex tristique egestas nec eget mi. Nam orci felis, convallis ac semper eget, pulvinar eu sapien. Donec sed ultrices ipsum. Sed condimentum ante sed diam porttitor, eu imperdiet ipsum dictum.

                            Integer tincidunt quam aliquet tempor pulvinar. Morbi porttitor mauris purus, at suscipit justo eleifend nec. Phasellus ullamcorper tellus vel nisl porta, vel rutrum sem maximus. Nam dictum ultrices lacus ut eleifend. Pellentesque malesuada, nulla at tristique posuere, lacus mauris fermentum risus, ut blandit sem dui sit amet libero. Nunc ut nisi felis. Vivamus porta risus id justo condimentum venenatis. In ornare at nibh eu molestie.

                            Duis iaculis ornare sem, vitae imperdiet dolor auctor non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare a dui non laoreet. Fusce aliquam velit non erat hendrerit semper. Aliquam erat volutpat. Vivamus pellentesque tristique libero ut aliquam. Pellentesque et placerat mi, vitae molestie augue. Vivamus sodales velit non lorem dignissim commodo. Nulla malesuada dolor ut pretium mattis. Proin ut justo felis. Ut euismod, diam quis tempor mattis, turpis leo facilisis quam, sed eleifend mauris diam non risus.

                            Praesent molestie velit sit amet elit molestie hendrerit. Curabitur ligula mauris, consectetur ut consectetur nec, auctor fringilla tortor. Morbi malesuada elementum orci, eget lacinia est pulvinar sit amet. Pellentesque aliquet ultrices viverra. Donec a convallis ipsum. Nulla scelerisque augue vel metus mattis tincidunt. Phasellus mollis felis egestas ante feugiat feugiat. Morbi sagittis id ligula eget pharetra. Sed ut metus quis metus accumsan pharetra nec vel ex. Cras sagittis eu mi ac imperdiet. Ut ac erat erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur posuere congue nisi vitae lobortis. Pellentesque ut justo lorem.</p>
                    </article>

                    <article>
                        <h2 id="edge-header">Microsoft Edge</h2>
                        <p>Microsoft Edge is a web browser developed by Microsoft, released in 2015. Microsoft Edge replaced Internet Explorer.</p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tortor semper, pretium dui vel, eleifend justo. Suspendisse vel nunc risus. Nulla facilisi. Donec id diam ullamcorper, eleifend erat quis, faucibus dolor. Donec arcu erat, facilisis ac congue sed, tempor eget nunc. Phasellus sit amet faucibus sem. Nullam eget massa a lorem ultrices elementum. Vestibulum venenatis metus lacus, eget dignissim mi euismod non.

                            Nam imperdiet fermentum ligula id consequat. In elit orci, suscipit in tempus nec, lacinia sit amet eros. Donec efficitur consequat risus, non tempor ante dictum sit amet. Morbi nec mauris in lorem porta tincidunt. Morbi ultrices eros a turpis eleifend aliquet. Nam rhoncus placerat justo sed imperdiet. Praesent ac ex posuere, dictum purus quis, efficitur nisi. Nullam blandit orci non ex tristique egestas nec eget mi. Nam orci felis, convallis ac semper eget, pulvinar eu sapien. Donec sed ultrices ipsum. Sed condimentum ante sed diam porttitor, eu imperdiet ipsum dictum.

                            Integer tincidunt quam aliquet tempor pulvinar. Morbi porttitor mauris purus, at suscipit justo eleifend nec. Phasellus ullamcorper tellus vel nisl porta, vel rutrum sem maximus. Nam dictum ultrices lacus ut eleifend. Pellentesque malesuada, nulla at tristique posuere, lacus mauris fermentum risus, ut blandit sem dui sit amet libero. Nunc ut nisi felis. Vivamus porta risus id justo condimentum venenatis. In ornare at nibh eu molestie.

                            Duis iaculis ornare sem, vitae imperdiet dolor auctor non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare a dui non laoreet. Fusce aliquam velit non erat hendrerit semper. Aliquam erat volutpat. Vivamus pellentesque tristique libero ut aliquam. Pellentesque et placerat mi, vitae molestie augue. Vivamus sodales velit non lorem dignissim commodo. Nulla malesuada dolor ut pretium mattis. Proin ut justo felis. Ut euismod, diam quis tempor mattis, turpis leo facilisis quam, sed eleifend mauris diam non risus.

                            Praesent molestie velit sit amet elit molestie hendrerit. Curabitur ligula mauris, consectetur ut consectetur nec, auctor fringilla tortor. Morbi malesuada elementum orci, eget lacinia est pulvinar sit amet. Pellentesque aliquet ultrices viverra. Donec a convallis ipsum. Nulla scelerisque augue vel metus mattis tincidunt. Phasellus mollis felis egestas ante feugiat feugiat. Morbi sagittis id ligula eget pharetra. Sed ut metus quis metus accumsan pharetra nec vel ex. Cras sagittis eu mi ac imperdiet. Ut ac erat erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur posuere congue nisi vitae lobortis. Pellentesque ut justo lorem.</p>
                    </article>
                </div>
                <div className={styles.toc}>
                    <TableOfContents nestedHeadings={nestedHeadings} />
                </div>
            </div>
        </Layout>
    );
}
