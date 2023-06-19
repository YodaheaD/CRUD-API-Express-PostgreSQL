import { Pool } from "pg";

export interface TableLikeProps {}

export class TableLike<TableLikeProps> {
  private Conn?: any;

  constructor(public readonly tableName: string) {
    // Creating the connection string for Postgres
    this.Conn = new Pool({
      /***/
      host: "db",
      port: 5432,
      user: "user123",
      password: "password123",
      database: "db123",
    });
  }

  /**
   * Functions List
   * ______________________
   *  -> 'catcher()'
   * Error catcher function.
   *
   *  -> 'createTable()'
   * Function to create a table.
   *
   *  -> 'addToDb()'
   * Function to add entity to table.
   *
   *  -> 'deleteFromDb()'
   * Function to delete item from DB using product's id. 
   *
   * -> 'getAllData()'
   * Function for getting all the data entries from table.
   *
   * -> 'getDataWId()'
   * Function for getting a data entry using product's id.
   *
   */

  private TableTitle = "products";
  // -> Error catcher function
  private catcher(err: any) {
    if (err.statusCode !== 409) {
      throw err;
    }
  }

  // -> Function to create the table in postgres.
  public async createTable() {
    try {
      await this.Conn?.query(
        "CREATE TABLE products(primeId INT GENERATED ALWAYS AS IDENTITY,id int,title VARCHAR(50));"
      );
    } catch (error) {
      console.log(" ** ERROR creating table", error);
    }
  }

  //-> Function to add Entry to postgres.
  public async addToDb(id: number, title: string) {
    //const sqlCommand=  `INSERT INTO ${this.TableTitle}(id, title) VALUES($1, $2) RETURNING *`;
    const sqlCommand = `INSERT INTO products(id, title) VALUES($1, $2) RETURNING *`;
    try {
      await this.Conn?.connect();
      console.log("  ---- Successful Connection ----  ");
      await this.Conn?.query(sqlCommand, [id, title]);
    } catch (error) {
      console.log(" ** Failed to add");
    }
  }

  //-> Function to delete enty in postgres
  public async deleteFromDb(id: number) {
    const sqlCommand = `DELETE FROM products WHERE id = $1`;

    try {
      await this.Conn?.query(sqlCommand, [id]);
      console.log(" ** DELETED from Table");
    } catch (error) {
      console.log(" ** ERROR at deleting from DB");
    }
  }

  // Function to Get all contents from DB
  public async getAllData() {
    const sqlCommand = `SELECT * FROM products`;
    try {
      const { rows } = await this.Conn?.query(sqlCommand);

      const items = rows;
      console.log(`Fetched data: ${items}`);
      return items;
    } catch (error) {
      console.log(" ** ERROR at getting data from DB");
    }
  }

  // Function to Get specific contents from DB.
  // - Note: queried data is found in 'rows' object.
  public async getDataWId(id: string) {
    const sqlCommand = `SELECT * FROM products WHERE id = $1`;

    try {
      const { rows } = await this.Conn?.query(sqlCommand, [id]);
      console.log(`Fetched data: ${rows}`);
      return rows;
    } catch (error) {
      console.log(" ** ERROR at getting data from DB");
    }
  }
}
