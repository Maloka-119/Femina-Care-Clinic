const { Visit, Patient, ClinicBranch, User } = require('../models');

/** POST /clinic/visits - register a visit (link to branch, patient, employee) */
exports.createVisit = async (req, res) => {
    try {
        const { patientId, clinicBranchId, employeeId, date, notes } = req.body;
        const empId = employeeId || req.user?.id;
        if (!patientId || !clinicBranchId || !date) {
            return res.status(400).json({ message: 'patientId, clinicBranchId and date are required' });
        }
        const visit = await Visit.create({
            patientId,
            clinicBranchId,
            employeeId: empId,
            date,
            notes: notes || null
        });
        const withAssocs = await Visit.findByPk(visit.id, {
            include: [Patient, ClinicBranch, { model: User, attributes: ['id', 'name', 'email'] }]
        });
        return res.status(201).json(withAssocs || visit);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** GET /clinic/visits/:branchId - list visits for a branch */
exports.listByBranch = async (req, res) => {
    try {
        const { branchId } = req.params;
        const visits = await Visit.findAll({
            where: { clinicBranchId: branchId },
            include: [Patient, ClinicBranch, { model: User, attributes: ['id', 'name', 'email'] }],
            order: [['date', 'DESC'], ['id', 'DESC']]
        });
        return res.json(visits);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
