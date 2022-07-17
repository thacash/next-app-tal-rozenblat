import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { LineChart } from '../components/Chart';
import styles from "../styles/RetirementCalculatorNew.module.css";


const RetirementCalculator = (props) => {

  const [chartData, setChartData] = useState([
    { year: 2022, amount: 1000 },
    { year: 2023, amount: 1100 },
    { year: 2024, amount: 1200 },
    { year: 2025, amount: 1300 },
    { year: 2026, amount: 1400 }
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
    const res = fireNumber(formInputs);
    setFireResults(res);
    setChartData(res.chartData);
  }, [])


  //updating the chart
  useEffect(() => {
    const newData = {
      labels: chartData.map((year) => year.year),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
        {
          label: 'Savings',
          data: chartData.map((year) => year.amountWithoutInterest),
          fill: true,
          backgroundColor: "#ffbb11",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        },
        {
          label: 'Portfolio of Savings and Return-on-Investment',
          data: chartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#FF5733",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        }
      ]
    }
    setChart(newData)
  }, [chartData])

  const [formInputs, setFormInputs] = useState({
    age: 25,
    monthlyIncome: 12000,
    monthlyExpenses: 7000,
    currentNetWorth: 0,
  });

  const fireNumber = (fire) => {
    const current = new Date();
    const chartData = [];
    const fireRes = {
      fireAmount: fire.monthlyExpenses * 12 * 25,
      monthlySavings: fire.monthlyIncome - fire.monthlyExpenses,
      yearsNeeded: Math.floor(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12)),
      ageToRetire: Math.floor(parseInt(fire.age) + parseInt(fire.monthlyExpenses * 12 * 25 / ((fire.monthlyIncome - fire.monthlyExpenses) * 12))),
    }

    let year = current.getFullYear() + 1;
    let amount = 0;
    let amountWithoutInterest = 0;
    fire.currentNetWorth ? (amount += parseInt(fire.currentNetWorth)) : null;
    let interest = 0;
    let i = 0;
    let totalInterest = 0;

    while (amount < fireRes.fireAmount) {
      chartData[i] = {
        year: year,
        amount: amount,
        interest: interest,
        amountWithoutInterest: amountWithoutInterest
      };
      i++;
      year++;
      interest = amount * 0.04;
      amountWithoutInterest += (fireRes.monthlySavings * 12);
      amount += (fireRes.monthlySavings * 12) + interest;
      totalInterest += interest;

    }

    fireRes.totalInterest = totalInterest;
    fireRes.chartData = chartData;
    fireRes.yearsNeeded = i;
    fireRes.ageToRetire = Math.floor(parseInt(fire.age) + i);
    

    return fireRes;
  }


  //trying to get accurate year of retirement with compund interest on principal + monthly savings 
  const compoundInterestCalc = (obj) => {
    let years = 0;
    const yearly = obj.yearlySavings;
    let base = obj.principal;
    while (obj.fire - base > 0) {
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

    // setFireResults(fireNumber(formInputs));
    const res = fireNumber(formInputs);
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
  }

  //chart 

  const data = [
    { year: 2022, amount: 1000 },
    { year: 2023, amount: 1100 },
    { year: 2024, amount: 1200 },
    { year: 2025, amount: 1300 },
    { year: 2026, amount: 1400 }
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

  const placeHolders = {
    age: 'Age',
    monthlyIncome: 'Income',
    monthlyExpenses: 'Expenses',
    currentNetWorth: 'Savings'

  }
  const checkIfEmpty = (e) => {
    if(e.target.value){
      e.target.type = 'number';
    }
    else {
      e.target.type = 'text';
      e.target.placeholder = placeHolders[e.target.name];
    }
  }

  return (
    <div className={styles.retirementCalculator}>
      <section className={styles.section}>
        <form className={styles.form}>
          <div className={styles.row}>

            <div className={styles.inputDiv}>
              {formInputs.age && <label>
                Age
              </label>}
              <input placeholder='Age' type='number' onBlur={checkIfEmpty} name='age' onChange={handleInputeChange} />
            </div>
            <div className={styles.inputDiv}>
              <label>Monthly Income</label>
              <input placeholder='Income' type='number' onBlur={checkIfEmpty} name='monthlyIncome' onChange={handleInputeChange} />
            </div>
          <div className={styles.inputDiv}>
              <label>Monthly Expenses</label>
              <input placeholder='Expenses' type='number' onBlur={checkIfEmpty}name='monthlyExpenses' onChange={handleInputeChange} />
            </div>
            <div className={styles.inputDiv}>
              <label>Current Savings</label>
              <input placeholder='Savings' type='number' onBlur={checkIfEmpty}name='currentNetWorth' onChange={handleInputeChange} />
            </div>
            </div>
       
          <button onClick={handleSubmit}>
            Calculate
          </button>
        </form>

        <p className={styles.text}>You can achieve finanical independence in</p>
        <p className={styles.result}>{`${fireResults.yearsNeeded} years by age ${fireResults.ageToRetire}`}</p>
        <p className={styles.text}>With  ${fireResults.fireAmount} total, ${Math.floor(fireResults.totalInterest)} of which earned by interest.</p>
      </section>
      <div className={styles.chart}>

        <LineChart chartData={chart} />
      </div>
    </div>
  )
}


export default RetirementCalculator;