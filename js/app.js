import { valida } from "./validaciones.js";

const input = document.querySelectorAll("input");

/* regresa un arreglo el cual se podra iterar */
input.forEach(input =>{
    input.addEventListener('blur', (input) =>{
        valida(input.target)
    });
});