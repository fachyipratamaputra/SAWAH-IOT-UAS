require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");


const db = require("./config/database");

const {
    sendPhoto
} = require("./services/telegramService");



const app = express();



// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());


app.use(
    express.json({
        limit:"20mb"
    })
);



app.use(
    "/uploads",
    express.static("uploads")
);





// ===============================
// CONFIG
// ===============================


const PORT =
process.env.PORT || 3000;


const HOST_IP =
process.env.HOST_IP || "192.168.100.31";





// ===============================
// HOME
// ===============================


app.get("/",(req,res)=>{


res.send(
"Server Sawah IoT Aktif"
);


});






// ===============================
// TEST PING ESP32
// ===============================


app.get("/ping",(req,res)=>{


console.log(
"PING DITERIMA"
);


res.send("OK");


});








// ===============================
// DATA SENSOR UMUM
// ESP32 -> MYSQL
// ===============================


app.post(
"/api/test",

(req,res)=>{


console.log(
"DATA SENSOR:"
);


console.log(req.body);



const {

status,

water_level,

pest_detected,

image_path


}=req.body;





const sql = `

INSERT INTO sensor_logs

(

status,

water_level,

pest_detected,

image_path

)

VALUES(?,?,?,?)

`;





db.query(

sql,


[


status || null,

water_level || null,

pest_detected || 0,

image_path || null


],


(err,result)=>{


if(err){


console.log(
"MYSQL ERROR",
err
);


return res.status(500).json({

success:false

});


}



res.json({

success:true,

id:result.insertId

});



}



);


}

);










// ===============================
// KETINGGIAN AIR
// ESP32 -> MYSQL
// ===============================


app.post(

"/api/water",


(req,res)=>{



console.log(
"DATA AIR:"
);


console.log(
req.body
);





const water_level =
req.body.water_level;





const sql = `


INSERT INTO sensor_logs

(

status,

water_level

)

VALUES(?,?)

`;





db.query(

sql,


[

"WATER_MONITORING",

water_level

],


(err,result)=>{


if(err){


console.log(
"MYSQL ERROR",
err
);


return res.status(500).json({

success:false

});


}



console.log(
"AIR TERSIMPAN"
);




res.json({

success:true,

message:"Data air masuk database",

id:result.insertId


});



}


);



}


);












// =================================
// ESP32-CAM UPLOAD FOTO
// =================================


app.post(

"/api/upload",


express.raw({

type:"image/jpeg",

limit:"20mb"


}),


async(req,res)=>{



try{


if(
!req.body ||
req.body.length===0
){


return res.status(400).json({

success:false,

message:"Foto kosong"

});


}





console.log(
"FOTO DITERIMA"
);



console.log(

"SIZE:",

req.body.length

);






const fileName =

Date.now()+".jpg";




const filePath =

"uploads/pest-images/"+fileName;





// SIMPAN JPG


fs.writeFileSync(

filePath,

req.body

);





console.log(

"FOTO TERSIMPAN:",

fileName

);







// MYSQL FOTO


const sql = `


INSERT INTO sensor_logs

(

status,

pest_detected,

image_path

)

VALUES(?,?,?)

`;





db.query(

sql,


[


"PEST_DETECTED",

1,

fileName



],



async(err)=>{


if(err){


console.log(err);


return res.status(500).json({

success:false

});


}






// TELEGRAM


try{


await sendPhoto(

filePath,


`⚠ HAMA TERDETEKSI


Waktu:

${new Date().toLocaleString("id-ID")}


Status:

PEST DETECTED`

);



console.log(

"Telegram terkirim ✔"

);



}

catch(error){


console.log(

"Telegram gagal:",

error.message

);



}







res.json({

success:true,


image:fileName,


url:

`http://${HOST_IP}:${PORT}/uploads/pest-images/${fileName}`



});





}

);



}


catch(error){


console.log(

"UPLOAD ERROR",

error

);



res.status(500).json({

success:false,

message:error.message

});



}



}


);











// ===============================
// LIHAT DATABASE
// ===============================


app.get(

"/api/logs",


(req,res)=>{



db.query(

"SELECT * FROM sensor_logs ORDER BY id DESC",


(err,result)=>{


if(err)

return res.status(500).json(err);



res.json(result);



}


);



}

);










// ===============================
// START SERVER
// ===============================


app.listen(

PORT,


"0.0.0.0",



()=>{


console.log(

`Server running on http://${HOST_IP}:${PORT}`

);



}

);