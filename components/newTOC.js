const TableOfContents = (props) => {
    const { tableOfContents } = props;
    return (
      <>
        <h3>Table of Contents</h3>
        {tableOfContents &&
          tableOfContents.map((item) => {
            return (
              <a href={"#" + item.replace(/ /g, "").replace(".", "")} key={item}>
                {item}
              </a>
            );
          })}
      </>
    );
  };
  
  export default TableOfContents;