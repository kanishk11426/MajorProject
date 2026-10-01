const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listings.js');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
}

main()
    .then(()=>{
        console.log('Connected to database');
    })
    .catch((err)=>{
        console.log(err);
    });

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '6abd411eba9c4d20cf49a5c1'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();


 