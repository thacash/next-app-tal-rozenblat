import styles from "../styles/TableOfContents.module.css";


const VideoTableOfContents = (props) => {
  const { tableOfContents } = props;
  return (
    <nav className={styles.videoTOC}>
      <h3>Videos</h3>
      <ul>
      {tableOfContents &&
        tableOfContents.map((item) => {
          return (
            <li key = {item}>
            <a href={"#" + item.replace(/ /g, "").replace(/[^a-zA-Z0-9 ]/g, "")} onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${item.replace(/ /g, "").replace(/[^a-zA-Z0-9 ]/g, "")}`).scrollIntoView({
                behavior: "smooth"
              });
            }}>
              {item}
            </a></li>
          );
        })}
        </ul>
    </nav>
  );
};

export default VideoTableOfContents;