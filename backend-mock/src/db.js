import { JSONFilePreset } from 'lowdb/node'

export const db = await JSONFilePreset('db.json', { products: [] })