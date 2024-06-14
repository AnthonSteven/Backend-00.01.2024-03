

function ejecicio1() {
    let numero = Number.parseInt(prompt("Escribe tu numero"));
    console.log(numero)
    if (!isNaN(numero)) {
        if (numero > 99 && numero < 1000) {
            alert("tiene 3 digitos");
        }
        else {
            alert("no tiene 3 digitos");
        }
    }
    else {
        alert("Lo que ingreso no son numeros");
    }
    console.log("Ejercicio 1")
}

function ejecicio2() {
    let numero = Number.parseInt(prompt("Ingresar Numero"));
    console.log(numero)
    if (numero == 0) {
        alert("es un numero neutro")
    }
    else if (numero > 0) {
        alert("es un numero positivo")
    } else {
        alert("es un numero negativo")
    }
    console.log("Ejercicio 2")
}

function ejercicio3() {
    let numero = Number.parseInt(prompt("Ingrese Numero"));
    console.log(numero)
    if (numero % 10 == 4) {
        alert("el numero, " + numero + " si termina en 4")
    } else {
        alert("el numero, " + numero + " no termina en 4")
    }
}
function ejercicio4() {
    let numero1 = Number.parseInt(prompt("Ingrese Numero"));
    let numero2 = Number.parseInt(prompt("Ingrese Numero"));
    let numero3 = Number.parseInt(prompt("Ingrese Numero"));
    console.log(numero1)
    console.log(numero2)
    console.log(numero3)
    if (numero1 > numero2) {
        if (numero1 > numero3) {
            mayor = numero1
            if (numero2 > numero3) {
                medio = numero2
                menor = numero3
            } else {
                medio = numero3
                menor = numero2
            }
        } else {
            mayor = numero3
            medio = numero1
            menor = numero2
        }
    } else {
        if (numero2 > numero3) {
            mayor = numero2
            if (numero3 > numero1) {
                medio = numero3
                menor = numero1

            } else {
                medio = numero1
                menor = numero3
            }
        } else {
            mayor = numero3
            medio = numero2
            menor = numero1
        }
    }
    alert("Los numeros ordenados de menor a mayor son, " + menor + " " + medio + " " + mayor)

}
function ejercicio5() {
    let nNumZapatos = Number.parseInt(prompt("Ingrese Numero de Zapatos"));
    console.log(nNumZapatos);
    let nPrecioZapato = 80;
    let nTotal = nNumZapatos * nPrecioZapato;
    if (nNumZapatos > 30) {
        nDscto = (nNumZapatos * nPrecioZapato) * 40 / 100;
    } else {
        if (nNumZapatos > 20) {
            nDscto = (nNumZapatos * nPrecioZapato) * 20 / 100;
        } else {
            if (nNumZapatos > 10) {
                nDscto = (nNumZapatos * nPrecioZapato) * 10 / 100;
            } else {
                nDscto = 0.00;
            }
        }
    }
    let nTotalPago = nTotal - nDscto;
    alert("Precio total de compra es  " + nTotalPago)

}
function ejercicio6() {
   
    let nHoras = Number.parseInt(prompt("Ingrese el sueldo"));
    if (nHoras <= 40) {
        nHorasTrabajadas = nHoras * 20
    } else {
        nHorasTrabajadas = nHoras * 25
    }

    alert("Horas trabajadas " + nHorasTrabajadas)
}
function ejercicio7(){
    let  nPrecioHelado = 10
    let nHelados = Number.parseInt(prompt("Numero de helados a comprar"));
    let cMembrecia = prompt("Ingresar tipo de membresia [A/B/C]:")
    switch(cMembrecia){
        case "A":
            nDescuento = 10;
            break;
        case "B":   
             nDescuento = 15 ;
             break;    
        case "C":     
            nDescuento = 20;
            break;
           
    }
            let des = ((nHelados * nPrecioHelado) * nDescuento/100);
            let total = (nHelados * nPrecioHelado);
            let totalfinal = total - des;

        alert("total con Dscto" + totalfinal  )
}
function ejercicio8(){

    let nNota1 = Number.parseInt(prompt("Ingresar primera nota"));
    let nNota2 = Number.parseInt(prompt("Ingresar primera nota"));  
    let nNota3 = Number.parseInt(prompt("Ingresar primera nota"));

    let nPromedio = (nNota1 + nNota2 + nNota3) / 3

    if (nPromedio>=10.5) {
        cMensaje = "Aprobo"
    }else{
        cMensaje = "Desaprobo"
    }
     alert ("El estudiante " + cMensaje + " con "  + nPromedio )
}
function ejercicio9(){
    let nMonto = Number.parseInt(prompt("Ingresar monto ganado por el trabajador"));
    if(nMonto>2000) {
        nMonto = nMonto + nMonto * 5/100
    }else{
        nMonto = nMonto + nMonto * 10/100
    }

    alert("Monto final del trabajador: " + nMonto)
}
function ejercicio10(){
    let nNumero = Number.parseInt(prompt("Ingresar un numero"));
    if(nNumero % 2 == 0){
        cMsg = "Par"
    }else{
        cMsg = "Impar"
    }
    alert("El numero ingresado es: " + cMsg)
}
function  ejercicio11 (){
    let nNum1 = Number.parseInt(prompt("Ingresar primer numero:"));
    let nNum2 = Number.parseInt(prompt("Ingresar segundo numero:"));
    let nNum3 = Number.parseInt(prompt("Ingresar tercer numero:"));

    if(nNum1==nNum2  & nNum1==nNum3){
        alert("Los tres numeros son iguales")
        
    }else {
        if(nNum1>nNum2){
            if(nNum1>nNum3){
                nMayor = nNum1
            }else{
                nMayor = nNum3
            }
        }else{
            if(nNum2>nNum3){
                nMayor = nNum2
            }else{
                nMayor = nNum3
            }
        }
        alert("el numero mayor es: " + nMayor)
    }
}
function ejercicio12(){
    let nNum1 = Number.parseInt(prompt("Ingresar primer numero:"));
    let nNum2 = Number.parseInt(prompt("Ingresar segundo numero:"));
    if(nNum1 == nNum2){
        alert("Los numeros ingresados son iguales")

    }else{
        if(nNum1>nNum2){
            nMayor = nNum1
        }else{
            nMayor = nNum2
        }
         alert ("El numero mayor es :" + nMayor)   
    }
}
function ejercicio13(){
    let cLetra = prompt("Ingresar una letra:");
    switch(cLetra){
        case "A":
            cMsg = "Si es vocal"
            break;
         case "E":
            cMsg = "Si es vocal"
            break;
        case "I":
            cMsg = "Si es vocal"
            break;
        case "O":
                cMsg = "Si es vocal"
                break;
        case "U":
            cMsg = "Si es vocal"
            break;        
         
    }
    
    alert("La letra ingresada:  " + cMsg )
}

