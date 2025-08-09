import express from 'express'
import connection from '../database/db.js'

const router = express.Router()

router.get('/listSchools', async (req, res) => {
    const latitude = parseFloat(req.query.latitude)
    const longitude = parseFloat(req.query.longitude)

    if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        res.status(400).json({ message: 'invalid coordinates or missing ' })
    }
    else {

        const query = `SELECT id, name, address, latitude, longitude,
                (
                    6371 * ACOS(
                        COS(RADIANS(?)) 
                        * COS(RADIANS(latitude)) 
                        * COS(RADIANS(longitude) - RADIANS(?)) 
                        + SIN(RADIANS(?)) 
                        * SIN(RADIANS(latitude))
                    )
                ) AS distance FROM school ORDER BY distance ASC `;
        const values = [latitude, longitude, latitude]
        try {
            const schoolData = await connection.query(query, values)
            res.json(schoolData[0])
        } catch (error) {
            res.status(500).json({ error: 'Database error' })
        }
    }
})

export default router