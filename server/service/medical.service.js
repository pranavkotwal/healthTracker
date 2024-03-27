const httpStatus = require('http-status')
const MedicalData = require('../model/medData.model')

// enter data 

const enterReportDetials = async (userId,date,reports)=>{

    try {
        const reportDoc = await MedicalData.create({
        user:userId,
        date,
        reports
    })
    return reportDoc;
    } catch (error) {
        console.log('Error in creating report details',error)
    }
}


// get reports



const getReportsOfUsers = async (userId) => {
    try {

        const reports = await MedicalData.find({ user:userId });

        console.log("reports of user",reports)
        return reports;
    } catch (error) {
        // Handle errors
        console.error('Error fetching reports:', error);
        throw error;
    }
};


// search specific report 

const searchMedicalData = async (userId, startDate, endDate, reportType) => {
    try {
        // Construct query object based on provided parameters
        const query = { user: userId };
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        if (reportType) {
            query.reports = { $elemMatch: { name: reportType } };
        }

        const projection = {
            user: 1,
            date: 1,
            reports: { $elemMatch: { name: reportType } }, // Include only the relevant report element
            createdAt: 1,
            updatedAt: 1,
            __v: 1
        };

        // Perform the search
        const medicalData = await MedicalData.find(query,projection);
        console.log(medicalData)
        return medicalData;
    } catch (error) {
        console.error('Error searching medical data:', error);
        throw error;
    }
};

const deleteReport = async (id) => {
    try {
        const deletedReport = await MedicalData.findByIdAndDelete({_id:id});
        if (!deletedReport) {
            throw new Error("Report not found");
        }
        return deletedReport;
    } catch (error) {
        console.error('Error deleting report:', error);
        throw error;
    }
};









module.exports ={
    enterReportDetials,
    getReportsOfUsers,
    searchMedicalData,
    deleteReport

}