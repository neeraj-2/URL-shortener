const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/UrlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true)