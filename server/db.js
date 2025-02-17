const mongoose = require("mongoose")
const url = `mongodb+srv://tanushdb:dbtanush@cluster0.omdmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
module.exports.connect = () => {
    mongoose.connect(url , console.log("Database is connected"))
}