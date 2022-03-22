const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index/index", { title: "Home" });
});

// About page
router.get("/about", (req, res) => {
	res.render("index/about", { title: "About" });
});

module.exports = router;
