const inquirer = require("inquirer");
const Tarea = require("../Models/Tarea");
require("colors");

const calambreEnElHombro = [{
    type:"list",
    name:"opcion",
    message:"¿Qué desea hacer?",
    choices:[
        {
        value:"1",
        name:`${"1. ".green}Crear Tareas`,
        },
        {
            value:"2",
            name:`${"2. ".green}Listar Tareas`
        },
        {
            value:"3",
            name:`${"3. ".green}Listar Tareas Completas`
        },
        {
            value:"4",
            name:`${"4. ".green}Listar Tareas Pendientes`
        },
        {
            value:"5",
            name:`${"5. ".green}Completar Tarea(s)`
        },
        {
            value:"6",
            name:`${"6. ".green}Borrar Tarea`
        },
        {
            value:"0",
            name:`${"0. ".red}Salir`
        },
        ],
}]

const abcMenu = async() =>{
    console.clear();
    console.log("=========================".green);
        console.log("Selecciona una opción".green);
        console.log("=========================\n".green);

        const {opcion} = await inquirer.prompt(calambreEnElHombro)

        return opcion;
}


const pausawe = async()=>{
    const qrs = [{
        type:"input",
        name:"Ostia",
        message:`Presione ${" Enter ".green}para continuar`
    }];
    
    await inquirer.prompt(qrs)
}
const leerInput = async(message)=>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question)
    return desc;
    
}

const BorradorDeTareas = async (tareas=[])=>{
    const choices = tareas.map( (tarea,i)=>{
        const idx =`${i+1}.`.green
            return{
                value: tarea.id,
                name: `${idx} ${tarea.desc}`
            }
    });

    choices.unshift({
        value: '0',
        name:'0.'.green + ' Cancelar'
    })
    const preguntas = [{
        type:'list',
        name:'id',
        message:'borrar',
        choices
    }
]
const {id} = await inquirer.prompt(preguntas)
return id;


}
const confimar = async (message) =>{
    const question =[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    const {ok}= await inquirer.prompt(question)
    return ok;

}
const CheckList = async (tareas=[])=>{
    const choices = tareas.map( (tarea,i)=>{
        const idx =`${i+1}.`.green
            return{
                value: tarea.id,
                name: `${idx} ${tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
            }
    });

    choices.unshift({
        value: '0',
        name:'0.'.green + ' Cancelar'
    })
    const pregunta = [{
        type:'checkbox',
        name:'ids',
        message:'Selecciones',
        choices
    }
]
const {ids} = await inquirer.prompt(pregunta)
return ids;


}

module.exports = {
    abcMenu,
    pausawe,
    leerInput,
    BorradorDeTareas,
    confimar,
    CheckList
}