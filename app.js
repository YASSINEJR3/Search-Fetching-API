const express = require('express');
const  mongodb  = require('mongoose');
const app = express();
const port = 3017;
//const dbURI = "mongodb+srv://yassine:yassine1234@cluster0.wyeidoa.mongodb.net/signin?retryWrites=true&w=majority";
const dbURI = "mongodb://my-mongo:27017/MyDB";
const Movie = require('./movie');

// configure the app to use bodyParser()
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set('view engine' , "ejs");
app.set('views' , ".");

mongodb.connect(dbURI)
.then(res => app.listen(port))
.catch(err => console.error(err))


app.get('/',(req,res)=>{
    res.render('Search');
})


app.post('/search',(req,res)=>{   
  const name = req.body.nom;
  
  fetch(`http://www.omdbapi.com/?apikey=eb49e1c0&s=${name}`)
    .then(res => res.json())
    .then(result => {
      const Movies = result.Search;
      Movies.forEach(m => {
        //console.log(m);
        const movie = new Movie(m);
        movie.save();
      });
      res.render("Movies",{movies: Movies,title:name}); 
    })
    .catch((err)=>res.render("404",{title:name}))
     
})



