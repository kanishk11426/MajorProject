const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js');

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")

async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'public')));

main().then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.send('Hi, I am root');
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// app.get('/testListings',async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New villa",
//         description:"A beautiful villa in the heart of the city",
//         price:100000,
//         location:"New York",
//         country:"USA",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful");
// });

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use( (err,req,res,next)=>{
    let {statusCode=500, message = "Something went wrong"} = err;
    if (err.name === "ValidationError" || err.name === "CastError") {
        statusCode = 400;
    }
    res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});