const express = require("express");
const logger = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

// router will be here

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev")); 

// app.use router here

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));