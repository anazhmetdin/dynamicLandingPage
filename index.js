const express = require('express');
const app = express();

app.use(express.static('website'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});