const notify = require("../services/notificationService");

exports.testNotification = async(req,res)=>{

    await notify.sendTelegram(
        "Test Notifikasi Sawah Berhasil"
    );

    res.json({
        success:true
    });
};