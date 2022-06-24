import styles from "../styles/AddExpenseForm.module.css";
import utilStyles from "../styles/utils.module.css";
import { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import AddCategoryModal from "./AddCategoryModal";
import cashManage from "@talrozen/cash-manage";

export default function AddExpenseForm() {
  const current = new Date();

  const [time, setTime] = useState(
    `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}  ${current.getHours()}:${
      current.getMinutes() < 10 ? "0" : ""
    }${current.getMinutes()}:${
      current.getSeconds() < 10 ? "0" : ""
    }${current.getSeconds()}`
  );
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("General");
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalFood, setTotalFood] = useState(0);
  const [totalGas, setTotalGas] = useState(0);

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

  useEffect(() => {
    const food = calculateTotalCategory('Food');
    const gas = calculateTotalCategory('Gas');
    setTotalFood(food);
    setTotalGas(gas);
  }, [expenses]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleInputeChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      return;
    }
    setAmount("");
    setDesc("");
    getTimeAndDate();
    setExpenses([
      ...expenses,
      { category: category, amount: amount, desc: desc, time: time },
    ]);
    setTotalExpenses(totalExpenses + parseInt(amount));
  };

  const getTimeAndDate = () => {
    const current = new Date();
    let timeAndDate = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}  ${current.getHours()}:${
      current.getMinutes() < 10 ? "0" : ""
    }${current.getMinutes()}:${
      current.getSeconds() < 10 ? "0" : ""
    }${current.getSeconds()}`;

    setTime(timeAndDate);
    return timeAndDate;
  };

  const calculateTotalExpenses = () => {
    // if(expenses.length > 0) {
    return expenses.reduce((prevValue, currValue) => {
      return parseInt(prevValue) + parseInt(currValue.amount);
    }, 0);
    // }
    return;
  };

  // calculated the total expenses of a given category 
  const calculateTotalCategory= (category) => {
    return expenses.reduce((prevValue, currValue) => {
      if (currValue.category === category) {
        return parseInt(prevValue) + parseInt(currValue.amount);
      } else {
        return parseInt(prevValue);
      }
    }, 0);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const addOption = (e) => {
    e.preventDefault();
    setModal(true);
    //handle user input regarding option
    //making option element
    //spreading options and adding the new element
    //setting state
  };

  const handleModalClose = (e) => {
    setModal(false);
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.h1}>Add expense:</h1>
      <div className={modal && styles.modal} onClick={handleModalClose}>
        <AddCategoryModal
          show={modal}
          categories={categories}
          setCategories={setCategories}
          handleModalClose={handleModalClose}
        />
      </div>

      <form className={styles.form} action="" method="post">
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>
            <label htmlFor="amount">Amount:</label>
            <input
              onChange={handleAmountChange}
              value={amount}
              type="number"
              id="amount"
              name="amount"
              required
            />
          </div>

          <div className={styles.inputLabel}>
            <label htmlFor="desc">Description:</label>
            <input
              onChange={handleDescChange}
              value={desc}
              type="text"
              id="desc"
              name="desc"
            />
          </div>
        </div>
        <div className={styles.options}>
          <select onChange={handleCategoryChange}>
            <option selected value="General">
              Select Category:
            </option>
            <option value="Personal">Personal</option>
            <option value="Food">Food</option>
            <option value="Gas">Gas</option>
            {categories ? categories : ""}
          </select>
          <div className={styles.addOptionBtn}>
            <button onClick={addOption}>New Category</button>
          </div>
        </div>

        <small className={utilStyles.lightText}></small>
        <div className={styles.submitBtn}>
          <button
            disabled={amount <= 0 ? true : false}
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      <ExpensesList expenses={expenses} />

      <h3>Food: {`${totalFood}₪`}</h3>
      <h3>Gas: {`${totalGas}₪`}</h3>
      <h2>Sum: {`${totalExpenses}₪`}</h2>
    </div>
  );
}
