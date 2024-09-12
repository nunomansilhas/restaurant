module.exports = (app) => {
    const tables = require("../controllers/table.controller.js");
    const router = require("express").Router();

    router.get("/", tables.findAll);
    router.put("/:id/status", tables.updateStatus);

    app.use('/api/tables', router);
};
