// routes/entity.routes.js

const express = require("express");
const router = express.Router();
const entitySchema = require("../models/Entity");

router.post("/add-entity",
    // [
    //     check('value')
    //         .not()
    //         .isEmpty(),
    // ],
    (req, res, next) => {
        // const errors = validationResult(req);
        // console.log(req.body);

        // if (!errors.isEmpty()) {
        //     return res.status(422).jsonp(errors.array());
        // }
        // else {
        for (i = 0; i < 20; i ++) {
            const entity = new entitySchema({
                value: 0.0001/*req.body.value*/,
            });
            entity.save().then((response) => {
                res.status(200).json({
                    message: "Entity successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        }
        // }
    });

module.exports = router;
