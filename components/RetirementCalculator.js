import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { LineChart } from '../components/Chart';
import styles from "../styles/RetirementCalculator.module.css";


const RetirementCalculator = (props) => {

  const [chartData, setChartData] = useState([
    {year: 2022, amount: 1000},
    {year: 2023, amount: 1100},
    {year: 2024, amount: 1200},
    {year: 2025, amount: 1300},
    {year: 2026, amount: 1400}
  ]);
  const [chart, setChart] = useState({
    labels: chartData.map((year) => year.year),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Portfolio of Savings and Return-on-Investment',
          data: chartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#ffbb11",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        }
    ]
})
  const [fireResults, setFireResults] = useState({});

  useEffect(() => {
    setFireResults(fireNumber(formInputs));
    setChartData(fireNumber(formInputs).chartData);
    const newData = {
      labels: chartData.map((year) => year.year),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
          {
            label: 'Portfolio of Savings and Return-on-Investment',
            data: chartData.map((year) => year.amount),
            fill: true,
            backgroundColor: "#ffbb11",
            color: "#3B8C66",
            borderColor: "#3B8C66",
            borderWidth: 1,
          }
      ]
  }
    setChart(newData)
  }, [])


  const [formInputs, setFormInputs] = useState({
    age: 25,
    monthlyIncome: 12000,
    monthlyExpenses: 7000,
    currentNetWorth: 0,
  });

  const fireNumber = (fire) => {
    const current = new Date();
    // current.getFullYear()
    const chartData = [];
    const fireRes = {
      fireAmount: fire.monthlyExpenses * 12 * 25,
      monthlySavings: fire.monthlyIncome - fire.monthlyExpenses,
      yearsNeeded: Math.floor(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12)),
      ageToRetire: Math.floor(parseInt(fire.age) + parseInt(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12))),
    }

    let i = 0;
    let year = current.getFullYear() + 1;
    let amount = 0;
    for (i = 0; i < fireRes.yearsNeeded; i++){
      chartData[i] = {
        year: year,
        amount: amount 
      };
      year++;
      amount += (fireRes.monthlySavings * 12);
    }

    const res = {
      fireAmount: fireRes.fireAmount,
      monthlySavings: fireRes.monthlySavings,
      yearsNeeded: fireRes.yearsNeeded,
      ageToRetire: fireRes.ageToRetire,
      chartData: chartData,
    }

    console.log(res.chartData)
    return res;
  }


  //trying to get accurate year of retirement with compund interest on principal + monthly savings 
  const compoundInterestCalc = (obj) => {
    let years = 0;
    const yearly = obj.yearlySavings;
    let base =  obj.principal;
    while(obj.fire - base > 0){
      base = (base * obj.interestRate) + (yearly * obj.interestRate);
      years++;
    }
    return years;
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

  //chart 

  const data = [
    {year: 2022, amount: 1000},
    {year: 2023, amount: 1100},
    {year: 2024, amount: 1200},
    {year: 2025, amount: 1300},
    {year: 2026, amount: 1400}
  ]
  const chartsSample = {
    labels: chartData.map((year) => year.year),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Portfolio of Savings and Return-on-Investment',
          data: chartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#ffbb11",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        }
    ]
}
// chart end

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
      <div className={styles.chart}>

        <LineChart chartData = {chart}/>
      </div>
    </div>
  )
}


export default RetirementCalculator;