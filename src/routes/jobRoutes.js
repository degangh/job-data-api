const express = require("express");
const {getJobs, getJobById} = require("../controllers/jobController");
const router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);

module.exports = router;