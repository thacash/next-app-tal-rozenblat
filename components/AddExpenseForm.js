import styles from "../styles/AddExpenseForm.module.css";
import utilStyles from "../styles/utils.module.css";
import { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import AddCategoryModal from "./AddCategoryModal";
import cashManage from "@talrozen/cash-manage";
import plusIcon from '../public/images/plus.png'
import Image from 'next/image'

export default function AddExpenseForm() {
  const current = new Date();

  const [time, setTime] = useState(
    `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes() < 10 ? "0" : ""
    }${current.getMinutes()}:${current.getSeconds() < 10 ? "0" : ""
    }${current.getSeconds()}`
  );

  const [category, setCategory] = useState("General");
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState(['Personal', 'Food', 'Gas']);
  const [modal, setModal] = useState(false);
  const [totalFood, setTotalFood] = useState(0);
  const [totalGas, setTotalGas] = useState(0);

  const [formInputs, setFormInputs] = useState({
    amount: 0,
    desc: "",
    time: `${current.getDate()}/${current.getMonth() + 1
      }/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes() < 10 ? "0" : ""
      }${current.getMinutes()}:${current.getSeconds() < 10 ? "0" : ""
      }${current.getSeconds()}`,
  });

  useEffect(() => {
    const food = calculateTotalCategory('Food');
    const gas = calculateTotalCategory('Gas');
    setTotalFood(food);
    setTotalGas(gas);
  }, [expenses]);

  const handleInputeChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInputs.amount <= 0) {
      return;
    }
    
    getTimeAndDate();
    setExpenses([
      ...expenses,
      { category: category, amount: formInputs.amount, desc: formInputs.desc, time: time },
    ]);
    setTotalExpenses(totalExpenses + parseInt(formInputs.amount));
  };

  const getTimeAndDate = () => {
    const current = new Date();
    let timeAndDate = `${current.getDate()}/${current.getMonth() + 1
      }/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes() < 10 ? "0" : ""
      }${current.getMinutes()}:${current.getSeconds() < 10 ? "0" : ""
      }${current.getSeconds()}`;

    setTime(timeAndDate);
    return timeAndDate;
  };


  // calculated the total expenses of a given category 
  const calculateTotalCategory = (category) => {
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

  const handleModalOpen = (e) => {
    e.preventDefault();
    setModal(true);
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
              onChange={handleInputeChange}
              type="number"
              id="amount"
              name="amount"
              required
            />
          </div>

          <div className={styles.inputLabel}>
            <label htmlFor="desc">Description:</label>
            <input
              onChange={handleInputeChange}
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
            {categories.map((item => {
              return (
                <option value={item}>{item}</option>
              )
            }))}
          </select>

          <button className={styles.addOptionBtn} onClick={handleModalOpen}>

            <Image src={plusIcon} width={40} height={40} alt="" />

          </button>
        </div>

        <div className={styles.submitBtn}>
          <button
            disabled={formInputs.amount <= 0 ? true : false}
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
