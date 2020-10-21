const express = require('express');

const server = express();

server.use(express.json());

const PORT = 5000;






server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} ***\n`);
});