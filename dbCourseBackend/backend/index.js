import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";
import autoRoutes from "./routes/auto.js";
import journalRoutes from "./routes/journal.js";
import autoPersonalRoutes from "./routes/autoPersonal.js";
import routesRoutes from "./routes/routes.js";

const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginRoutes);
app.use(registerRoutes);
app.use(autoRoutes);
app.use(autoPersonalRoutes);
app.use(journalRoutes);
app.use(routesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
