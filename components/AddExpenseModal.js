import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { addExpense } from "../lib/expenses";
import { addCategory } from '../lib/categories';
import styles from "../styles/AddExpenseModal.module.css";
import closeSVG from "../public/images/close.svg";
import doubleLeftIcon from "../public/images/double-left.png";
import doubleDownIcon from "../public/images/double-down.png";
import plusIcon from '../public/images/plus.png'


export default function AddCategoryModal(props) {
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
  const [newCategory, setAddCategory] = useState('');
  // const [categories, setCategories] = useState(["Personal", "Food", "Gas"]);
  const [addCategoryField, setAddCategoryField] = useState(false);

  const handleAddCategoryFieldOpen = (e) => {
    e.preventDefault();
    setAddCategoryField(!addCategoryField);
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

  const handleAddCategory = async () => {
    // props.setCategories([...props.categories, newCategory]);

    const newEntry = {
      category: newCategory,
      userId: currentUser.user._id,
    };

    const response = await addCategory (newEntry);

    props.setCategories([
      ...props.categories,
      {
        category: newCategory,
        _id: response.insertedId,
      },
    ]);
    setAddCategoryField(false);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formInputs.amount <= 0) {
      return;
    }

    const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;

    const expense = {
      category: category,
      amount: formInputs.amount,
      desc: formInputs.desc,
      userId: currentUser.user._id,
      date: date,
    };

    const newEntry = await addExpense(expense);
    props.setExpenses([
      ...props.expenses,
      {
        category: category,
        amount: formInputs.amount,
        desc: formInputs.desc,
        _id: newEntry.insertedId,
        date: date,
      },
    ]);

    setCategory('General');
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
          {props.categories.map(({ category, _id}) => {
            return (
              <option key={_id} value={category}>
                {category}
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
          <button disabled = {newCategory.length <= 0 ? true : false} className={styles.addOptionBtn} onClick={handleAddCategory}>
              <Image src={plusIcon} width={30} height={30} alt="" />
          </button>
        </div>
      )}
      <button
        disabled={formInputs.amount.length < 0 || !currentUser.user ? true : false}
        className={styles.button}
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}
