require('colors');
const { 
        inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        marcarTareasCompletadas
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {guardarDB,leerDB} = require('./helpers/guardarArchivo')

console.clear()

const main = async() =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB()

    if(tareasDB) {  //cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do{
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const desc =await leerInput('Descripción:')
                tareas.crearTarea(desc)
            break;

            case '2':
                tareas.listadoCompleto()
                //console.log(tareas.listadoArray);
            break;

            case'3':
                tareas.listarPendientesCompletadas(true)
            break;

            case '4':
                tareas.listarPendientesCompletadas(false)
            break;

            case '5':
                //tareas.completarTareas()
                const ids = await marcarTareasCompletadas(tareas.listadoArray)
                //console.log(ids)
                tareas.toggleCompletadas(ids)
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArray)
                if(id !== '0'){
                    const ok = await confirmar()
                    if( ok ) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente')
                    }
                }
            break;
        }

        //Guardar datos
        guardarDB(tareas.listadoArray);

        console.log('\n')
        await pausa()

    }while(opt !== '0')
}

main()