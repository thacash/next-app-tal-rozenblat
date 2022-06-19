import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/AddExpenseForm.module.css';
import utilStyles from '../styles/utils.module.css';
// import Date from '../components/date';
import { useState } from "react";
import ExpensesList from "./ExpensesList";


export default function AddExpenseForm() {
    const { data: session } = useSession()
    const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    // const time = `${current.getHours()}:${current.getMinutes()+1}:${current.getSeconds()}`;

    const [time, setTime] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`);
    const [amount, setAmount] = useState(0);
    const [desc, setDesc] = useState('');
    const [expenses, setExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(0);


    const [formInputs, setFormInputs] = useState({
        amount: 0,
        desc: '',
        time: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()<10?'0':''}${current.getMinutes()}:${current.getSeconds()<10?'0':''}${current.getSeconds()}`,
    });



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
        setAmount(0);
        setDesc('');
        getTimeAndDate();
        setExpenses([...expenses, {amount: amount, desc: desc, time: time}])
        let newExpenses = calculateTotalExpenses();
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
    

    return (
        <div className={styles.card}>
            <h1 className={styles.h1}>Add expense:</h1>
           
            <form className={styles.form} action="" method="post">
                <label htmlFor="amount">Amount:</label>
                <input onChange={handleAmountChange} value = {amount} type="number" id="amount" name="amount" required />
                <label htmlFor="desc">Description:</label>
                <input onChange={handleDescChange} value = {desc} type="text" id="desc" name="desc" />

                <small className={utilStyles.lightText}>
                    
                </small>

                <button disabled = {amount <= 0 ? true : false} onClick={handleSubmit} type="submit">Submit</button>
            </form>

            <ExpensesList expenses = {expenses} />

            <h1>Sum: {`${totalExpenses}₪`}</h1>
        </div>
    )
}