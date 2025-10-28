/*import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <input type="number" id="num1" />
    <select id="operator">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
      <option value="^">^</option>
      <option value="sqrt">√</option>
    </select>
    <input type="number" id="num2" />
    <button id="calculate">Calculate</button>
    <div id="result"></div>
  </div>
`


const calculateButton: HTMLButtonElement = document.getElementById('calculate') as HTMLButtonElement;
const operatorSelect: HTMLSelectElement = document.getElementById('operator') as HTMLSelectElement;

window.addEventListener("keypress", (e) => {
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input'));
    if(inputs.includes(document.activeElement as HTMLInputElement)) {
        return;
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '^') {
        handleOperatorChangeOnKeyPress(operatorSelect, e)
    }
})

calculateButton.addEventListener('click', function () {
    const resultDiv: HTMLDivElement = document.getElementById('result') as HTMLDivElement;
    const num1Element: HTMLInputElement = document.getElementById('num1') as HTMLInputElement;
    const num2Element: HTMLInputElement = document.getElementById('num2') as HTMLInputElement;

    const sign: string = operatorSelect.value;
    const num1: number = Number(num1Element.value);
    const num2: number = Number(num2Element.value);

    resultDiv.innerHTML = Calculate(sign, num1, num2);
})

function Calculate(sign: string, num1: number, num2: number) :string {
    let result: string = "";
    switch (sign) {
        case '+':
            result = (num1 + num2).toString();
            break;
        case '-':
            result = (num1 - num2).toString();
            break;
        case '*':
            result = (num1 * num2).toString();
            break;
        case '/':
            if(num2 === 0) {
                result = "Nie dziel przez zero stary";
            }
            result = (num1 / num2).toString();
            break;
            case '^':
                result = (num1 ^ num2).toString();
                break;
        case 'sqrt':
            result = Math.sqrt(num1).toString();
            break;
    }
    return result;
}

function handleOperatorChangeOnKeyPress(select: HTMLSelectElement, e: KeyboardEvent) {
    select.value = e.key;
}
*/




































