'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Clinics', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            clinicId: { type: Sequelize.STRING(36), allowNull: false, unique: true },
            name: { type: Sequelize.STRING, allowNull: false },
            ownerId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },
            isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Clinics');
    }
};
