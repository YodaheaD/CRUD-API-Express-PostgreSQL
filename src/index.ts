
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import pool from "./items/dbconnection/db";


dotenv.config();
//////////////////////////////////////////////

 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();
//////////////////////////////////////////////
/**
 *  App Configuration
 * Express: Minimalist web framework for Node.js.
 * Dotenv: Zero-dependency module that loads environment variables 
 *    -- from a .env file into process.env.
 * Helmet: Express middleware to secure your apps by setting various HTTP headers, 
 *    -- which mitigate common attack vectors.
 * Cors: Express middleware to enable CORS with various options.
*/

app.get('/setup', async (req, res) => {
  try{
      await pool.query("CREATE TABLE products(primeId INT GENERATED ALWAYS AS IDENTITY,id int,title CHAR(50));")
      res.send('DB Created')
  }catch(error){
      res.status(500).send('Error occurs')
  }
})
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);

//////////////////////////////////////////////
/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
//////////////////////////////////////////////