const dotenv = require("dotenv")
const path = require("path")

/**
 * Handles the /api/search endpoint.
 */
module.exports = {
    /**
     * Searches for mods on Modrinth.
     * @param {import("express").Request} req - The request object.
     * @param {import("express").Response} res - The response object.
     */
    get: async (req, res) => {
        // Construct the URL for the Modrinth API
        const url = "https://api.modrinth.com/v2/search"
        // Add the query parameter from the request
        const params = new URLSearchParams({
            query: req.query.q,
            facets: JSON.stringify([
                // Only search for mods
                ["project_type:mod"],
                // Only search for mods that support Minecraft 1.21.1
                ["versions:1.21.1"],
                // Only search for mods that are in the neoforge category
                ["categories:neoforge"],
            ]),
        })
        // Fetch the data from Modrinth
        const response = await fetch(`${url}?${params}`)
        // Return the data as JSON
        res.json(await response.json())
    },
}
