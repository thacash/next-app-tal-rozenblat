import styles from "../styles/TableOfContents.module.css";
import Headings from '../components/Headings.js';


const TableOfContents = ({ nestedHeadings }) => {
    return (
        <nav className={styles.TOC}>
            <Headings headings = {nestedHeadings}/>
        </nav>
    );
};

export default TableOfContents;