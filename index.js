import express from "express";
import consign  from "consign";

const PORT = 3000;

const app = express();

consign()
    .include("models")
    .then("routes")
    .into(app);

app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));