import styles from "../styles/TableOfContents.module.css";


const TableOfContents = (props) => {
  const { tableOfContents } = props;
  return (
    <nav className={styles.TOC}>
      <h3>Table of Contents</h3>
      <ul>
      {tableOfContents &&
        tableOfContents.map((item) => {
          return (
            <li key = {item}>
            <a href={"#" + item.replace(/ /g, "").replace(".", "")} onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${item.replace(/ /g, "").replace(".", "")}`).scrollIntoView({
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

export default TableOfContents;