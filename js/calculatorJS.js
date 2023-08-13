function setup() {
  createCanvas(400, 400);
  sum = [];
  //setup of all buttons.
  //numbers
  calc_number_1 = select("#calc_number_1");
  calc_number_2 = select("#calc_number_2");
  calc_number_3 = select("#calc_number_3");
  calc_number_4 = select("#calc_number_4");
  calc_number_5 = select("#calc_number_5");
  calc_number_6 = select("#calc_number_6");
  calc_number_7 = select("#calc_number_7");
  calc_number_8 = select("#calc_number_8");
  calc_number_9 = select("#calc_number_9");
  calc_number_0 = select("#calc_number_0");
  //operations
  calc_operation_addition = select("#calc_operation_addition");
  calc_operation_minus = select("#calc_operation_minus");
  calc_operation_multiply = select("#calc_operation_multiply");  
  calc_operation_divide = select("#calc_operation_divide");
  calc_operation_sqrt = select("#calc_operation_sqrt"); 
  calc_operation_square = select("#calc_operation_square");
  calc_operation_equals = select("#calc_operation_equals");
 

  //functions
  calc_function_clear = select("#calc_function_clear"); 
  
  //onclicks of all buttons.
  calc_number_1.mousePressed(function() { addToSum(1);});
  calc_number_2.mousePressed(function() { addToSum(2);});
  calc_number_3.mousePressed(function() { addToSum(3);});
  calc_number_4.mousePressed(function() { addToSum(4);});
  calc_number_5.mousePressed(function() { addToSum(5);});
  calc_number_6.mousePressed(function() { addToSum(6);});
  calc_number_7.mousePressed(function() { addToSum(7);});
  calc_number_8.mousePressed(function() { addToSum(8);});
  calc_number_9.mousePressed(function() { addToSum(9);});
  calc_number_0.mousePressed(function() { addToSum(0);});
  //operations
  calc_operation_addition.mousePressed(function() { addToSum('+');});
  calc_operation_minus.mousePressed(function() { addToSum('-');});
  calc_operation_multiply.mousePressed(function() { addToSum('x');});
  calc_operation_divide.mousePressed(function() { addToSum('/');});
  calc_operation_sqrt.mousePressed(function() { addToSum('sqrt');}); 
  calc_operation_square.mousePressed(function() { addToSum('square');});
  calc_operation_equals.mousePressed(calculate);
  //functions
  calc_function_clear.mousePressed(clearSum);
}

function addToSum(addition) {
  sum.push(addition);
  var inputValue = sum.join(''); // Unir los elementos del arreglo en una cadena
  document.getElementById('calc-input').value = inputValue; // Actualizar el input con el contenido del arreglo
}

function calculate() {
  if (sum.length > 0) {
    var errorFound = 0;
    clear();
    improveArray();
    try {
      divideIntoCalculations(0);
    } catch (err) {
      // Resto del código...
    }
    if (errorFound === 0) {
      var answer = sum[0]; // Obtener el resultado de la suma
      document.getElementById('calc-input').value = answer; // Actualizar el valor del input con el resultado
    }
  } else {
    document.getElementById('calc-input').value = 'No sum entered'; // Mostrar mensaje de error en el input
  }
}


function clearSum() {
  sum = [];
  document.getElementById('calc-input').value = ''; // Actualizar el input para que muestre contenido vacío
}


function numberCheck(potentialNumber) {
  if(potentialNumber % 1 === 0 || potentialNumber === 0) {
    return 1; 
  } else {
    return 0;
  }
}

function improveArray() {
  this.sumLen = sum.length;
  for(var i = 0; i < this.sumLen; i++) {
    var number1 = numberCheck(sum[i]);
    var number2 = numberCheck(sum[i+1]);
    if (number1 === 1 && number2 === 1) {
      var newNumberTemp = sum[i] + '' + sum[i+1];
      var newNumber = parseInt(newNumberTemp, 10)
      sum[i] = newNumber;
      sum.splice(i+1, 1);
      i = i - 1;
    } 
  } 
}


function divideIntoCalculations(i) {
  if(sum.length !== 1) {
    item = sum[i];
    if(item !== 0 || item % 1 !== 0) {
      //if item isn't a number, check for what kind of operation it is.
      if(item === '+') { 
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var plusReturn = plus(i);
          sum[i] = plusReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === '-') {
        if(i === 0) {
          var newNumber = sum[i]+sum[i+1];
          sum[i] = parseInt(newNumber);
          sum.splice(i+1,1);
        } else {
          var minusReturn = minus(i); 
          sum[i] = minusReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === 'x') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var multiplyReturn = multiply(i);
          sum[i] = multiplyReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === '/') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var divideReturn = divide(i);
          sum[i] = divideReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      } 
      
      else if(item === 'sqrt') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var sqrt_Return = sqrt_(i);
          sum[i] = sqrt_Return;
          sum.splice(i+1, 1);
          divideIntoCalculations(i);
        }
      }
      else if(item === 'square') {
       if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var square_Return = square_(i);
          sum[i] = square_Return;
          sum.splice(i-1, 1);
          divideIntoCalculations(i);
        }
      } divideIntoCalculations(i + 1);
    } 
  } 
}

function plus(plusLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[plusLocator - 1];
  var secondNumber = sum[plusLocator + 1];
  
  return firstNumber + secondNumber;
}

function minus(minusLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[minusLocator - 1];
  var secondNumber = sum[minusLocator + 1];
  var answer = firstNumber - secondNumber;
  
  return answer;
 
}

function multiply(multiplyLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[multiplyLocator - 1];
  var secondNumber = sum[multiplyLocator + 1];
  
  return firstNumber * secondNumber;
}

function divide(divideLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[divideLocator - 1];
  var secondNumber = sum[divideLocator + 1];
  
  return firstNumber / secondNumber;
}

function sqrt_(sqrtLocator) {
  var sqrtNumber = sum[sqrtLocator + 1];
  
  return sqrt(sqrtNumber);
}

function square_(squareLocator) {
  var squareNumber = sum[squareLocator - 1];
  
  return squareNumber * squareNumber;
}

function keyTyped() {
  if (key >= '0' && key <= '9') {
    addToSum(int(key));
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    addToSum(key);
  } else if (keyCode === 'Enter') {
    calculate();
  } else if (key === 'c') {
    clearSum();
  }
}