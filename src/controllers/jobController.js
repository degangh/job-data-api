const Job = require('../models/jobModel');

const getJobs = async (req, res) => {
    
    try {

        const page = req.query.page || 1;
        const perPage = 30;

        const relevance = parseInt(req.query.relevance);
        const jobLocation = req.query.job_location;
        const channel = req.query.channel;
        const keyword = req.query.keyword;

        let query = {};

        if (!isNaN(relevance)) {
            query.relevance_to_search = relevance;
        }

        if (jobLocation) {
            query.job_location = { $regex: jobLocation, $options: 'i' }; 
        }

        if (channel) {
            query.channel = { $regex: channel, $options: 'i' }; 
        }

        if (keyword) {
            query.$or = [
                { keyword: { $regex: keyword, $options: 'i' } },
                { requirements: { $elemMatch: { $regex: keyword, $options: 'i' } } }
            ];
        }

        const jobs = await Job.find(query)
        .sort({post_date: -1})
        .skip( (page - 1) * perPage)
        .limit(perPage);

        const channels = await Job.distinct('channel')

        const totalJobs = await Job.countDocuments(query);
        const totalPages = Math.ceil(totalJobs / perPage);

        res.status(200).json({
            jobs,
            page,
            perPage,
            totalPages,
            totalJobs,
            channels
        });
    }
    catch(err) {
        res.status(200).json({
            message: err.message
        })
    }

}

const getJobById = async (req, res) => {
    
    try{
        const { id } = req.params;
        const job = await Job.findById(id);
        res.status(200).json(job);
    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}  

module.exports = {
    getJobs,
    getJobById
}