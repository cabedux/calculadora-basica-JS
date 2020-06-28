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

