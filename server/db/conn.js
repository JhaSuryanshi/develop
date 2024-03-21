const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/contactuspage", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
    //useCreateIndex: true 
}).then(() => {
    console.log("Connection Successful");
}).catch((error) => {
    console.error("Connection failed:", error); 
});


