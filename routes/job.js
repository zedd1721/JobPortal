const express = require('express');
const router = express.Router();
const jobController = require('../controller/job');
const verifyToken = require('../middlewares/verifyAuth');

router.post('/create', verifyToken,jobController.createJobPost);
router.get('/jobdetails/:jobId', jobController.getJobDetailsbyId);
router.put('/update/:jobId', verifyToken , jobController.updateJobDetailsbyId);
router.get('/alljobs', jobController.getAllJobs);

module.exports = router;    