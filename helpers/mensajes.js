require('colors');

//Hacerlo a pelo sin el paquete inquirer, el problema es que haciendolo de esta manera es mas complicado a la hora de obtener el feedback con el usuario
const mostrarMenu = () =>{

    return new Promise (resolve =>{
        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opción'.green)
        console.log('========================='.green);
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
    
        //Crear la interfaz para el usuario
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        //Hacer la pregunta al usuario
        readLine.question('Seleccione una opción: ', (opt)=>{
            readLine.close()
            resolve(opt)
        })
    })
}

const pausa = () =>{

    return new Promise(resolve =>{
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`Presione ${ 'ENTER'.green } para continuar`, (opt)=>{
            readLine.close()
            resolve()
        })
    })
}


module.exports = {
    mostrarMenu,
    pausa
}


