import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/AddExpenseForm.module.css';
import utilStyles from '../styles/utils.module.css';
// import Date from '../components/date';
import { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import AddCategoryModal from "./AddCategoryModal";


export default function AddExpenseForm() {
    const { data: session } = useSession()
    const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    // const time = `${current.getHours()}:${current.getMinutes()+1}:${current.getSeconds()}`;

    const [time, setTime] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState(0);
    const [expenses, setExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);


    const [formInputs, setFormInputs] = useState({
        amount: 0,
        desc: '',
        time: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`,
    });


    useEffect(() => {
        
    }, [expenses])

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleInputeChange = (e) => {
        setFormInputs({
            ...formInputs,
             [e.target.name]: e.target.value
            });
        console.log(formInputs);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(amount <= 0){
            return;
        }
        setAmount('');
        setDesc('');
        getTimeAndDate();
        setExpenses([...expenses, {amount: amount, desc: desc, time: time}])
        // let newExpenses = calculateTotalExpenses();
        setTotalExpenses(totalExpenses + parseInt(amount));
    }

    const getTimeAndDate = () => {
        
        const current = new Date();
        let timeAndDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`;



        setTime(timeAndDate);
        return timeAndDate;
    }

    const calculateTotalExpenses = () => {

        // if(expenses.length > 0) {
            return expenses.reduce(
                (prevValue, currValue) => {
                    return parseInt(prevValue) + parseInt(currValue.amount);
                },
                0
            )
        // }
        return;
    }
    
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const addOption = (e) => {
        e.preventDefault();
        setModal(true);
        //handle user input regarding option
        //making option element
        //spreading options and adding the new element
        //setting state
    }


    const handleModalClose = (e) => {
        setModal(false);
    }

    return (
        <div className={styles.card}>
            <h1 className={styles.h1}>Add expense:</h1>
            <div className={modal && styles.modal} onClick = {handleModalClose}>

                <AddCategoryModal show = {modal} categories = {categories} setCategories = {setCategories} handleModalClose = {handleModalClose}></AddCategoryModal>
            </div>
           
            <form className={styles.form} action="" method="post">
                <div className={styles.inputContainer}>
                    <div className={styles.inputLabel}>
                        <label htmlFor="amount">Amount:</label>
                        <input onChange={handleAmountChange} value = {amount} type="number" id="amount" name="amount" required />
                    </div>

                    <div className={styles.inputLabel}>
                        <label htmlFor="desc">Description:</label>
                        <input onChange={handleDescChange} value = {desc} type="text" id="desc" name="desc" />
                    </div>
                </div>
                <div className = {styles.options}>
                    <select onChange={handleCategoryChange}>
                        <option selected value = 'null'>Select Category:</option>
                        <option value = "personal">Personal</option>
                        <option value = "food">Food</option>
                        <option value = "gas">Gas</option>
                        {categories? categories : ''}

                    </select>
                    <div className={styles.addOptionBtn}>
                        <button onClick={addOption}>New Category</button>
                    </div>
                </div>

                <small className={utilStyles.lightText}>
                    
                </small>
                <div className={styles.submitBtn}>
                    <button disabled = {amount <= 0 ? true : false} onClick={handleSubmit} type="submit">Submit</button>
                </div>
            </form>

            <ExpensesList expenses = {expenses} />

            <h1>Sum: {`${totalExpenses}₪`}</h1>
        </div>
    )
}