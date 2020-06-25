const mongoose = require('mongoose');


let connect = (process.env.MONGO_URL ||"mongodb://localhost/dhiyo");
mongoose.connect(connect);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection with database failed'));
db.once('open', () => {
    console.log('Connection with database succeeded')
});

exports.Database = db;

// export MONGO_URL=mongodb://localhost/listing_app