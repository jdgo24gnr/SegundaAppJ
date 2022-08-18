require("colors");
const {abcMenu, 
    pausawe, 
    leerInput,
    BorradorDeTareas,
    confimar,
    CheckList} = require("./helpers/inquirer");
const Tareas=require('./Models/tareas')
const {GuardarDb, leerDb0} = require('./helpers/guardarArch')
console.clear();

const main = async () =>{
    
    let opt = "";
    const tareas = new Tareas();

    const tareasDb= leerDb0();
    if(tareasDb){
        //cargarTareas
        tareas.cargarTareasFromArray(tareasDb);
    }


    do{
        opt= await abcMenu();
        switch (opt) {
            case '1':
                //crear opcion
                const desc= await leerInput('Descripción: ')
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletas();
                break;
            case '4':
                tareas.listarPendientesCompletas(false);
                break;
            case '5':
                const ids = await CheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await BorradorDeTareas(tareas.listadoArr);
                if(id !==0){
                    const ok = await confimar('estás seguro');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;

        }
       GuardarDb(tareas.listadoArr)
        
        await pausawe();

    }while(opt !== "0");


    //pausa();

}

main();