function ejercicio14(){
    let nNumero = Number.parseInt(prompt("Ingresar numero:"));

    div = 1
    cont = 0

    if(nNumero<1 || nNumero>10){
        alert("Numero ingresado incorrecto.")
    }else{
       while(div <= nNumero ){
         if (nNumero % div == 0){
            cont = cont + 1
         }
         div = div + 1
       }
       if(cont == 2){
        cMsg= " es primo"
       }else{
        cMsg= " no es primo"
       }
       alert("El numero " + nNumero + " "+ cMsg)
    }
}
function ejercicio15(){
    let nNum1 = Number.parseInt(prompt("Ingresar un numero en centimetros:"));
    let nNum2 = Number.parseInt(prompt("Ingresar un numero en centimetros:"));
    nNumPul = nNum1 / 2.54
    nNumKil = nNum2 * 0.4536
    alert ("El numero " + nNum1 + "cm, en pulgadas es: " + nNumPul )
    alert ("El numero " + nNum2 + "libras, en kilogramos es: " + nNumKil )
}

function ejercicio16(){
    let nNumero = Number.parseInt(prompt("Ingresar un numero "));
    if(nNumero<=0 || nNumero>=8){
        alert("Numero ingresado es incorrecto.")

    }else{
        switch(nNumero){
            case 1:
                cDia = "Lunes"
                break;
            case 2:
                cDia = "Martes"    
                break;    
            case 3 : 
                cDia = "Miercoles"
                break;
            case 4 :
                cDia = "Jueves"
                break;
            case 5 :
                cDia = "Viernes"
                break;
            case 6:            
                cDia="Sabado"
                break;
            case 7:
                cDia="Domingo"  
                break; 
        }
        alert("El numero de dia de " + nNumero +" es " + cDia  )
    }
}
function ejercicio17(){
    let nHoras = Number.parseInt(prompt("Ingresar un Hora "));
    let nMinutos = Number.parseInt(prompt("Ingresar un Minutos "));
    let nSegundos = Number.parseInt(prompt("Ingresar un Segundos "));
        
    lValido = 1
    if(nHoras<0 || nHoras>12){
        alert("Numero de horas invalido, rango [0-12]")
        lValido = 0
    }
    if(nSegundos<0 || nSegundos>60){
        alert("Numero de segundos invalido, rango [0-60]")
        lValido = 0
    }
    if(lValido==0){
       
    }
    nTotSegundos = (nHoras*3600) + (nMinutos*60) + nSegundos
    alert("La hora" + nHoras + ":" + nMinutos + ":" + nSegundos + "en segundos es: " + nTotSegundos )
}
function ejercicio18(){
    let nCDs = Number.parseInt(prompt("Ingresar numero de CDs a comprar: "));
    if(nCDs<=9){
        nPrecio = 10
    }else{
        if(nCDs<=99){
            nPrecio = 8
        }else{
            if(nCDs<=499){
                nPrecio = 7
            }else{
                nPrecio = 6
            }
        }

    }
    nTotal = nCDs * nPrecio
	nGanancia = nTotal * 8.25/100
	alert ("El precio total de la venta  es:" + nTotal)
    alert ("La ganancia para el vendedor es:" + nGanancia)
}
function ejercicio19(){
    let nTipo = Number.parseInt(prompt("Ingresar tipo de empleado: "));
    let nIdentificador = Number.parseInt(prompt("Ingresar numero identificador de empleado: "));
    let nDias = Number.parseInt(prompt("Ingresar numero de dias trabajados: "));

    if(nIdentificador<=9 || nIdentificador>=100){
            alert("Numero identificador invalido")
    }else{
        if(nDias>6){
            alert("Numero de dias en exceso")
        }else{
            if( nTipo>=1 & nTipo<=4){
                switch(nTipo){
                    case 1 : 
                    nPago = 66
                    break;
                    case 2 :
                    nPago = 64
                    break;
                    case 3 :     
                    nPago = 80
                    break;
                    case 4 :
                    nPago = 48
                    break;    
                }
                nTotPago = nPago * nDias
                alert("AL trabajador se le debe pagar: " + nTotPago )
            }else {
                alert("Tipo de trabajador incorrecto.")
            }
        }
    }
}
function ejercicio20(){
    let nNum1 = Number.parseInt(prompt("Ingresar primer numero: "));
    let nNum2 = Number.parseInt(prompt("Ingresar segundo numero:"));
    let nNum3 = Number.parseInt(prompt("Ingresar tercer numero: "));
    let nNum4 = Number.parseInt(prompt("Ingresar cuarto numero: "));
    
    // Cuantos numeros son pares
    nPares = 0
    if(nNum1%2 == 0){
        nPares= nPares + 1
    }
    if(nNum2%2 == 0){
        nPares= nPares + 1
    }
    if(nNum3%2 == 0){
        nPares= nPares + 1
    }
    if(nNum4%2 == 0){
        nPares= nPares + 1
    }
    alert("Los numeros pares son:" + nPares )

    // Cual es mayor de todos
    if(nNum1>nNum2){
        if(nNum1>nNum3){
            if(nNum1>nNum4){
                nMayor = nNum1
            }else{
                nMayor = nNum4
            }
        }else{
            if(nNum3>nNum4){
                nMayor = nNum3
            }else{
                nMayor = nNum4
            }
        }
    }else{
        if(nNum2>nNum3){
            if(nNum2>nNum4){
                nMayor = nNum2
            }else{
                nMayor = nNum4
            }
        }else{
            if(nNum3>nNum4){
                nMayor = nNum3
            }else{
                nMayor = nNum4
            }
        }
        
    }
    alert("El numero mayor es: " + nMayor) 
    // Si el tercero es par, calcular el cuadrado del segundo.
    if(nNum3%2==0){
        nCuadrado = nNum2 * nNum2
        alert("El cuadrado del segundo numero es: " +  nCuadrado)
    }else{
        alert("El tercer numero no es par")
    }
    // Si el primero es menor que el cuarto, calcular la media de los 4 numeros.
    if(nNum1<nNum4){
        nMedia = (nNum1 + nNum2 + nNum3 + nNum4)/4
        alert("La media de los cuatro numeros es:" + nMedia )
    }else{
        alert("El primer numero no es menor que el cuarto")
    }
    // Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los
	// valores 50 y 700. Si cumple se cumple la segunda condicion, calcular la suma de los 4 name
    if(nNum2>nNum3){
        if(nNum3>=50 & nNum3<=700){
            nSuma = nNum1 + nNum2 + nNum3 + nNum4
            alert("La suma de los cuatro numeros es:" +  nSuma)
        }else{
            alert("No se cumple la condicion establecida")
       
    }
    }else{
        alert("No se cumple la condicion establecida")
    }
}
function ejecicio21(){
    let nNum = Number.parseInt(prompt("Ingresar un numero: "));
    nFact = 1
	nCont = 0
    while(nCont<nNum ){
        nCont= nCont + 1
		nFact=nFact*nCont
    }
    alert("El factorial de" + nNum + " es : " + nFact)
}
function ejecicio22(){
    let nNum = Number.parseInt(prompt("Ingresar un numero: "));
    nCont = 1
	nSuma = 0
    while( nCont<=nNum ){
        nSuma = nSuma + nCont
		nCont = nCont + 1
    }
    alert("La suma total es: " + nSuma)
}
function ejercicio23(){
    let nNum = Number.parseInt(prompt("Ingresar un numero: "));
    nCont = 1
	nSuma = 0
    while(nCont<=nNum){
        if(nCont%2!=0){
            nSuma = nSuma + nCont
        }
        nCont = nCont + 1
    }
    alert("La suma de numeros impares es: " + nSuma)
}
function ejercicio24(){

    nTope = 1000
	nCont = 1
	nSuma = 0

    while(nCont<=nTope){
        if(nCont%2==0){
            nSuma = nSuma + nCont
        }
        nCont = nCont + 1
    }
    alert("La suma de todos los numeros pares de 1000 es: " + nSuma)

}
function ejercicio25(){
    let nNum = Number.parseInt(prompt("Ingresar un numero: "));

    nFact = 1
	nCont = 0
    while(nCont>=nNum){
        nCont= nCont + 1
		nFact=nFact*nCont
    }
	alert("El factorial de" +nNum + "es: " +  nFact  )
}
function ejercicio26(){
    let nDividendo = Number.parseInt(prompt("Ingrese el numero dividendo: "));
    let nDivisor = Number.parseInt(prompt("Ingrese el numero divisor: "));
    nResto = nDividendo
	nCociente = 0	
    while(nResto>=nDivisor){
        nResto = nResto - nDivisor
		nCociente = nCociente + 1
    }
    alert("El cociente es: " + nCociente)
    alert("El resto es: " + nResto)
}
function ejercicio27(){
    nCont = -1
	nSuma = 0
	nNum  = 0
    while(nNum<0){
        nCont = nCont + 1
		nSuma = nSuma + nNum
     let nNum = Number.parseInt(prompt("Ingrese el numero dividendo: "));
    }
    nPromedio = nSuma / nCont
    alert("La media de los numeros ingresados es: " + nPromedio)
}

