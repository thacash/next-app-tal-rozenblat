import Image from 'next/image'
import styles from '../styles/ExpensesList.module.css';
import { deleteExpense } from '../lib/expenses';
import deleteIcon from '../public/images/delete.svg'



export default function ExpensesList(props) {


    
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Expenses:</h1>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        {/* <th>Description</th> */}
                        <th>Date</th>

                    </tr>

                    {props.newExpenses.length > 0 ? props.newExpenses.map(({ category, amount, desc, _id, date }) => (

                        <tr key={_id}>
                            <td>{category}</td>
                            <td>{`${amount}₪`}</td>
                            {/* <td>{desc === 'null' ? '' : desc}</td> */}
                            <td>{date}</td>
                            <td><button className={styles.deleteBtn} onClick={() => props.handleDeleteExpense(_id)}>
                                <Image src = {deleteIcon} width ={40} height ={40} alt = ""></Image>    
                            </button></td>
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>
    )
}