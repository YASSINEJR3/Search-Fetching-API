const express = require('express');
const app = express();
const port = 3017;


// configure the app to use bodyParser()
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set('view engine' , "ejs");
app.set('views' , ".");

app.get('/',(req,res)=>{
    res.render('Search');
})


app.post('/search',(req,res)=>{   
  const name = req.body.nom;
  
  fetch(`http://www.omdbapi.com/?apikey=eb49e1c0&s=${name}`)
    .then(res => res.json())
    .then(result => {
      res.render("Movies",{movies:result.Search ,title:name}); 
    })
    .catch((err)=>res.render("404",{title:name}))
     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


