const { response } = require("express")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      relevancy: 0
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      relevancy: 1
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      relevancy: 2
    }
]

app.get("/",(request,response)=>{
    response.send('<h1>tar</h1>')
})

app.get("/api/notes",(request,response)=>{
    response.json(notes)
})

app.get("/api/notes/:id",(request,response)=>{
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  console.log(note)
  if(note){
    response.json(note)
  }else{
    response.status(400).end()
  }
})

// app.delete("/api/notes/:id",(request,response)=>{
//   notes = notes.filter(note => note.id !== Number(request.params.id))

//   response.status(204).end()
// })


app.put("/api/notes/:id",(request,response)=>{
  const index = notes.findIndex(note => note.id === request.body.id) 
  notes[index] = request.body
  response.json(notes[index])
})



app.post("/api/notes",(request,response)=>{
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date().toISOString(),
    important: 0,
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT =process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`omg listening on port ${PORT}`)
})