const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Workers = require("./models/Workers.js")
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/workerDB",{useNewUrlParser: true})


app.route('/workers')
.get( (req, res)=>{
    Workers.find((err, workList)=>{
        if (err) {res.send(err)}
        else {res.send(workList)}
    })
})
.post( (req,res)=>{
    const worker = new Workers({
        firstname : req.body.fname,
        lastname : req.body.lname,
        tid:req.body.id,
        email:req.body.temail,
        phone:req.body.tphone,
        address:req.body.taddress,
        password:req.body.tpassword
    })
    worker.save((err) =>{
        if (err) {res.send(err)}
        else res.send ('Successfully added a new worker!')
    }
    )
})
.delete((req,res) =>{
    Workers.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all workers!')}
    })
})

app.route('/workers/:id')
.get((req, res)=>{
    Workers.findOne({tid: req.params.id}, (err, foundWorker)=>{
        if (foundWorker) (res.send(foundWorker))
        else res.send("No Matched Worker Found!")
    })
})
.put((req,res)=>{
Workers.update(
    {tid: req.params.id},
    {   tid: req.body.id,
        email:req.body.temail,
        firstname : req.body.fname,
        lastname : req.body.lname, 
        phone:req.body.tphone,
        address:req.body.taddress,
        password:req.body.tpassword
    },
    {overwrite:true}, 
    (err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully updated!')}
    }
)
})

.patch((req, res)=>{
    Workers.update(
        {tid: req.params.id},
        {$set: req.body},
        (err)=>{
            if (!err) {res.send('Successfully updated! ')}
            else res.send(err)
        }
    )
})
.delete((req,res)=>{
    Workers.deleteOne({tid:req.params.id},(err)=>{
        if(err){res.send(err)}
        else{res.send('Successfully deleted!')}
    })
})
app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server started on port 8000');
})