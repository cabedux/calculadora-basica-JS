/**
* JS Calculadora
**/

/** 
* Añade al input el caracter que indica el usuario
**/
function addScreen(character){
	//Si el input esta vacio, solo se pueda pulsar el "-"
	/*let value = document.getElementById("pantalla").value;
	if(value == "" && (character == "+" || 
		character == "/" || character == "*")){
		document.getElementById("pantalla").value = "";
	}
	//evitar que el usuario inserte 2 simbolos iguales consecutivos
	else if((value[value.length - 1] == "-" && character == "-") ||
			(value[value.length - 1] == "+" && character == "+") ||
			(value[value.length - 1] == "/" && character == "/") ||
			(value[value.length - 1] == "*" && character == "*") ){
				document.getElementById("pantalla").value = value;
	} 
	//cuando el valor es "0", que solo se pueda insertar uno
	else if(character == "0" && value.length == 1){
		document.getElementById("pantalla").value = character;
	}
	else{*/
		document.getElementById("pantalla").value += character;
	/*}*/
}

/**
* Vacia el contenido del input
**/
function deleteScreen(){
	document.getElementById("pantalla").value = "";
}

/**
 * Dado un valor del input, devuleve el resultado de la operacion * 
 **/
function readScreen(){
	//Valor del input
	let expression = document.getElementById("pantalla").value;

	//Pintar en el input
	document.getElementById("pantalla").value = calculateExpresion(expression);	
}

/**
* Dada la expresion matematica valida, calcula su resultado
**/
function calculateExpresion(expression){	
	let result = "E";	
	if(!isIncorrectSentence(expression)){
		result = getResult(expression, getOperator(expression));
	}	
	return result;
}

/**
* Obtener el simbolo matematico de operacion
**/
function getOperator(expression){
	let operator = "-";//Suponemos que el operador sera "-"
	for(let i = 0; i < expression.length && operator == "-"; i++){
		if(isNaN(expression[i]) && expression[i] !="-"){
			operator = expression[i];
		}
	}
	return operator;
}

/**
 * Dado el string y el operador, calcula el resultado de la operación
 **/
function getResult(expression, operator){
	const NEGATIVE = -1;
	let result = "E";
	let arrayExpression = expression.split(operator);
	switch(operator){
		case '+':
			result = parseInt(arrayExpression[0]) + 
				parseInt(arrayExpression[1]);
			break;
		case '-':
			if(expression.startsWith("-")){
				result = (parseInt(arrayExpression[1]) * NEGATIVE) - 
					parseInt(arrayExpression[2]);
			}
			else{
				result = parseInt(arrayExpression[0]) - 
					parseInt(arrayExpression[1]);
			}
			break;
		case '*':
			result = parseInt(arrayExpression[0]) * 
				parseInt(arrayExpression[1]);
			break;
		case '/':
			if(arrayExpression[1] != "0"){//SegundoValor!=0 para evitar division entre 0
				result = parseInt(arrayExpression[0]) / 
					parseInt(arrayExpression[1]);
			}
			break;
	}

	if(result != "E"){
		result = parseInt(result);
	}
	return result;
}
/*
** Develve TRUE si la expresion matematica es incorrecta.
** Develve FALSE si la expresion matematica es correcta.
*/
function isIncorrectSentence(expression){
	let result = false;
	//Si no tiene simbolo, no es correcta la expression
	if(isNoOperator(expression)){
		result = true;
	}
	//Se comprueba que la primera(simbolo != "-") 
	//ultima (simbolo = (+,-,*,/)) posicion
	else if(isNaN(expression[expression.length-1]) || 
			expression.startsWith("+") || 
			expression.startsWith("*") ||
			expression.startsWith("/")){//
		result = true;
	}	
	else{//si las anteriores son validas, comprobar pares de valores.
		result = comparePairValue(expression)
	}
	return result;
}

/**
 * Devuelve TRUE si la expresion no tiene simbolo o tiene un negativo delante
 **/
function isNoOperator(expression){
	let operator = true;
	//empiezo en i=1, por si es negativo que no lo tenga en cuenta
	for(let i = 1; i < expression.length && operator == true; i++){
		if(isNaN(expression[i])){
			operator = false;
		}
	}
	return operator;
}


function comparePairValue(expression){
	let result = false;
	for(let i = 0; i < expression.length-1 && result == false; i++){
		//comparar pares de valores que sean simbolos math
		if(isNaN(expression[i]) && isNaN(expression[i+1])){
			//si son distintos de +-, *-, /-
			if(expression[i] == "-" || expression[i+1] != "-"){
				result = true;
			}
		}
	}
	return result;
}


/***************************
* TESTS DE FUNCIONALIDAD
*****************************/
let value;
//OK
value = "10+20";
console.log(value + ": " + calculateExpresion(value));//30
value = "10-20";
console.log(value + ": " + calculateExpresion(value));//-10
value = "10*20";
console.log(value + ": " + calculateExpresion(value));//200
value = "10/20";
console.log(value + ": " + calculateExpresion(value));//0.5
value = "-100+20";
console.log(value + ": " + calculateExpresion(value));//-80
value = "-10-20";
console.log(value + ": " + calculateExpresion(value));//-30
value = "-10*20";
console.log(value + ": " + calculateExpresion(value));//-200
value = "-20/10";
console.log(value + ": " + calculateExpresion(value));//-2

//OK: CON NUMEROS NEGATIVOS Y SIMBOLOS DOBLES VALIDOS ("+-", "/-", "*-")
value = "-10+-20";
console.log(value + ": " + calculateExpresion(value));//-30
value = "-10*-20";
console.log(value + ": " + calculateExpresion(value));//200
value = "-10/-20";
console.log(value + ": " + calculateExpresion(value));//0.5

//OK: CON NUMEROS POSITIVOS Y SIMBOLOS DOBLES VALIDOS ("+-", "/-", "*-")
value = "10+-20";
console.log(value + ": " + calculateExpresion(value));//-10
value = "10*-20";
console.log(value + ": " + calculateExpresion(value));//-200
value = "20/-10";
console.log(value + ": " + calculateExpresion(value));//-2

//ERROR: ACABAN EN SIMBOLO
value = "-10*20+";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10*20-";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10*20*";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10*20/";
console.log(value + ": " + calculateExpresion(value));//ERROR

//ERROR: DIVISION POR ZERO
value = "20/0";
console.log(value + ": " + calculateExpresion(value));//ERROR

//ERROR: SIMBOLO AL INICIO, EXCEPTO "-"
value = "+10*25";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10*25";
console.log(value + ": " + calculateExpresion(value));//-250
value = "*10*25";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "/10*25";
console.log(value + ": " + calculateExpresion(value));//ERROR

//ERROR: SIMBOLO AL INICIO Y FINAL
value = "+10*25+";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10*25+";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "*10*25+";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "/10*25+";
console.log(value + ": " + calculateExpresion(value));//ERROR


//ERROR: SIMBOLOS ANIDADOS DIFERENTES A LOS VALIDOS ("+-", "/-", "*-")
value = "-10+-+20";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10--20";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10**20";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10//20";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10/*20";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-10-*20";
console.log(value + ": " + calculateExpresion(value));//ERROR

//ERROR: EXPRESION SIN simbolos
value = "1020";
console.log(value + ": " + calculateExpresion(value));//ERROR
value = "-1020";
console.log(value + ": " + calculateExpresion(value));//ERROR

