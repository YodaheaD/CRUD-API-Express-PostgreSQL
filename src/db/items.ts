import { TableLike } from "./tablelike";


export interface ItemsTableProps{
    primeId:number
    title:string
    id:number
}

// -> Creating new Postgres table named 'items'
export const ItemsTable = new TableLike<ItemsTableProps>('items')