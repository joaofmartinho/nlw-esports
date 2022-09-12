import express from 'express'

const app = express()

app.get('/test', (request, response) => {
    return response.json('test successful')
})

app.listen(4000)
