import React from 'react';
import './AprenderEspaniol2.css'

const AprenderEspaniol2 = (props) => {
    let displayContent = null;
    var displayGridItems = [];
    let root = document.documentElement;

    /*Get random number between 3-5-7*/
    var tamanoSopa = Math.floor(Math.random() * (7 - 3 + 1))+ 3;
    if (tamanoSopa === 4 || tamanoSopa === 6){
        tamanoSopa = tamanoSopa + 1;
    }
    /*-------------end--------------*/

    /*Assign tamanoSopa to CSS value*/ 
    root.style.setProperty('--columns',"repeat(" + tamanoSopa + ", 1fr)");
    /*-------------end--------------*/

    /*Function to assign new grid Item*/
    function generarItem(palabra){
        let newItem  = []
        console.log(palabra);
        newItem = <div class="grid-item">{palabra}</div>
        return newItem;
    }
    /*--------------end---------------*/

    let palabras = generarPalabrasRamdon(generarPalabraABuscar());
    console.log(palabras);
    /*Calling generarItem function as many times as needed*/
    for (var i = 0; i < (tamanoSopa * tamanoSopa); i++) {
        displayGridItems.push(generarItem(generarPalabra(palabras)));
    }
    /*------------------------end-------------------------*/

    function generarPalabraABuscar(){
        let palabrasABuscar = ["GATO","LATA","PALA","MANO"]
        var randomPalabraABuscar = palabrasABuscar[Math.floor(Math.random()*palabrasABuscar.length)];
        return randomPalabraABuscar;
    }

    function generarPalabrasRamdon(palabraBuscar){
        console.log(palabraBuscar);
        let palabras = [];
        switch (palabraBuscar) {
            case "GATO":
                palabras = ["GOTA","GALLO","GANSO","GAMA"];
                break;
            case "LATA":
                palabras = ["LAZO","LUNA","LIBRO","LIMA","LENTO","LOBO"];
                break;
            case "PALA":
                palabras = ["PELOTA","PEZ","PERA","PILA","PUÑO","POCO","PICO"];
                break;
            default :
                palabras = ["MINA","MURO","MORA","MESA"];
        }
        palabras.push(palabraBuscar);
        return palabras;
    }

    function generarPalabra(palabras){
        var randomPalabra = palabras[Math.floor(Math.random()*palabras.length)];
        return randomPalabra;
    }

    displayContent = 
        <div>
            <h1 className="tituloActividad">
            Aprender Español #2
            </h1>
        <p>Busca la palabra GATO en la siguiente sopa de letras y coloréala.
            <br></br>
        Concéntrate y encontrarás 9 palabras escondidas.</p>
        <div class="grid">
            {displayGridItems}
        </div>
        </div>
    return (
        <div>{displayContent}</div>
    )

}
export default AprenderEspaniol2