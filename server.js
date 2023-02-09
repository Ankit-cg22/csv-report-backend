const express = require('express')
const app =  express()
const generateData = require("./utils/parseData")
const cors = require('cors')
const multer = require("multer")

app.use(cors({origin:'*'}))
app.use(express.urlencoded({
    extended: true
}));
const upload = multer({dest : "uploads"})
app.get("/",(req,res)=>{
    res.status(200).send("Welcom to report generation server")
})
app.post("/parseFile" , upload.single("excelfile") , (req, res)=>{
    const metadata = generateData(req.file.path);
    res.status(200).json({metadata})
})

const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))