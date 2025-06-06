const express = require("express");
const {productos} =  require("../data/productos.js")
const {validar} = require("./filtros/validaciones")
const nombresValidaciones = Object.keys(validar)

const APP = express()
const PORT = 3000
APP.use(express.json());

APP.post("/productos/filtrar", (req,res) => {
    const { body } = req
    const respuestas = productos.filter(p => body.every(schema => {
        if (!nombresValidaciones.includes(schema.fn)){
            return res.status(500).json(
                {"error": "no se encuentra esa validacion","fnNombre": schema.fn});
        }

        return validar[schema.fn](p,schema.values);
    }))

    return res.status(200).json(respuestas);
})

APP.listen(PORT, (e)=> {
    if (e) {
        console.error("no se puede escuchar el puerto: ", PORT)
        process.exit(1)
    }    
    console.log("iniciada en el puerto:",PORT)
})