"use strict";

const bcrypt = require("bcryptjs");

const ADMIN_EMAIL = "malakmhemdan@gmail.com";
const ADMIN_PASSWORD = "femina123#";

module.exports = {
  async up(queryInterface) {
    // اتأكد لو الأدمن موجود
    const [existing] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = '${ADMIN_EMAIL}'`
    );

    if (existing.length > 0) {
      console.log("Admin account already exists, skipping seed.");
      return;
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // إضافة الأدمن
    await queryInterface.bulkInsert("Users", [
      {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: "Admin",
        role: "Admin",
        isActive: true,
        status: "APPROVED",
        clinicId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log("Initial Admin account created.");
  },

  async down(queryInterface) {
    // حذف الأدمن لو حابة ترجعي seed
    await queryInterface.bulkDelete("Users", { email: ADMIN_EMAIL });
    console.log("Admin account removed.");
  },
};
