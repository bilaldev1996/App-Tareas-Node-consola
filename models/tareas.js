require('colors')
const Tarea = require('./tarea');


class Tareas {

    _listado = {
        'abc' : 124
    };
    

    get listadoArray() {
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push( tarea)
        })

        return listado;
    }
    constructor(){
        this._listado = {};
    }

    completarTareas(){

    }
    borrarTarea(id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea
        })
    }


    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
        //console.log(this.listadoArray)
        console.log()
        this.listadoArray.forEach((tarea,index) =>{
            if(tarea.completadoEn !== null){
                console.log(`${index+1}`.green,`.${tarea.desc} ::`,'Completada'.green)
            }else{
                console.log(`${index+1}`.red,`.${tarea.desc} ::`,'Pendiente'.red)
            }
        })
    }

    listarPendientesCompletadas = (completadas = true,opt)=>{
        
        let contador = 0;
        console.log()
        this.listadoArray.forEach(tarea=>{
            if(completadas){
                if(tarea.completadoEn !=null){
                    contador ++
                    console.log(`${(contador + '.').green}${tarea.desc} ::`,`${tarea.completadoEn}`.green)
                }
            }else{
                if( !tarea.completadoEn){
                    contador++
                    console.log(`${(contador + '.').red}${tarea.desc} ::`,'Pendiente'.red)
                }
            }
        })
    }

    toggleCompletadas ( ids = [] ){


        //Si no esta completada la marcamos como completada
        ids.forEach(id =>{

            const tarea = this._listado[id]

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        //Para que aparezca como pendiente
        this.listadoArray.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;