import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

import styles from "../styles/RetirementCalculator.module.css";


const RetirementCalculator = (props) => {

  const [fireResults, setFireResults] = useState({});

  useEffect(() => {
    setFireResults(fireNumber(formInputs));
  }, [])


  const [formInputs, setFormInputs] = useState({
    age: 25,
    monthlyIncome: 12000,
    monthlyExpenses: 7000,
    currentNetWorth: 0,
  });

  const fireNumber = (fire) => {

    const fireRes = {
      fireAmount: fire.monthlyExpenses * 12 * 25,
      monthlySavings: fire.monthlyIncome - fire.monthlyExpenses,
      yearsNeeded: Math.floor(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12)),
      ageToRetire: Math.floor(parseInt(fire.age) + parseInt(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12))),
    }
    return fireRes;
  }

  const handleInputeChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFireResults(fireNumber(formInputs));
  }

  return (
    <div className={styles.retirementCalculator}>
      <section className={styles.section}>
        <form className={styles.form}>
          <div className={styles.row}>

            <div className={styles.inputDiv}>
              <label>
                Age
              </label>
              <input placeholder={formInputs.age} type='number' name='age' onChange={handleInputeChange} />
            </div>
            <div className={styles.inputDiv}>
              <label>Monthly Income</label>
              <input placeholder={formInputs.monthlyIncome} type='number' name='monthlyIncome' onChange={handleInputeChange} />
            </div>
          </div>
          <div className={styles.row}>

            <div className={styles.inputDiv}>
              <label>Monthly Expenses</label>
              <input placeholder={formInputs.monthlyExpenses} type='number' name='monthlyExpenses' onChange={handleInputeChange} />
            </div>
            <div className={styles.inputDiv}>
              <label>Current Savings</label>
              <input placeholder={formInputs.currentNetWorth} type='number' name='monthlyExpenses' onChange={handleInputeChange} />
            </div>
          </div>
          <button onClick={handleSubmit}>
            Calculate
          </button>
        </form>

        <p className={styles.text}>You can achieve finanical independence in</p>
        <p className={styles.result}>{`${fireResults.yearsNeeded} years by age ${fireResults.ageToRetire}`}</p>
      </section>
    </div>
  )
}


export default RetirementCalculator;