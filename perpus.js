const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
})

db.connect(error=>{
    if(error){
        console.log(error.message)
    }else{
        console.log("MySQL Connected")
    }
})

//end-point akses data siswa
app.get("/data_siswa", (req, res) => {
    let sql = "select * from data_siswa"

    db.query(sql, (error, result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response ={
                count: result.length,
                data_siswa: result
            }
        }
        res.json(response)
    })
})

//end point akses data siswa berdasarkan id_siswa tertentu
app.get("/data_siswa/:id", (req, res)=> {
    let data = {
        id_siswa: req.params.id
    }

    let sql = "select * from data_siswa where ?"

    db.query(sql, data, (error, reslut)=> {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        }else{
            response = {
                count: result.length,
                data_siswa: result
            }
        }
        res.json(response)
    })
})

app.post("/data_siswa", (req,res)=>{
    let data ={
        nama_siswa : req.body.nama_siswa,
        kelas : req.body.kelas,
        no_absen : req.body.no_absen
    }

    let sql = "insert into data_siswa set ?"

    db.query(sql, data, (error, result)=>{
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response={
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/data_siswa", (req,res)=>{

    let data = [
        {
        nama_siswa : req.body.nama_siswa,
        kelas : req.body.kelas,
        no_absen : req.body.no_absen
        },
        
        {
            id_siswa: req.body.id_siswa
        }
    ]

    let sql = "update data_siswa set ? where ?"
    
    db.query(sql, data, (error, result)=>{
        let response = null
        if(error){
            response=null
            if(error){
                response ={
                    message: error.message
                }
            }
        }else{
            response={
                message: result.affectedRows + " data update"
            }
        }
        res.json(response)
    })
})

app.delete("/data_siswa/:id_siswa", (req, res) => {
    let data = {
        id_siswa: req.params.id_siswa
    }

    let sql = "delete from data_siswa where ?"

    db.query(sql, data, (error, result)=>{
        let response= null
        if (error){
            response ={
                message: error.message
            }
        }else{
            response ={
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})


//--------------------------------------------------------------DATA BUKU-------------------------------------------------------------------

//end-point akses data siswa
app.get("/data_buku", (req, res) => {
    let sql = "select * from data_buku"

    db.query(sql, (error, result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response ={
                count: result.length,
                data_siswa: result
            }
        }
        res.json(response)
    })
})

//end point akses data siswa berdasarkan id_siswa tertentu
app.get("/data_buku/:id_buku", (req, res)=> {
    let data = {
        id_buku: req.params.id_buku
    }

    let sql = "select * from data_buku where ?"

    db.query(sql, data, (error, reslut)=> {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        }else{
            response = {
                count: result.length,
                data_siswa: result
            }
        }
        res.json(response)
    })
})

app.post("/data_buku", (req,res)=>{
    let data ={
        judul_buku : req.body.judul_buku,
        jumlah_halaman : req.body.jumlah_halaman,
        keterangan : req.body.keterangan
    }

    let sql = "insert into data_buku set ?"

    db.query(sql, data, (error, result)=>{
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response={
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/data_buku/:id_buku", (req,res)=>{

    let data = [
        {
            judul_buku : req.body.judul_buku,
            jumlah_halaman : req.body.jumlah_halaman,
            keterangan : req.body.keterangan
        },
        
        {
            id_buku: req.body.id_buku
        }
    ]

    let sql = "update data_buku set ? where ?"
    
    db.query(sql, data, (error, result)=>{
        let response = null
        if(error){
            response=null
            if(error){
                response ={
                    message: error.message
                }
            }
        }else{
            response={
                message: result.affectedRows + " data update"
            }
        }
        res.json(response)
    })
})

app.delete("/data_buku/:id_buku", (req, res) => {
    let data = {
        id_buku: req.params.id_buku
    }

    let sql = "delete from data_buku where ?"

    db.query(sql, data, (error, result)=>{
        let response= null
        if (error){
            response ={
                message: error.message
            }
        }else{
            response ={
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(3000, () => {
    console.log("pohhhhh")
})