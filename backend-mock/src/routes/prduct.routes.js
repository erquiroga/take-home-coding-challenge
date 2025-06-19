import { Router } from 'express'
import { db } from '../db.js'

export const productsRouter = Router()

productsRouter.get('/', (req, res) => {
    res.json(db.data.products)
})

productsRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = db.data.products.find(p => p.id === id)
    product ? res.json(product) : res.status(404).send()
})

productsRouter.post('/', async (req, res) => {
    const lastId = db.data.products.length
        ? Math.max(...db.data.products.map(p => Number(p.id)))
        : 0

    const newProduct = { id: lastId + 1, ...req.body }
    db.data.products.push(newProduct)
    await db.write()
    res.status(201).json(newProduct)
})

productsRouter.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send()

    db.data.products[index] = { ...db.data.products[index], ...req.body }
    await db.write()
    res.json(db.data.products[index])
})

productsRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send()

    const deleted = db.data.products.splice(index, 1)
    await db.write()
    res.json(deleted[0])
})