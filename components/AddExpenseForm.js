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
    const [category, setCategory] = useState('General');
    const [expenses, setExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [totalFood, setTotalFood] = useState(0);
    const [totalGas, setTotalGas] = useState(0);


    const [formInputs, setFormInputs] = useState({
        amount: 0,
        desc: '',
        time: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`,
    });


    useEffect(() => {
        const food = calculateTotalFood();
        const gas = calculateTotalGas();
        setTotalFood(food);
        setTotalGas(gas);
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
        // setCategory('')
        getTimeAndDate();
        setExpenses([...expenses, {category: category, amount: amount, desc: desc, time: time}])
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
    
    const calculateTotalFood = () => {

        return expenses.reduce(
            (prevValue, currValue) => {
                if(currValue.category === 'Food'){
                    
                    return parseInt(prevValue) + parseInt(currValue.amount);
                }
                else {
                    return parseInt(prevValue);
                }
            },
            0
        )
    } 
    
    const calculateTotalGas = () => {

        // if(expenses.length > 0) {
            return expenses.reduce(
                (prevValue, currValue) => {
                    if(currValue.category === 'Gas'){
                        
                        return parseInt(prevValue) + parseInt(currValue.amount);
                    }
                    else {
                        return parseInt(prevValue);
                    }
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
                        <option value = "Personal">Personal</option>
                        <option value = "Food">Food</option>
                        <option value = "Gas">Gas</option>
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

            <h3>Food: {`${totalFood}₪`}</h3>
            <h3>Gas: {`${totalGas}₪`}</h3>
            <h2>Sum: {`${totalExpenses}₪`}</h2>
            
        </div>
    )
}