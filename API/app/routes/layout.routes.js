module.exports = (app) => {
    const layouts = require("../controllers/layout.controller.js");
    const router = require("express").Router();

    // Create a new layout
    router.post("/", layouts.create);

    // Retrieve all layouts
    router.get("/", layouts.findAll);

    // Retrieve a single layout by ID
    router.get("/:id", layouts.findOne);

    // Update a layout by ID
    router.put("/:id", layouts.update);

    // Delete a layout by ID
    router.delete("/:id", layouts.delete);

    app.use('/api/layouts', router);
};
