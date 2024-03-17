const {medicalService} = require('../service')
const httpStatus = require('http-status')

//enter reports

const enterReportDetailsController = async (req, res) => {
    try {
        const userId = req.userId; // Assuming user id is available in req.user
        
        const { date, reports } = req.body;

        const reportDoc = await medicalService.enterReportDetials(userId, date, reports);

        res.status(httpStatus.CREATED).json({success:true,message:'New Report Entered',reportDoc});
    } catch (error) {
        console.error('Error entering report details:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};



const getReportsOfUserController = async (req, res) => {
    try {
        const userId = req.userId; 
        console.log('userrrid',userId)
        const data = await medicalService.getReportsOfUsers(userId);
        // console.log('reports',data[0].reports) 
        res.json(data);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};


const searchMedicalDataController = async (req, res) => {
    try {
        const  userId  = req.userId; // Assuming userId is available in the authenticated user object

        // Extract query parameters from request query
        console.log('req query',req.query)
        const { startDate, endDate, reportType } = req.query;

        // Call the service function to perform the search
        const medicalData = await medicalService.searchMedicalData(userId, startDate, endDate, reportType);

          console.log('Query to database:', medicalData.query); // Log the query
        res.status(httpStatus.OK).json(medicalData);
    } catch (error) {
        console.error('Error searching medical data:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};




module.exports = {
    enterReportDetailsController,
    getReportsOfUserController,
    searchMedicalDataController
};