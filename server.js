const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
app.listen(5000, () => {
    MongoClient.connect('mongodb+srv://ant:drowssap@cluster0-njx1m.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, client) => {
        if(error) {
          console.log("HERE IS THE ERROR")
            throw error;
        }
        db = client.db("Money");
        console.log("Connected to " + "Money" + "!");
    });
});
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.get('/', (req,res) => {
    db.collection("remaining-amount").find().toArray(function(err,result){
    if (err) return console.log(err)
    res.render('index.ejs',{remaining:result})
  })
})
app.put('/gamble', (req, res) => {
  db.collection('remaining-amount')
  .findOneAndUpdate({moneyLeft: req.body.moneyLeft}, {
    $set: {
      moneyLeft:req.body.msg
    }
  }, {
    sort: {_id: -1}
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
