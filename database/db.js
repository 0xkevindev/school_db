import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

async function connectDB() {
    try {
        const connection = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        })
        console.log('Connected to MySQL')
        return connection
    } catch (error) {
        console.error('MySQL connection error:', error.message)
    }
}

const connection = await connectDB()
export default connection