var express = require("express");
var path = require("path");
var fs = require("fs")



var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,"public")));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    // return res.json(__dirname, "notes.html");
    res.sendFile(path.join(__dirname, "db/db.json"));
 
  });

app.post("/api/notes", function(req, res) {
    // return res.json(__dirname, "notes.html");
    // console.log(req.body)
    // JSON.parse(fs.readFileSync("../db/db.json", "utf8")).push(req.body)

    fs.readFile('db/db.json', (err, data) => {
        
        if (err) throw err;
        dbData = JSON.parse(data);
        dbData.push(req.body)
        for (var i = 1; i < dbData.length + 1; i++) {
            dbData[i - 1].id = i
        }
        
        
      
    fs.writeFile('db/db.json', JSON.stringify(dbData), (err, data) => {
        if (err) throw err;
      });

    });
    
  });

app.delete("/api/notes/:id", function(req, res){
  const id = req.params.id
  console.log(id)

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
    
    
  
        fs.writeFile('db/db.json', JSON.stringify(dbData), (err, data) => {
          if (err) throw err;
  });

});
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});





app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
