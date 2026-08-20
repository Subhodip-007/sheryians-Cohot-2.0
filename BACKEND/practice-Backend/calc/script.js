const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let num1 = '';
let num2 = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;


        if (value === 'C') {
            num1 = '';
            num2 = '';
            operator = '';
            display.value = '';
        }


        else if (value === '=') {
            let result = 0;
            let n1 = Number(num1);
            let n2 = Number(num2);

            if (operator === '+') result = n1 + n2;
            if (operator === '-') result = n1 - n2;
            if (operator === '*') result = n1 * n2;
            if (operator === '/') result = n1 / n2;

            display.value = result;


            num1 = result;
            num2 = '';
            operator = '';
        }


        else if (value === '+' || value === '-' || value === '*' || value === '/') {
            operator = value;
            display.value = operator;
        }


        else {

            if (operator === '') {
                num1 += value;
                display.value = num1;
            }

            else {
                num2 += value;
                display.value = num2;
            }
        }

    });
});