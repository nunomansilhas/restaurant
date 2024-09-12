module.exports = (app) => {
    const dishes = require("../controllers/dish.controller.js");
    const router = require("express").Router();

    router.post("/", dishes.create);
    router.put("/:id", dishes.update);
    router.get("/", dishes.findAll);
    router.delete("/:id", dishes.delete);

    app.use('/api/dishes', router);
};
