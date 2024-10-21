const dotenv = require('dotenv');
dotenv.config();

const server = require('./server');

/* eslint-disable no-undef */
const PORT = process.env.PORT || 3000 // No error will be raised here
/* eslint-enable no-undef */

server.listen(PORT, () => {
    console.log(`Server is listening to port : ${PORT}`);
})
console.log("...");
