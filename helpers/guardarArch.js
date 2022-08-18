const fs = require('fs');


const archivo='./db/data.json';
const GuardarDb= (data) =>{
    fs.writeFileSync(archivo, JSON.stringify(data));
}
const leerDb0= ()=>{
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info= fs.readFileSync(archivo, {encoding: 'utf-8'})
    const data = JSON.parse(info);
    //console.log(data)
    return data;
}

module.exports={
    GuardarDb,
    leerDb0
}