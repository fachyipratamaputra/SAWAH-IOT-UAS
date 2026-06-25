const Image = require("../models/Image");

const {
    sendPhoto
} = require("../services/telegramService");

exports.uploadImage = async (req,res)=>{

    const file = req.file;

    console.log("File diterima:");
    console.log(file.path);

    Image.saveImage(
        file.path,
        "waiting",
        async (err)=>{

            if(err){

                console.log("DB ERROR:");
                console.log(err);

                return res.status(500).json(err);

            }

            console.log(
                "Data berhasil disimpan ke MySQL"
            );

            try {

                await sendPhoto(file.path);

                console.log(
                    "Telegram berhasil dikirim"
                );

            } catch(error){

                console.log(
                    "Telegram gagal:"
                );

                console.log(error);

            }

            res.json({
                success:true,
                file:file.filename
            });

        }
    );
};