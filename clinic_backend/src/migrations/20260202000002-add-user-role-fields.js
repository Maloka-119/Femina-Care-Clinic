'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'role', {
            type: Sequelize.ENUM('Admin', 'ClinicOwner', 'Staff'),
            defaultValue: 'Staff',
            allowNull: false
        });
        await queryInterface.addColumn('Users', 'isActive', {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        });
        await queryInterface.addColumn('Users', 'clinicId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Clinics', key: 'id' }
        });
        await queryInterface.addColumn('Users', 'status', {
            type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
            defaultValue: 'PENDING',
            allowNull: false
        });
    },
    async down(queryInterface) {
        await queryInterface.removeColumn('Users', 'status');
        await queryInterface.removeColumn('Users', 'clinicId');
        await queryInterface.removeColumn('Users', 'isActive');
        await queryInterface.removeColumn('Users', 'role');
    }
};
