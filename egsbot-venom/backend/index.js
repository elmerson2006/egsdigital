const app = require('express')();
const consign = require('consign');
const fs = require('fs');
const nodemon = require('nodemon')

consign()
    .include('./api')
    .then('./config/routes.js')
    .into(app);


app.listen(3000, () => {
    const now = new Date()
    console.log('Backend executando porta 3000', now);

});


