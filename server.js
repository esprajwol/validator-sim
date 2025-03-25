const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    const token = req.headers["token"];
    if (token) {
        if (token == "valid") {
            res.json({ success: true });
        }
        res.json({ success: false });
    } else {
        res.json({ success: false });
    }
});

app.get("/", (_, res) => {
    return res.json({ success: true });
})

app.post("/verify", (req, res) => {
    const { code } = req.body;

    if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({ error: "Invalid code. Must be 6 digits." });
    }
    if (code.endsWith("7")) {
        return res.status(400).json({ error: "Invalid code." });
    }

    return res.json({ success: true });
});

app.listen(port, () => console.log("Server running on port", port));
