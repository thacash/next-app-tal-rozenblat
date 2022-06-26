import styles from '../styles/ExpensesList.module.css';

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
                        <th>Time</th>

                    </tr>

                    {/* {props.expenses.length > 0 ? props.expenses.map(({ category, amount, desc, time }, index) => (

                        <tr key={index}>
                            <td>{category}</td>
                            <td>{`${amount}₪`}</td>
                            <td>{desc}</td>
                            <td>{time}</td>
                        </tr>
                    )) : ''} */}

                    {props.newExpenses.length > 0 ? props.newExpenses.map(({ category, amount, desc, _id}) => (

                        <tr key={_id}>
                            <td>{category}</td>
                            <td>{`${amount}₪`}</td>
                            <td>{desc === 'null' ? '' : desc}</td>
                            {/* <td>{time}</td> */}
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>
    )
}