import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { LineChart } from "../components/Chart";
import styles from "../styles/RetirementCalculatorNew.module.css";

const RetirementCalculator = (props) => {
  const TAX_POINT_WORTH = 223; 
  const taxBrackets = [
    {
      maxAmount: 6450,
      tax: 10,
    },
    {
      maxAmount: 9240,
      tax: 14,
    },
    {
      maxAmount: 14840,
      tax: 20,
    },
    {
      maxAmount: 20620,
      tax: 31,
    },
    {
      maxAmount: 42910,
      tax: 35,
    },
    {
      maxAmount: 55270,
      tax: 47,
    },
  ];

  const [taxes, setTaxes] = useState(0);

  const calculateTaxes = (income, points) => {
    let res = 0;
    let i = 0;
    let amount = income;
    let totalTax = 0;
    for (i = taxBrackets.length - 1; i >= 0; i--){
      
      if (income >= taxBrackets[i].maxAmount){
        totalTax += (amount - taxBrackets[i].maxAmount) * (taxBrackets[i + 1].tax / 100);
        amount = taxBrackets[i].maxAmount;
      }
      
    }

    //discount given by the goverment according to parameters 
    console.log('totalTax', totalTax)

    totalTax = totalTax - (points * TAX_POINT_WORTH);
    console.log('totalTax after points', totalTax)

    res = income - totalTax;
    console.log('income after taxes:', res);
    setTaxes(totalTax);
    return res;
  };

  const [chartData, setChartData] = useState([
    { year: 2022, amount: 1000 },
    { year: 2023, amount: 1100 },
    { year: 2024, amount: 1200 },
    { year: 2025, amount: 1300 },
    { year: 2026, amount: 1400 },
  ]);
  const [chart, setChart] = useState({
    labels: chartData.map((year) => year.year),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Portfolio of Savings and Return-on-Investment",
        data: chartData.map((year) => year.amount),
        fill: true,
        backgroundColor: "#ffbb11",
        color: "#3B8C66",
        borderColor: "#3B8C66",
        borderWidth: 1,
      },
    ],
  });

  const [retirementChartData, setRetirementChartData] = useState([
    { year: 2022, amount: 1000 },
    { year: 2023, amount: 1100 },
    { year: 2024, amount: 1200 },
    { year: 2025, amount: 1300 },
    { year: 2026, amount: 1400 },
  ]);

  const [retirementChart, setRetirementChart] = useState({
    labels: retirementChartData.map((year) => year.year),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Portfolio and Savings during retirement",
        data: retirementChartData.map((year) => year.amount),
        fill: true,
        backgroundColor: "#ffbb11",
        color: "#3B8C66",
        borderColor: "#3B8C66",
        borderWidth: 1,
      },
    ],
  });
  const [fireResults, setFireResults] = useState({});

  useEffect(() => {
    const res = fireNumber(formInputs);
    setFireResults(res);
    setRetirementChartData(chartData);
    retirementData(res);
    setChartData(res.chartData);
  }, []);

  //updating the chart
  useEffect(() => {
    const newData = {
      labels: chartData.map((year) => year.year),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
        {
          label: "Savings",
          data: chartData.map((year) => year.amountWithoutInterest),
          fill: true,
          backgroundColor: "#ffbb11",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        },
        {
          label: "Portfolio of Savings and Return-on-Investment",
          data: chartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#FF5733",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        },
      ],
    };

    const newRetirementChart = {
      labels: retirementChartData.map((year) => year.year),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
        {
          label: "Retirement funds",
          data: retirementChartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#FAC2E4",
          color: "#3B8C66",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
    setChart(newData);
    setRetirementChart(newRetirementChart);
  }, [chartData, retirementChartData]);

  const [formInputs, setFormInputs] = useState({
    age: 25,
    monthlyIncome: 12000,
    monthlyExpenses: 7000,
    currentNetWorth: 0,
    interestRate: 4,
    retirementExpenses: 0,
    taxPoints: 2.25,
  });

  const fireNumber = (fire) => {
    const current = new Date();
    const chartData = [];
    const fireRes = {
      fireAmount: fire.monthlyExpenses * 12 * 25,
      monthlySavings: fire.monthlyIncome - fire.monthlyExpenses,
      yearsNeeded: Math.floor(
        (fire.monthlyExpenses * 12 * 25) /
          ((fire.monthlyIncome - fire.monthlyExpenses) * 12)
      ),
      ageToRetire: Math.floor(
        parseInt(fire.age) +
          parseInt(
            (fire.monthlyExpenses * 12 * 25) /
              ((fire.monthlyIncome - fire.monthlyExpenses) * 12)
          )
      ),
      monthlyExpenses: fire.monthlyExpenses,
      age: fire.age,
      interestRate: fire.interestRate,
      retirementExpenses: fire.retirementExpenses,
    };

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
        amountWithoutInterest: amountWithoutInterest,
      };
      i++;
      year++;
      interest = amount * (fire.interestRate / 100);
      amountWithoutInterest += fireRes.monthlySavings * 12;
      amount += fireRes.monthlySavings * 12 + interest;
      totalInterest += interest;
    }

    fireRes.totalInterest = totalInterest;
    fireRes.chartData = chartData;
    fireRes.yearsNeeded = i;
    fireRes.ageToRetire = Math.floor(parseInt(fire.age) + i);

    return fireRes;
  };

  const retirementData = (fireRes) => {
    const current = new Date();

    let amount = fireRes.fireAmount;
    let i = 0;
    let age = fireRes.ageToRetire;
    let year = current.getFullYear() + (fireRes.ageToRetire - fireRes.age);
    let expenses =
      fireRes.retirementExpenses > 0
        ? fireRes.retirementExpenses
        : fireRes.monthlyExpenses;
    let chartData = [];

    while (amount > 0 && age <= 120) {
      chartData[i] = {
        year: year,
        amount: amount,
      };
      i++;
      year++;
      age++;
      amount -= expenses * 12;
      amount += amount * (fireRes.interestRate / 100);
    }

    setRetirementChartData(chartData);
    return chartData;
  };

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
          label: "Portfolio of Savings and Return-on-Investment",
          data: chartData.map((year) => year.amount),
          fill: true,
          backgroundColor: "#ffbb11",
          color: "#3B8C66",
          borderColor: "#3B8C66",
          borderWidth: 1,
        },
      ],
    };
    calculateTaxes(formInputs.monthlyIncome, formInputs.taxPoints);
    retirementData(res);
    setChart(newData);
  };

  const placeHolders = {
    age: "Age",
    monthlyIncome: "Income",
    monthlyExpenses: "Expenses",
    currentNetWorth: "Savings",
  };
  const checkIfEmpty = (e) => {
    if (e.target.value) {
      e.target.type = "number";
    } else {
      e.target.type = "text";
      e.target.placeholder = placeHolders[e.target.name];
    }
  };

  
  return (
    <div className={styles.retirementCalculator}>
      <section className={styles.section}>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputDiv}>
              {formInputs.age && <label>Age</label>}
              <input
                placeholder="Age"
                type="number"
                onBlur={checkIfEmpty}
                name="age"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Monthly Income</label>
              <input
                placeholder="Income"
                type="number"
                onBlur={checkIfEmpty}
                name="monthlyIncome"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Monthly Expenses</label>
              <input
                placeholder="Expenses"
                type="number"
                onBlur={checkIfEmpty}
                name="monthlyExpenses"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Current Savings</label>
              <input
                placeholder="Savings"
                type="number"
                onBlur={checkIfEmpty}
                name="currentNetWorth"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Interest Rate</label>
              <input
                placeholder="Interest"
                type="number"
                onBlur={checkIfEmpty}
                name="interestRate"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Retirement Expenses</label>
              <input
                placeholder="Expenses"
                type="number"
                onBlur={checkIfEmpty}
                name="retirementExpenses"
                onChange={handleInputeChange}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Tax Points</label>
              <input
                placeholder="Points"
                type="number"
                onBlur={checkIfEmpty}
                name="taxPoints"
                onChange={handleInputeChange}
              />
            </div>
          </div>

          <button onClick={handleSubmit}>Calculate</button>
        </form>

        <p className={styles.text}>You can achieve finanical independence in</p>
        <p
          className={styles.result}
        >{`${fireResults.yearsNeeded} years by age ${fireResults.ageToRetire}`}</p>
        <p className={styles.text}>
          With ${fireResults.fireAmount} total, $
          {Math.floor(fireResults.totalInterest)} of which earned by interest.
        </p>

        <p className={styles.text}>
          Your tax per month is ${Math.floor(taxes)}, meaning after tax income is {fireResults.monthlyIncome - taxes}
        </p>
      </section>
      <div className={styles.chart}>
        <LineChart chartData={chart} />
        <LineChart chartData={retirementChart} />
      </div>
    </div>
  );
};

export default RetirementCalculator;
