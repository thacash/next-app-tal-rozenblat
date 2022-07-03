import Image from "next/image";
import { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import AddExpenseModal from "./AddExpenseModal";
import LoginBtn from './LoginBtn';
import { useAuthContext } from "../context/authContext";
import { deleteExpense, getExpensesByUserId } from "../lib/expenses";
import { getCategoriesByUserId } from "../lib/categories";
import cashManage from "@talrozen/cash-manage";
import styles from "../styles/AddExpenseForm.module.css";
import plusIcon from "../public/images/plus.png";

export default function AddExpenseForm() {

  const [currentUser, setCurrentUser] = useAuthContext();
  const [newExpenses, setNewExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cateogryToSum, setCategoryToSum] = useState('General');
  const [totalCateogryExpenses, setTotalCategoryExpenses] = useState(0);

  //handles summerizing totals
  useEffect(() => {
    setTotalExpenses(calculateTotalExpenses());
    // setTotalCategoryExpenses(calculateTotalCategory(cateogryToSum));
  }, [newExpenses]);

  useEffect(() => {
    setTotalCategoryExpenses(calculateTotalCategory(cateogryToSum));

  }, [cateogryToSum])

  useEffect(() => {
    const getNewExpensesArray = async () => {
      const newExpensesArray = await getExpensesByUserId(currentUser.user._id);
      setNewExpenses(newExpensesArray);
    };

    const getCategoriesArray = async () => {
      const categoriesArray = await getCategoriesByUserId(currentUser.user._id);
      setCategories(categoriesArray);
    }
    if (currentUser.user) {
      getNewExpensesArray();
      getCategoriesArray();
    }
  }, [currentUser]);


  const calculateTotalExpenses = () => {
    return newExpenses.reduce((prevValue, currValue) => {
      return parseInt(prevValue) + parseInt(currValue.amount);
    }, 0);
  };

  // calculated the total expenses of a given category
  const calculateTotalCategory = (category) => {
    return newExpenses.reduce((prevValue, currValue) => {
      if (currValue.category === category) {
        return parseInt(prevValue) + parseInt(currValue.amount);
      } else {
        return parseInt(prevValue);
      }
    }, 0);
  };

  const handleCategoryToSumChange = (e) => {
    setCategoryToSum(e.target.value);
  }

  const handleAddExpenseModalOpen = (e) => {
    e.preventDefault();
    setAddExpenseModal(true);
  };

  const handleAddExpenseModalClose = (e) => {
    setAddExpenseModal(false);
  };

  const handleDeleteExpense = (_id) => {
    deleteExpense(_id);
    const newArray = newExpenses;
    newArray = newArray.filter(function (item) {
      return item._id != _id;
    });
    setNewExpenses(newArray);
  };


  if(!currentUser.user){
    return (
      <div className={styles.notLoggedIn}>
        <h3>It seems like your&apos;e not signed in yet, sign in and start managing your expenses.</h3>
        <LoginBtn big = {true}/>
      </div>
    )
  }
  return (
    <div className={styles.card}>

      <div className={addExpenseModal && styles.modal} onClick={handleAddExpenseModalClose}>
        <AddExpenseModal
          show={addExpenseModal}
          expenses={newExpenses}
          setExpenses={setNewExpenses}
          handleModalClose={handleAddExpenseModalClose}
          categories={categories}
          setCategories={setCategories}
        />
      </div>

      <div className={styles.main}>
        <ExpensesList
          newExpenses={newExpenses}
          handleDeleteExpense={handleDeleteExpense}
        />

        <button disabled = {!currentUser.user ? true : false} className={styles.btn} onClick={handleAddExpenseModalOpen}>
        {/* <button className={styles.btn} onClick={handleAddExpenseModalOpen}> */}

          Add Expense
        </button>
        <select className={styles.select} name='category' defaultValue="General" onChange={handleCategoryToSumChange}>
          <option value="General">Select Category:</option>
          {categories.map(({ category, _id }) => {
            return (
              <option key={_id} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <h3>{cateogryToSum}: {`${totalCateogryExpenses}₪`}</h3>

        <h2>Total: {`${totalExpenses}₪`}</h2>
      </div>

    </div>
  );
}
