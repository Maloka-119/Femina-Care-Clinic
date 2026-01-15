'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      age: { type: Sequelize.INTEGER },
      phone: { type: Sequelize.STRING },
      maritalStatus: { type: Sequelize.ENUM('Madam','Miss'), defaultValue: 'Madam' },
      bloodType: { type: Sequelize.ENUM('A','B','AB','O') },
      rhFactor: { type: Sequelize.ENUM('+','-') },
      clinicLocation: { type: Sequelize.ENUM('Al Sayeda Zainab','Giza'), allowNull: false },
      husbandName: { type: Sequelize.STRING },
      husbandJob: { type: Sequelize.STRING },
      marriageDate: { type: Sequelize.DATEONLY },
      reasonForVisit: { type: Sequelize.ENUM('Antinatal','Postnatal','Virgin','Other'), allowNull: false },
      chronicDiseases: { type: Sequelize.TEXT },
      familyHistory: { type: Sequelize.TEXT },
      otherNotes: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
};
