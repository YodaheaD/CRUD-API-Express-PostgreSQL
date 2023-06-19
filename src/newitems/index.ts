import { Request, Response, Router } from "express";
import { ItemsTable } from "../db/items";

export const itemRouter: Router = Router();

// SETUP -> Route that sets up table in DB.
itemRouter.get("/setup", async (req: Request, res: Response) => {
  try {
    // await pool.query("CREATE TABLE products(primeId INT GENERATED ALWAYS AS IDENTITY,id int,title CHAR(50));")

    await ItemsTable.createTable();

    res.send("--> DB Created");
  } catch (error) {
    res.status(500).send("Error creating table.");
  }
});

// POST -> Route that adds data to DB.
itemRouter.post("/Add", async (req: Request, res: Response) => {
  const { id, title } = req.body;

  await ItemsTable.addToDb(id, title);

  console.log(`--> Posted data at: ${id} with title:${title}`);
  res.json("--> Added to DB");
});

// DELETE -> Route that deletes data at given id from DB.
itemRouter.delete("/Delete", async (req: Request, res: Response) => {
  const { id } = req.body;

  await ItemsTable.deleteFromDb(id);

  console.log(`--> Deleted data at: ${id}`);
  res.json(`--> Deleted data at: ${id}`);
});
// GET -> Get all data from table.
itemRouter.get("/GetAll", async (req: Request, res: Response) => {
  const data: any = await ItemsTable.getAllData();
  res.send(`${JSON.stringify(data)}`);
});

// GET -> Get specific data from table.
itemRouter.get("/Get", async (req: Request, res: Response) => {
  const { id } = req.body;

  const data = await ItemsTable.getDataWId(id);
  res.send(`${JSON.stringify(data)}`);
});
