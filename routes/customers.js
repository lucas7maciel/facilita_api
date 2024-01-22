module.exports = (app) => {
    const funcs = app.controllers.customers

    app.get("/customers", funcs.getAll)
    app.get("/customers/:search", funcs.search)
    app.post("/customers", funcs.add)
    app.put("/customers", funcs.alter)
    app.delete("/customers", funcs.del)
}