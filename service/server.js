const express = require("express");
const logger = require("morgan");
const { userRouter } = require("./routers/user.router");
//const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type','application/json');
    next();
 });

app.use('/api/users', userRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));