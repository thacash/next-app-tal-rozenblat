import styles from '../styles/ExpensesList.module.css';
import { deleteExpense } from '../lib/expenses';

export default function ExpensesList(props) {


    
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Expenses:</h1>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>

                    </tr>

                    {props.newExpenses.length > 0 ? props.newExpenses.map(({ category, amount, desc, _id, date }) => (

                        <tr key={_id} onClick={()=>console.log(_id)}>
                            <td>{category}</td>
                            <td>{`${amount}₪`}</td>
                            <td>{desc === 'null' ? '' : desc}</td>
                            <td>{date}</td>
                            <td><button onClick={() => deleteExpense(_id)}></button></td>
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>
    )
}