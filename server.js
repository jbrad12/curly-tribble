var express = require("express");
var path = require("path");
var fs = require("fs")



var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,"public")));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Route to display notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });


//Route to recieve JSON data
app.get("/api/notes", function(req, res) {

    res.sendFile(path.join(__dirname, "db/db.json"));
 
  });


//Route to post note data from database (db.json)
app.post("/api/notes", function(req, res) {


    //Reads current notes inside db.json and add new note to array
    fs.readFile('db/db.json', (err, data) => {
        
        if (err) throw err;
        dbData = JSON.parse(data);
        dbData.push(req.body)
        for (var i = 1; i < dbData.length + 1; i++) {
            dbData[i - 1].id = i
        }
        
        
    //Writes a new db.json file with previous data and new
    fs.writeFile('db/db.json', JSON.stringify(dbData), (err, data) => {
        if (err) throw err;
      });

    });
    
  });


  //Route to delete data
app.delete("/api/notes/:id", function(req, res){
  const id = req.params.id
  console.log(id)


  //Similar fucntionality to the previous add feature, instead it deletes
  fs.readFile('db/db.json', (err, data) => {
    console.log(data)
    if (err) throw err;
    dbData = JSON.parse(data);
    for (var i = 1; i < dbData.length + 1; i++) {
        if (dbData[i -1].id === Number(id)) {
        dbData.splice([i - 1], 1)
        }
      console.log(dbData)
    }
    
    
        //Same as previous, writes a new db.json file after deleting
        fs.writeFile('db/db.json', JSON.stringify(dbData), (err, data) => {
          if (err) throw err;
  });

});
})


//Route to get index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});





app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
