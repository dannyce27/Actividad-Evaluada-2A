import express from "express";

import employeesRoutes from "./src/routes/employees.js";
import customersRoutes from "./src/routes/customers.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import logoutRoutes from "./src/routes/logout.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import loginRoute from "./src/routes/login.js"
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());

//app.use(cookieParser());

app.use("/api/employees", employeesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/registerCustomers", registerCustomersRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoute)
app.use("/api/logout", logoutRoutes)


export default app;