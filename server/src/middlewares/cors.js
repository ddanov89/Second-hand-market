function cors() {
    return function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-type, X-Authorization");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    }
}

module.exports = { cors };