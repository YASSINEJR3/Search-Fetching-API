const express = require('express');
const redis = require("redis");
const util = require('util');
const  mongodb  = require('mongoose');
const app = express();
const port = 3017;
//const dbURI = "mongodb+srv://yassine:yassine1234@cluster0.wyeidoa.mongodb.net/signin?retryWrites=true&w=majority";
const dbURI = "mongodb://my-mongo:27017/MyDB";
const Movie = require('./movie');
//const redisURI="redis://rdb:6379";
const client = redis.createClient(6379, 'rdb')
//lient.set = util.promisify(client.set);
client.get = util.promisify(client.get);

// configure the app to use bodyParser()
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set('view engine' , "ejs");
app.set('views' , ".");

mongodb.connect(dbURI)
.then((res) => {
  app.listen(port);
  client.on_connect();

})
.catch(err => console.error(err))

client.on('connect', () => console.log('Connected to Redis') );
client.on("error", (err) => {
  console.log(err);
});

app.get('/',async(req,res)=>{
  const result = await client.get("movie_name");
  console.log(result);    
  res.render('Search',{lastSearch:result});
})


app.post('/search',(req,res)=>{   
  const name = req.body.nom;
  
  fetch(`http://www.omdbapi.com/?apikey=eb49e1c0&s=${name}`)
    .then(res => res.json())
    .then((result) => {
      const Movies = result.Search;
      client.set("movie_name",name);
      Movies.forEach(m => {
        const movie = new Movie(m);
        movie.save();
      });
      res.render("Movies",{movies: Movies,title:name}); 
    })
    .catch((err)=>res.render("404",{title:name}))
     
})



