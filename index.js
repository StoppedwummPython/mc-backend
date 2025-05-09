const app = require("express")()
const fs = require("fs")
const path = require("path")

require("dotenv").config({
    path: path.join(__dirname, ".env.local"),
})

app.use(function (req, res, next) {
    console.log("[", req.method, "]", req.url)
    next()
})
app.use(require("express").static("public"))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on port", port)
})

fs.readdirSync(path.join(__dirname, "api")).forEach((file) => {
    const module = require(path.join(__dirname, "api", file))
    const route = file.replace(/\.js$/, "") + (module.beta ? ":beta" : "")
    if (module.get) {
        app.get("/api/" + route, module.get)
    } else {
        app.get("/api/" + route, (req, res) => {
            res.status(404).json({ error: "Not found" })
        })
    }
    if (module.post) {
        app.post("/api/" + route, module.post)
    } else {
        app.post("/api/" + route, (req, res) => {
            res.status(404).json({ error: "Not found" })
        })
    }
    if (module.put) {
        app.put("/api/" + route, module.put)
    } else {
        app.put("/api/" + route, (req, res) => {
            res.status(404).json({ error: "Not found" })
        })
    }
    if (module.delete) {
        app.delete("/api/" + route, module.delete)
    } else {
        app.delete("/api/" + route, (req, res) => {
            res.status(404).json({ error: "Not found" })
        })
    }
    if (module.patch) {
        app.patch("/api/" + route, module.patch)
    } else {
        app.patch("/api/" + route, (req, res) => {
            res.status(404).json({ error: "Not found" })
        })
    }
    if (module.all) {
        app.all("/api/" + route, module.all)
    }
    if (module.use) {
        app.use(module.use)
    }
})

module.exports = app