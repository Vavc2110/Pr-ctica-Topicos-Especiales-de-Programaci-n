import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { User } from './user.js'

const app = express()
dotenv.config();

const port = 3005
app.use(cors({ origin: '*' })) // cors
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.listen(port, function () {
    connectDB();
    console.log(`Api corriendo en http://localhost:${port}!`)
})

app.get(`/usuarios`,async (req, res)=>{
    try {
        var usuarios = await User.find().exec()

        await newUser.save()
        res.status(200).send({
            success: true,
            message: `Se encontraron los usuarios exitosamente`,
            outcome: [usuarios]
        })
    } 
    catch (err) {
        res.status(400).send({
            success: false,
            message: 'Error al intentar obtener los usuarios, intente nuevamente',
            outcome: []
        })
    }
    
});

const connectDB = ()=>{
    const{
        MONGO_USERNAME="admin",
        MONGO_PASSWORD="admin_password",
        MONGO_PORT="27017",
        MONGO_DB="tópicos",
        MONGO_HOSTNAME="mongo",
    }=process.env;

    const url=`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    mongoose.connect(url).then(function (){
        console.log("MongoDB is connected")
    }) 
    .catch(function (err){
        console.log(err)})
}

app.post(`/`, async (req, res) => {
    try {
        var data = req.body

        var newUser = new User(data)

        await newUser.save()
        res.status(200).send({
            success: true,
            message: 'Se registró el usuario',
            outcome: []
        })
    } 
    catch (err) {
        res.status(400).send({
            success: false,
            message: 'Error al intentar crear el usuario, intente nuevamente',
            outcome: []
        })
    }
})

