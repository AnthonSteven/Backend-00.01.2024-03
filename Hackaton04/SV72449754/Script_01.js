console.log("=====================================================================");
console.log("                              RETO 01                                ");
console.log("=====================================================================");
console.log("");





/*1. Crea una función que retorne la suma de dos números. */
    function Suma_Num(Num1,Num2) {
        let sum=0;
        sum=Num1+Num2;
        return sum 
    }
    //Test de la Funcion
    console.log("Ejercicio 01: ");
    console.log("La suma de los Numeros es: " + Suma_Num(4,7));
    console.log("............................................................");




/*2. Crea una función que retorne la potencia de un número dado, esta función deberá recibir la potencia y el número a potenciar. */
    function Potencia_Num(Base,Exp){
        let Potencia=Base**Exp;
        return Potencia
    }
    //Test de la Funcion
    console.log("Ejercicio 02: ");
    console.log("La Potencia de los Numeros es: " + Potencia_Num(2,5));
    console.log("............................................................");






/*3. Crea una función que tome números y devuelva la suma de sus cubos. sumOfCubes(1, 5, 9) ➞ 855
Since 1^3 + 5^3 + 9^3 = 1 + 125 + 729 = 855 */

    function Sum_Cubes(Num1,Num2,Num3) {
        let sum=0;
        sum = Num1**3+ Num2**3 + Num3**3;
        return sum
    }
    //Test de la Funcion
    console.log("Ejercicio 03: ");
    console.log("La suma de los cubos de los Numeros es: " + Sum_Cubes(1,5,9));
    console.log("............................................................");





/*4. Escribe una función que tome la base y la altura de un triángulo y devuelva su área.
triArea(3, 2) ➞ 3 */
    function Area_Triangulo(Base,Altura) {
        let Area=0;
        Area=(Base*Altura)/2;
        return Area  
    }
    //Test de la Funcion
    console.log("Ejercicio 04: ");
    console.log("El area del Triangulo es: " + Area_Triangulo(3,4));
    console.log("............................................................");




/*5. Crea una función llamada calculator que recibe 3 parámetros, dos números y
una operación matemática (+,-,/,x,%), y si la operación no es correcta que envié un 
mensaje “El parámetro no es reconocido” calculator(2,"+", 2) ➞ 4 */

    function Calculadora(Num1,Num2,Oper) {
        let Num_01 = Num1;
        let Num_02 = Num2;
        let calculo=0;
        let Type_Oper = Oper;
        let Cond_01= (Num_01!=NaN) && (Num_01!=NaN);
        let Cond_02= (Type_Oper=="+") || (Type_Oper=="-") || (Type_Oper=="*") || (Type_Oper=="/");


        if (Cond_01) {
            if(Cond_02){
                switch (Type_Oper) {
                    case "+":
                        calculo=Num_01 + Num_02;
                        break;
        
                    case "-":
                        calculo=Num_01 - Num_02;
                        break;
        
                    case "*":
                        calculo=Num_01 * Num_02;
                        break;
        
                    case "/":
                        if (Num2!=0) {
                            calculo=Num_01 / Num_02;
                        }
                        else{
                            console.log("el parametro 2 debe ser diferente de cero");
                        }
                        break;
                
                    default:
                        break;
                }
            }
            else{
                console.log("El parámetro no es reconocido");
            }
            
        }
        else{
            console.log("Por favor ingrese valores validos");
        }
        return calculo
    }

    //Test de la Funcion
    console.log("Ejercicio 05: ");
    console.log("Calculo de la operacion es: " + Calculadora(3,4,"*"));
    console.log("............................................................");