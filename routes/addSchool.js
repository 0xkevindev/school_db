import express from 'express'
import connection from '../database/db.js'

const router = express.Router()

router.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body

    if (typeof name !== 'string' || name.trim === '' ||
        typeof address !== 'string' || address.trim === '' ||
        typeof latitude !== 'number' || latitude < -90 || latitude > 90 ||
        typeof longitude !== 'number' || longitude < -180 || longitude > 180
    ) {
        return res.status(400).json({ message: 'invalid or missing details' })
    }
    else {
        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`
        const values = [name.trim(), address.trim(), latitude, longitude]

        try {
            await connection.query(query, values)
            res.json({ message: 'School inserted successfully' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Database error' })
        }
    }
})

export default router