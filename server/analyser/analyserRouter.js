const router = require('express').Router();
let analyserController = require('./analyserController.js');

router.get('/test', function(req, res) {
    try {
        // console.log("in route ");
        analyserController.testRoute(req, function successCB(users) {
            // console.log(users);
            res.status(200).send(users);
        }, function errorCB(err) {
            console.log(err);
            res.status(200).json({
                error: "failed to get users"
            });
        })
    } catch (e) {
        res.status(500).json({
            error: "Server error...try again later"
        });
    }
});

module.exports = router;