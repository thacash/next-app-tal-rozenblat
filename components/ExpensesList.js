import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/ExpensesList.module.css';
import { useState } from "react";

export default function ExpensesList(props) {
    const { data: session } = useSession()

    return (
        <div >
            <h1>Expenses:</h1>
            {/* <div className={styles.table}>
                <div className={styles.row}>
                
                    <div className={styles.cul}>
                        amount 
                    </div>
                    <div className={styles.cul}>
                        description
                    </div>
                    <div className={styles.cul}>
                        time
                    </div>
                </div>
            </div> */}
            
            <table className={styles.table}>
            <tbody>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Time</th>
                    
                </tr>
                {/* <ul className={styles.list}> */}
            {/* <li>Amount      Description     Time</li> */}
                {props.expenses.length > 0 ? props.expenses.map(({ amount, desc, time },index) => (
                    
                    //     <li className={utilStyles.listItem} key={key}>

                    //     Amount: {amount}  Description: {desc} Time = {time}

                    //   </li>

                    <tr key = {index}>
                        <td>{desc}</td>
                        <td>{`${amount}₪`}</td>
                        <td>{time}</td>
                    </tr>
                )): ''}
                {/* </ul> */}
                </tbody>
            </table>
        </div>
    )
}