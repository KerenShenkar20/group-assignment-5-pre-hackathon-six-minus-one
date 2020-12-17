const express = require("express");
const { userRouter } = require("./routers/user.router");
const cors = require('cors');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/../client/')));
 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
 });
 
// @serve client side 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});


app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));