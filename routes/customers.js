module.exports = (app) => {
    const funcs = app.controllers.customers
    console.log(funcs)

    //ver se dá pra economizar esse customers
    app.get("/customers", funcs.getAll)
    app.get("/customers/:search", funcs.search)
    app.post("/customers", funcs.add)
    app.put("/customers", funcs.alter)
    app.delete("/customers", funcs.del)

    app.get("/path", funcs.findPath)
}