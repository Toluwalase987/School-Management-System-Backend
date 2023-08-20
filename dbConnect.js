const mongoose = require('mongoose');


const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to db successfully')
     
    } catch (error) {
        console.log('Something went wrong with db connection');
        // console.log(process.env)
    }
};

dbConnect()