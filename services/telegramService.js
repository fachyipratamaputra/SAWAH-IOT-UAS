const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");


// ==========================
// TELEGRAM CONFIG
// ==========================

const BOT_TOKEN =
process.env.TELEGRAM_BOT_TOKEN;


const CHAT_ID =
process.env.TELEGRAM_CHAT_ID;



// ==========================
// SEND PHOTO
// ==========================


async function sendPhoto(
    imagePath,
    caption
){

    try{


        const form = new FormData();



        form.append(
            "chat_id",
            CHAT_ID
        );



        form.append(
            "caption",
            caption
        );



        form.append(
            "photo",
            fs.createReadStream(imagePath)
        );




        const response =
        await axios.post(


        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,


        form,


        {


            headers:
            form.getHeaders()


        }



        );



        return response.data;



    }


    catch(error){


        console.log(
            "Telegram Error:",
            error.response?.data ||
            error.message
        );


        throw error;


    }

}



module.exports = {

    sendPhoto

};