
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
    .dontMock('fs');


const { validatorFunction, calculateDaysBetween, checkDate, month2Days, years2Days, monthPlusYear2Days, } = require('./calculator') 


const Date1 = '19/01/2021';
const Date2 = '20/01/2021';
const wrongDate = '40/5%/20$';
const dateArray = ['19', '01', '2021'];

describe('Date diference Calculator', function () {
  beforeEach(() => {
      document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
      // restore the original func after test
      jest.resetModules();
  });


  
  it('Both textbox should have dates', function () {
    expect(document.getElementById('datepicker1').Value === '').toBeFalsy();
    expect(document.getElementById('datepicker2').Value === '').toBeFalsy();
    expect(document.getElementById('datepicker1').Value === Date1).toBeTruthy;
    expect(document.getElementById('datepicker2').Value === Date2).toBeTruthy;
  });



 
  it('validats both textbox information', () =>{

    expect(validatorFunction(Date1, document.querySelector('#datepicker1'))).toBeTruthy
    expect(validatorFunction(Date2, document.querySelector('#datepicker2'))).toBeTruthy
    expect(document.getElementById('datepicker1').innerHTML === '').toBeTruthy
    expect(validatorFunction('', document.querySelector('#datepicker1'))).toBeFalsy;
    expect(validatorFunction('', document.querySelector('#datepicker2'))).toBeFalsy;
    
    expect(Date1).toMatch(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
    expect(Date2).toMatch(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
      
    })



it('calculate the difference between two dates', () => {
  
  // expect(calculateDaysBetween(Date1, Date2)).toBe(1);
  expect(calculateDaysBetween(Date1, '')).toBeNull;
  expect(calculateDaysBetween(Date2, '')).toBeNull;
  expect(calculateDaysBetween(Date1, Date2)).toBeUndefined
});






it('check if the Date is valid or not', () =>{
  expect(checkDate(dateArray)).toBeTruthy;
  expect(checkDate(wrongDate)).toBeFalsy;
})



it('Convert months into days', () =>{
  expect(month2Days(1)).toBe(31); // jan
  expect(month2Days(2)).toBe(59); // jan + feb
  
})




it('Convert years into days', () =>{
  expect(years2Days(0)).toBe(0);
  expect(years2Days(1)).toBe(365); // first year ever
  expect(years2Days(2)).toBe(730); // 2nd year ever
  
})



it('Adds all the days, month and years into days only - from 01/01/001  ', () => {  
  expect(monthPlusYear2Days(['19', '01', '2021'])).toBe(738220);
  expect(monthPlusYear2Days(['20', '01', '2021'])).toBe(738221);
  
});




  






});