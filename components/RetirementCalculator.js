import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";

import styles from "../styles/RetirementCalculator.module.css";


const RetirementCalculator = (props) => {
    const [formInputs, setFormInputs] = useState({
        age: 25,
        monthlyIncome: 12000,
        monthlyExpenses: 8000,
        currentNetWorth: 0,

        
      });

      const handleInputeChange = (e) => {
        setFormInputs({
          ...formInputs,
          [e.target.name]: e.target.value,
        });
      };

    
      return (
        <div className={styles.retirementCalculator}>
            <section className={styles.section}>
                <form className={styles.form}>
                    <div className={styles.inputDiv}>
                        <label>Age</label>
                        <input type = 'number' name = 'age'/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Monthly Income</label>
                        <input type = 'number' name = 'monthlyIncome' />
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Monthly Expenses</label>
                        <input type = 'number' name = 'monthlyExpenses' />
                    </div>

                </form>
            </section>
        </div>
      )
}


export default RetirementCalculator;