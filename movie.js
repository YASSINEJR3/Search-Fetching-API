const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    Title:{
        type:String,
        required:true
    },
    Year:{
        type:String,
    },
    imdbID:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Poster:{
        type:String
    }
    
},{timestamps:true})
const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;