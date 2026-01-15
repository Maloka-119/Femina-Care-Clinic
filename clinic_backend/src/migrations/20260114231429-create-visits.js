'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visits', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      patientId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Patients', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      visitType: { type: Sequelize.ENUM('Examination','Consultation'), allowNull: false },
      clinicName: { type: Sequelize.STRING },
      visitDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      reasonForVisit: { type: Sequelize.ENUM('Antinatal','Postnatal','Virgin','Other','Tumor','Bleeding'), allowNull: false },
      weight: { type: Sequelize.FLOAT },
      bloodPressure: { type: Sequelize.STRING },
      bloodSugar: { type: Sequelize.STRING },
      gestationalWeek: { type: Sequelize.INTEGER },
      fetalWeight: { type: Sequelize.FLOAT },
      fetalSize: { type: Sequelize.STRING },
      requiredTests: { type: Sequelize.TEXT },
      prescribedMedications: { type: Sequelize.TEXT },
      notes: { type: Sequelize.TEXT },
      otherObservations: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visits');
  }
};
