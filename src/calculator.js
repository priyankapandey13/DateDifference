// global variables
const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

// assign the values into validatorfunction and calculator
const getValidation = () => {
  const dateFrom = document.getElementById("datepicker1").value;
  const dateTo = document.getElementById("datepicker2").value;

  const dateA = document.querySelector("#datepicker1");
  const dateB = document.querySelector("#datepicker2");

  const dateAValidated = validatorFunction(dateFrom, dateA);
  const dateBValidated = dateAValidated && validatorFunction(dateTo, dateB);

  dateBValidated && calculateDaysBetween(dateFrom, dateTo);
};

// validats both textbox information and then act accordingly
const validatorFunction = (dateFrom, datebox) => {
  // Checking for if date exists and date format

  if (dateFrom === "") {
    datebox.style.color = "red";
    datebox.style.border = "1px solid red";
    document.getElementById("warnings").innerHTML = "dates can not be blank";
    document.getElementById("output").innerHTML = "";
  } else if (dateFrom && dateFrom.match(dateformat)) {
    datebox.style.color = "green";
    datebox.style.border = "1px solid green";
    document.getElementById("warnings").innerHTML = "";
    return true;
  } else {
    datebox.style.color = "red";
    datebox.style.border = "1px solid red";
    document.getElementById(
      "warnings"
    ).innerHTML = `The format is not acceptable, please enter a valid date`;
    document.getElementById("output").innerHTML = "";
  }
  return false;
};

// takes the information from both textboxes and then calculate the difference
const calculateDaysBetween = (dateFrom, dateTo) => {
  // event.preventDefault();

  const firstDate = dateFrom.split("/");
  const secondDate = dateTo.split("/");

  // checking if date month and year is valid
  const isFirstDateAuth = checkDate(firstDate);
  const isSecondDateAuth = checkDate(secondDate);
  if (isFirstDateAuth && isSecondDateAuth) {
    // converted full date into days only
    const previousdate = monthPlusYear2Days(firstDate);
    const nextdate = monthPlusYear2Days(secondDate);

    let totalDays = nextdate - previousdate;

    let positiveDays = Math.abs(totalDays);

    totalDays = totalDays <= 0 ? positiveDays : totalDays;
    updateDomwithcalculateddate(totalDays);
  } else if (!isFirstDateAuth) {
    document.querySelector("#datepicker1").style.color = "red";
    document.querySelector("#datepicker1").style.border = "1px solid red";
    document.getElementById(
      "warnings"
    ).innerHTML = `The format is not acceptable, please enter a valid date`;
  } else if (!isSecondDateAuth) {
    document.querySelector("#datepicker2").style.color = "red";
    document.querySelector("#datepicker2").style.border = "1px solid red";
    document.getElementById(
      "warnings"
    ).innerHTML = `The format is not acceptable, please enter a valid date`;
  }
};

const updateDomwithcalculateddate = (totalDays) => {
  if (totalDays || totalDays >= 0) {
    document.getElementById("output").innerHTML = `${totalDays} Days`;
    return totalDays;
  } else {
    document.getElementById("output").innerHTML = ``;
    return null;
  }
};

// validates the date format
const checkDate = (inputdate) => {
  const daydate = inputdate[0] >= 1 && inputdate[0] <= 31 ? true : false;
  const daymonth = inputdate[1] >= 1 && inputdate[1] <= 12 ? true : false;
  const dayyear = inputdate[2] >= 0 ? true : false;
  return daydate && daymonth && dayyear ? true : false;
};

// take input month and converts month into days starting from 0
const month2Days = (month) => {
  const monthNumber = parseInt(month);
  const totalDaysArray = daysOfMonth.slice(0, monthNumber);
  const totalDayssum = totalDaysArray.reduce((sum, index) => sum + index, 0);

  return totalDayssum;
};

// takes the current year and convert into days starting from 0 with leap year added
const years2Days = (currentyearstring) => {
  // get total num of leap years
  const currentyear = parseInt(currentyearstring);
  const totalYears = [];

  for (let index = 1; index <= currentyear; index++) {
    const myvalue =
      index % 4 && index % 400 && index % 100 !== 0 ? false : true;

    totalYears.push(myvalue);
  }

  const totalLeapYears = totalYears.filter((item) => item !== false).length;

  // converted years into days + TotalLeapYears
  const totalDays = currentyear * 365 + totalLeapYears;
  return totalDays;
};

// takes the array of input dates : day, month and year and sum it: it will be from 1/1/001
const monthPlusYear2Days = (inputDate) => {
  // converting months into days
  const month2days = month2Days(inputDate[1]); // total days from 1st month
  // converting years into days
  const years2days = years2Days(inputDate[2]); // total days from 1st year

  const totalSum = parseInt(inputDate[0]) + month2days + years2days; // sum of date + month + year

  console.log(totalSum);
  return totalSum;
};

if (typeof exports !== "undefined") {
  module.exports = {
    validatorFunction,
    calculateDaysBetween,
    updateDomwithcalculateddate,
    checkDate,
    month2Days,
    years2Days,
    monthPlusYear2Days,
  };
}
