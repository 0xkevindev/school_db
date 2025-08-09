import express from 'express'
import addSchoolRoute from './routes/addSchool.js'
import listSchoolRoute from './routes/listSchool.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use('/', addSchoolRoute)
app.use('/', listSchoolRoute)

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(8080, () => console.log('server listen : 8080'))