function ejercicio28(){
    nNumero = 100
	nCont = 0
	nSuma = 0
    while(nCont<nNumero){
        nCont = nCont + 1
		nSuma = nSuma + nCont
    }
    alert("La suma total de numeros es: " + nSuma)
}
function ejercicio29(){
    nNumero = 100
	nCont = 0
	nSuma = 0
    while(nCont<nNumero){
        nCont = nCont + 1
		nSuma = nSuma + nCont
    }
    alert("La suma total de numeros es: " + nSuma)
}
function ejercicio30(){
    nNumero = 100
	nCont = 0
	nSuma = 0
    while(nCont<nNumero){
        nCont = nCont + 1
		nSuma = nSuma + nCont
    }
    alert("La suma total de numeros es: " + nSuma)
}
function ejecicio31(){
    let suma_impares = 0
	let suma_pares = 0
	let pares = 0
	let impares = 0
    for (let x = 1; x < 10 ; x++) {
  let n = Number.parseInt(prompt("Ingresa un número"));
        if(n % 2 == 0){
            suma_pares = suma_pares + n
			pares = pares + 1
        }else{
            suma_impares = suma_impares + n
			impares = impares + 1
        }
    }
    alert("La suma de los números pares es:  " + suma_pares/pares)
    alert("El promedio de números impares es: " + suma_impares/impares)
}
function ejecicio32(){
    alert("! No hay datos suficientes !")
}
function ejercicio33(){
   
   let respuesta ="s"
   while(respuesta="s"){
     respuesta=(prompt("deseas continuar con el programa s/n"));
    
   }
   alert("fin de la sesion")
}
function ejercicio34(){
    for (let nTabla = 1; nTabla < 9; nTabla++) {
        alert("Tabla del" +nTabla )   

        for(nNum=1;nNum<12;nNum++)
         alert ( nTabla + "*" + nNum + "=" + nTabla * nNum )
        
    }
}
function ejercicio35(){
    let numero1 = Number.parseInt(prompt("Ingrese el número 1"));
    mayor = numero1
    menor = numero1
    for (let i = 2; i < 20; i++) {
        prompt("Ingrese el número" + i+ ":")
        numero1
        if(numero1 > mayor ){
            mayor = numero1
        }
        if(numero1 < menor){
            menor = numero1
        }
    }
    alert("El número mayor es" + mayor )
    alert("El número menor es:" + menor )
}
function ejercicio36(){
    let nNumero = Number.parseInt(prompt("Ingrese el número "));
   let nNum1 = 0
	let nNum2 = 1
    for (let n = 1; n < nNumero; n++) {
        nNum2=prompt("Ingrese el número 2 ")
        nSuma = nNum1 + nNum2
		nNum1 == nNum2
		nNum2 == nSuma
    }
}
function ejercicio37(){
    let nNum1 = Number.parseInt(prompt("Ingresar primer numero:"));
    let nNum2 = Number.parseInt(prompt("Ingresar segundo numero:"));

    if(nNum1>nNum2){
        nNumX = nNum1
		nNum1 = nNum2
		nNum2 = nNumX
    }
    alert("A=" + nNum1)
    alert("B=" + nNum2)
    nResiduo = nNum1 % nNum2
    while(nResiduo>0){
        nNum = nNum2
		nNum2= nResiduo
		nNum1= nNum
		nResiduo = nNum1 % nNum2
    }
    alert("El M.C.D es:" + nNum2)
}
function ejercicio38(){
    
    let nNumero = Number.parseInt(prompt("Ingresar un numero:"));

    while(nNum <= nNumero){
        if(nNumero % nNum == 0){
            nPerfecto = nPerfecto + (nNumero/nNum)
        }
        nNum = nNum + 1
    }
    if(nPerfecto == nNumero){
        alert("El numero" + nNumero + "es un numero perfecto" )
    }else{
        alert("El numero" + nNumero + "no es un numero perfecto" )
    }
}
function ejercicio39(){
    let nNumero = Number.parseInt(prompt("Ingresar numero de veces:"));
    let nFlag = 0	
	let nPI = 0

    for (let n = 1; n < nNumero*2 ; n++) {
       if(nFlag==0){
        nPI = nPI + (4/n)
			nFlag=1
       }else{
        nPI = nPI - (4/n)
			nFlag=0
       }
        
    }
    alert ("La aproximacion del numero PI es: " + nPi )

}
function ejercicio40(){
    let nNumero = Number.parseInt(prompt("Ingresar numero de veces:"));
    nPI = 0
	n1 = 2
	n2 = 3
	n3 = 4
	n4 = 5
	n5 = 6
	for (let p = 1; p < nNumero; p++) {
        nPI = nPI + (4/(n1 * n2 * n3)) - (4/(n3 * n4 * n5))
		n1 = n1 + 4
		n2 = n2 + 4
		n3 = n3 + 4
		n4 = n4 + 4
		n5 = n5 + 4
        
    }	
    alert ("El numero pi es: " + (3 + nPI))	

}

