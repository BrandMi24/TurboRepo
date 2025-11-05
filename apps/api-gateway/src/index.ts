import express from "express";
import proxy from "express-http-proxy";

const app = express();

app.use("/core", proxy("http://localhost:4001"));
app.use("/analytics", proxy("http://localhost:4002"));

app.listen(4000, () => console.log("gateway :4000"));
