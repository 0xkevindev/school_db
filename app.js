import express from 'express'
import addSchoolRoute from './routes/addSchool.js'
import listSchoolRoute from './routes/listSchool.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use('/', addSchoolRoute)
app.use('/', listSchoolRoute)

app.use((req, res,) => {
    res.status(404).json({ message: 'Route not found!' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = 80
app.listen(PORT, () => console.log(`server listen : ${PORT}`))