function ejecutar(nroEjercicio) {
    switch (nroEjercicio) {
        case 1:
            ejecicio1();
            break;
        case 2:
            ejecicio2();
            break;
        case 3:
            ejercicio3();
            break;
        case 4:
            ejercicio4();
            break;
        case 5:
            ejercicio5();
            break;
        case 6:
            ejercicio6();
            break;
        case 7:
            ejercicio7();
            break;
        case 8:
            ejercicio8();
            break;
        case 9:
            ejercicio9();
            break; 
        case 10:
            ejercicio10();
            break;
            case 11:
                ejecicio11();
                break;
            case 12:
                ejecicio12();
                break;
            case 13:
                ejercicio13();
                break;
            case 14:
                ejercicio14();
                break;
            case 15:
                ejercicio15();
                break;
            case 16:
                ejercicio16();
                break;
            case 17:
                ejercicio17();
                break;
            case 18:
                ejercicio18();
                break;
            case 19:
                ejercicio19();
                break; 
            case 20:
                ejercicio20();
                break;                
                           
                case 21:
                    ejecicio21();
                    break;
                case 22:
                    ejecicio22();
                    break;
                case 23:
                    ejercicio23();
                    break;
                case 24:
                    ejercicio24();
                    break;
                case 25:
                    ejercicio25();
                    break;
                case 26:
                    ejercicio26();
                    break;
                case 27:
                    ejercicio27();
                    break;
                case 28:
                    ejercicio28();
                    break;
                case 29:
                    ejercicio29();
                    break; 
                case 30:
                    ejercicio30();
                    break;
         case 31:
            ejecicio31();
            break;
        case 32:
            ejecicio32();
            break;
        case 33:
            ejercicio33();
            break;
        case 34:
            ejercicio34();
            break;
        case 35:
            ejercicio35();
            break;
        case 36:
            ejercicio36();
            break;
        case 37:
            ejercicio37();
            break;
        case 38:
            ejercicio38();
            break;
        case 39:
            ejercicio39();
            break; 
        case 40:
            ejercicio40();
            break;
        default:
            break;
    }

}