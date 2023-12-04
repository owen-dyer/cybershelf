const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    next();
});

// TODO: Finish implementing the logic for this
router.route("/").post((req, res, next) => {
    const fields = {
        title: req.body.title,
        description: req.body.description,

    };

    
});