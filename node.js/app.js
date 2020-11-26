const express = require('express');
const movies = require('./routes/movies');
const reviews = require('./routes/reviews');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

app.use("/api/movies", movies);
app.use("/api/reviews", reviews);

// one page app
const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(80);
console.log("Server running on port 80");
