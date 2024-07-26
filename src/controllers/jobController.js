const Job = require('../models/jobModel');

const getJobs = async (req, res) => {
    const page = req.query.page || 1;
    const perPage = 30;
    const jobs = await Job.find()
    .sort({post_date: -1})
    .skip( (page - 1) * perPage)
    .limit(perPage);

    const totalJobs = await Job.countDocuments({});
    const totalPages = Math.ceil(totalJobs / perPage);

    res.status(200).json({
        jobs,
        page,
        perPage,
        totalPages,
        totalJobs
    });

}

const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(200).json(job);
}  

module.exports = {
    getJobs,
    getJobById
}