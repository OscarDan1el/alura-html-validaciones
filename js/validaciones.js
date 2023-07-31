/*----
---SE UTILIZO CON EL ID Y NO ES BUENA PRACTICA  

const inputNacimiento = document.querySelector("#birth");

 blur escucha el elemento de salida  
inputNacimiento.addEventListener("blur",(evento)=>{
    validarNacimiento(evento.target)
});
 */

export function valida(input){
    /* dataset obtenemos la coleccion de todos los datas */
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput])
    {
        validadores[tipoDeInput](input);
    }

    
    /* si es valido quuiero que quite la clase */
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else
    {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }

}

/* es un arreglo  */
const tipoErrores = [
"valueMissing",
"typeMismatch",
"patternMismatch",
"customError",
];

/* creacion de un objeto 
llamremos utilizado segun el input
*/
const mensajesError = {
    nombre:{
        valueMissing:"Este Campo no puede estar Vacio"
    },
     email:{
        valueMissing:"El Campo Email no puede estar Vacio ",
        typeMismatch:"El correo no es valido"
    }, 
    /* evaluara el patron patternMissing */
    password:{
        valueMissing:"Este Campo password no puede estar Vacio",
        patternMismatch:"debe contener 8 o más caracteres que sean al menos un número y una letra mayúscula y minúscula"
    },
    nacimiento:{
        valueMissing:"Este Campo fecha no puede estar Vacio",
        customError:"Debes tener por lo menos 18 años de edad",
    },
    numero:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"El formato requerido es xxxxxxxx",
    },
    direccion:{
        valueMissing:"Este campo direccion no puede estar vacio ",
        patternMismatch:"la direccion debe contener entre 10 a 40  caracteres.",
    },
    ciudad:{
        valueMissing:"Este campo direccion no puede estar vacio ",
        patternMismatch:"la ciudad debe contener entre 10 a 40  caracteres.",
    },
    estado:{
        valueMissing:"Este campo direccion no puede estar vacio ",
        patternMismatch:"el estado debe contener entre 10 a 40  caracteres.",
    },
};



/* una funcion que recibira input y validara nacimiento  */
const validadores  = {
    nacimiento: (input) => validarNacimiento(input),
};


function mostrarMensajeError(tipoDeInput, input){
    let mensaje = "";
    tipoErrores.forEach(( error) =>{
        if(input.validity[error]){
        console.log(tipoDeInput,error);
        console.log(input.validity[error]);
        console.log(mensajesError[tipoDeInput][error]);
        mensaje = mensajesError[tipoDeInput][error];
        }
    });
    return mensaje;

}




function validarNacimiento(input){
    const fechaUsuario = new Date(input.value);
    mayorDeEdad(fechaUsuario);

    /* recibe un mesaje personalizable  */
    let mensaje = "";
    if (!mayorDeEdad(fechaUsuario)){
        mensaje = "debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

/* RECIBIRA LA FECHA */
function mayorDeEdad(fecha){
    const fechaActual =new Date(); 
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}