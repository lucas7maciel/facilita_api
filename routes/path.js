module.exports = (app) => {
    const funcs = app.controllers.path

    app.get("/path", funcs.findPath)
}