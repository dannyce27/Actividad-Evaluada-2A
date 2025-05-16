import express from "express";

import employeesRoutes from "./src/routes/employees.js";
import customersRoutes from "./src/routes/customers.js";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());

//app.use(cookieParser());

app.use("/api/employees", employeesRoutes);
app.use("/api/customers", customersRoutes);


export default app;