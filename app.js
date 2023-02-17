import express from "express";
import dotenv from "dotenv";
dotenv.config();

export const { PORT } = process.env
export const app = express();

app.use(express.json());
