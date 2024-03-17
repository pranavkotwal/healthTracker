const express = require('express')
const router = express.Router()
const medicalController = require('../../controllers/medical.controller')
const auth = require('../../middleware/auth')


router.post('/new-report',auth,medicalController.enterReportDetailsController)
router.get('/get-reports',auth,medicalController.getReportsOfUserController)
router.get('/search',auth,medicalController.searchMedicalDataController)
module.exports = router