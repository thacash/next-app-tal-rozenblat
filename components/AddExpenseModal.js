import styles from "../styles/AddExpenseModal.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import closeSVG from "../public/images/close.svg";
import doubleLeftIcon from "../public/images/double-left.png";
import doubleDownIcon from "../public/images/double-Down.png";
import plusIcon from '../public/images/plus.png'
import { addExpense } from "../lib/expenses";


export default function AddCategoryModal(props) {
  // const [category, setCategory] = useState("");
  const [currentUser, setCurrentUser] = useAuthContext();
  const current = new Date();

  const [formInputs, setFormInputs] = useState({
    amount: 0,
    desc: "",
    time: `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}  ${current.getHours()}:${
      current.getMinutes() < 10 ? "0" : ""
    }${current.getMinutes()}:${
      current.getSeconds() < 10 ? "0" : ""
    }${current.getSeconds()}`,
    
  });

  const [category, setCategory] = useState("General");
  const [addCategory, setAddCategory] = useState('');
  const [categories, setCategories] = useState(["Personal", "Food", "Gas"]);
  const [addCategoryField, setAddCategoryField] = useState(false);


 

  const handleAddCategoryFieldOpen = (e) => {
    e.preventDefault();
    setAddCategoryField(!addCategoryField);
  };

  const handleAddCategoryFieldClose = (e) => {
    setAddCategoryField(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputeChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCategory = () => {
    setCategories([...categories, addCategory]);
    setAddCategoryField(false);

  };

  const handleSubmit = async (event) => {
    props.handleModalClose();
  };

  if (!props.show) {
    return null;
  }

  return (
    <div
      className={styles.addExpenseModal}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.closeSvg}>
        <button onClick={() => props.handleModalClose()}>
          <Image width={20} height={20} alt="" src={closeSVG} />
        </button>
      </div>
      <h4 className={styles.header}> Add Expense:</h4>

      <label className={styles.amountInput}>
        <input
          placeholder="Amount"
          onChange={handleInputeChange}
          type="number"
          id="amount"
          name="amount"
          required
        />
      </label>

      <div className={styles.options}>
        <select  name = 'category' defaultValue="General" onChange={handleCategoryChange}>
          <option value="General">Select Category:</option>
          {categories.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <button
          className={styles.addOptionBtn}
          onClick={handleAddCategoryFieldOpen}
        >
          <Image
            src={addCategoryField ? doubleDownIcon : doubleLeftIcon}
            width={30}
            height={30}
            alt=""
          />
        </button>
      </div>
      {addCategoryField && (
        <div className={styles.addCategoryField}>
          <label>
            <input
              placeholder="New Category"
              onChange={(e) => setAddCategory(e.target.value)}
              type="text"
              id="addCategory"
              name="addCategory"
            />
          </label>
          <button disabled = {addCategory.length <= 0 ? true : false} className={styles.addOptionBtn} onClick={handleAddCategory}>
              <Image src={plusIcon} width={30} height={30} alt="" />
          </button>
        </div>
      )}
      <button
        disabled={formInputs.amount.length < 0 ? true : false}
        className={styles.button}
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}
