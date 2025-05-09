const dotenv = require("dotenv")
const path = require("path")
module.exports = {
    get: async (req, res) => {
        const response = await fetch("https://api.modrinth.com/v2/search?query=" + req.query.q + "&facets=[[\"project_type:mod\"], [\"versions:1.21.1\"], [\"categories:neoforge\"]]")
        res.json(await response.json())
    }
}