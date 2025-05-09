module.exports = {
    beta: false,
    get: (req, res) => {
        console.log("Someone called home")
        res.send("We miss you too!")
    },
}