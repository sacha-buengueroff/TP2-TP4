import { MongoClient } from "mongodb"

try {
    console.log('Conectando a la base de datos...')
    let client = new MongoClient('mongodb://127.0.0.1', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    await client.connect()
    console.log('Base de datos conectada!')
    let db = client.db('empresa')

    let personas = await db.collection('clientes').find({}).project(
        {nombre:1, apellido:1, _id:0}
    ).toArray()
    console.log(personas);

    await db.collection('productos').updateMany({},
        {$set: {codigo: 'xxx-xxxxx'}}
    )
    console.log("Productos actualizados!");

    let productos = await db.collection('productos').find({}).project(
        {nombre:1, precio:1, codigo:1, _id:0}
    ).toArray()
    console.log(productos);
}
catch(error) {
    console.log(`Error en la conexion a la base de datos: ${error.message}`);    
}