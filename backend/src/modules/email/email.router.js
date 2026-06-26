import express from 'express';
const emailRouter = express.Router();
import { testEmail } from "./email.controller.js";

emailRouter.get("/test", testEmail);

export default emailRouter;