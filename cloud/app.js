app.get("/test", (req, res) => {
    if (req == "test") {
        console.log("heard you loud and clear");
    }
    res.send("Hello my name is bobby");
});
console.log("Hello world") 