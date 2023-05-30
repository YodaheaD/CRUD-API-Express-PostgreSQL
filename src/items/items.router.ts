

import express, { Request, Response } from "express";
import { BaseItem, Item } from "./item.interface";
import pool from "./dbconnection/db";


export const itemsRouter = express.Router();

///////////////////////////////////////


/**
 * Controller Definitions
 *  GET items
 * GET items/:id
 * POST items
 * PUT items/:id
 * DELETE items/:id
 */


// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
 try {
    const client = await pool.connect();
    const sql = `SELECT * FROM ${process.env.DOCKER_DB_TABLE_NAME}`;
    const { rows } = await client.query(sql);
    const items = rows;

    client.release();
    res.send(items);
} catch (error) {
  console.log(error)
    res.status(400).send(error);
}
  });

;


// GET items/:id
/*
* FOr this method there are two options:
 *  - Option 1: Using "/" as route and accept an id
 *  -- in the request body. The id is then used to get
 *  -- the item with the id that matches it in the database
 
 */
itemsRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const id  = parseInt(req.params.id, 10);
      console.log(`ID is:${id}`)
      const client = await pool.connect();
      const sql = `SELECT * FROM ${process.env.DOCKER_DB_TABLE_NAME} WHERE id = $1`;
      await client.query(sql,[id]);  
      client.release();
      res.send(200);
  } catch (error) {
    console.log(error)
      res.status(400).send(error);
  }
  });

// GET items/:id
/**
 *  *  - Option 2: Using "/:id" as route and accept an id
 *  -- in the route. The id is parsed then used to get
 *  -- the item with the id that matches it in the database
 */
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id  = parseInt(req.params.id, 10);
    console.log(`ID is:${id}`)
    const client = await pool.connect();
    const sql = `SELECT * FROM ${process.env.DOCKER_DB_TABLE_NAME} WHERE id = $1`;
    await client.query(sql,[id]);  
    client.release();
    res.send(200);
} catch (error) {
  console.log(error)
    res.status(400).send(error);
}
});


// POST items
/**
 * -- Get the id and title from the request body. Then
 * --- open connection to DB and insert the id and title 
 * --- data into it.
 */
itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const {id,title }= req.body
      console.log(`ID is:${id} and title is: ${title}`)
      //const item: BaseItem = req.body;
      const client = await pool.connect();
      const sql = `INSERT INTO ${process.env.DOCKER_DB_TABLE_NAME}(id, title) VALUES($1, $2) RETURNING *`;
      await client.query(sql,[id,title]);
      client.release();

      res.status(201).json(`User added with ID: ${id}`);
    } catch (e) {
        console.log('Error')
    }
  });



// PUT items/:id
/**
 * -- First take the id and Item to put from the request.
 * --- Next use '.find' to get the item of the id given in the
 * --- response and save as 'currentItem'. If there is an item
 * --- in that id, use '.update()' method to place the Item from 
 * --- the request in that id. If not create a new item in that id. 
 */
itemsRouter.put("/:id", async (req: Request, res: Response) => {
   // const id: number = parseInt(req.params.id, 10);
  
    try {
     // const itemUpdate: Item = req.body;const currentItem: Item = await ItemService.find(id);
     const {id,title }= req.body
     console.log(`ID is:${id} and title is: ${title}`)
     //const item: BaseItem = req.body;
     const client = await pool.connect();
     const sql = `INSERT INTO ${process.env.DOCKER_DB_TABLE_NAME}(id, title) VALUES($1, $2) RETURNING *`;
     await client.query(sql,[id,title]);
     client.release();
      //if (currentItem) {const updatedItem = await ItemService.update(id, itemUpdate);return res.status(200).json(updatedItem);}const newItem = await ItemService.create(itemUpdate);
  
      res.status(201).json(`PUT:${id} : ${title}`)//newItem
    } catch (e) {
        console.log('Error')
    }
  }); 




// DELETE items/:id
/**
 * FOr this method there are two options:
 *  - Option 1: Using "/" as route and accept an id
 *  -- in the request body. The id is then used to delete
 *  -- the item with the id that matches it in the database
 */ 
itemsRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const {id }= req.body
    console.log(`ID is:${id}`)
    //const item: BaseItem = req.body;
    const client = await pool.connect();
    const sql = `DELETE FROM ${process.env.DOCKER_DB_TABLE_NAME} WHERE id = $1`;
    await client.query(sql,[id]);
    client.release();
    console.log('DELETED')   
    res.sendStatus(204);
  } catch (error) {
    console.log('Error')
  }
});
/**
 *  - Option 2: Using "/:id" as route and accept an id
 *  -- in the route. The id is parsed then used to delete
 *  -- the item with the id that matches it in the database
 */
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id  = parseInt(req.params.id, 10);
    console.log(`ID is:${id}`)
    //const item: BaseItem = req.body;
    const client = await pool.connect();
    const sql = `DELETE FROM ${process.env.DOCKER_DB_TABLE_NAME} WHERE id = $1`;
    await client.query(sql,[id]);
    client.release();
    console.log('DELETED')   
    res.sendStatus(204);
  } catch (error) {
    console.log('Error')
  }
});

