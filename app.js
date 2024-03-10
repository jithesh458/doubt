const express = require('express')
const app = express()
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
app.use(express.json())
const dbpath = path.join(__dirname, 'todoApplication.db')
let db = null
const inits = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('server')
    })
  } catch (error) {
    console.log(`db error:${error.message}`)
    process.exit(1)
  }
}

inits()

const third = query => {
  return
  querys.priority !== undefined && querys.status !== undefined
}

const second = querys => {
  return
  querys.priority !== undefined
}

const first = querys => {
  return
  querys.status !== undefined
}

app.get('/todos', async (request, response) => {
  let data = null
  let getTodosQuery = ''
  const {search_q = '', priority, status} = request.query

  switch (true) {
    case third(request.query):
      getTodosQuery = `
      SELECT
        *
      FROM
        todo 
      WHERE
        todo LIKE '%${search_q}%'
        AND status = '${status}'
        AND priority = '${priority}';`
      break
    case second(request.query):
      getTodosQuery = `
      SELECT
        *
      FROM
        todo 
      WHERE
        todo LIKE '%${search_q}%'
        AND priority = '${priority}';`
      break
    case first(request.query):
      getTodosQuery = `
      SELECT
        *
      FROM
        todo 
      WHERE
        todo LIKE '%${search_q}%'
        AND status = '${status}';`
      break
    default:
      getTodosQuery = `
      SELECT
        *
      FROM
        todo 
      WHERE
        todo LIKE '%${search_q}%';`
  }

  data = await db.all(getTodosQuery)
  response.send(data)
})
