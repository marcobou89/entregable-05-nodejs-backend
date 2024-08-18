require('../models')
const request = require('supertest')
const app = require('../app')

let genreId

const BASE_URL ="/api/v1/genres"

const genre={
    name: "Drama"
}

test("POST -> BASE_URL, should return statusCode 201, res.body.name === genre.name",async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(genre)

    genreId= res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)

})

test("GET -> 'BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
//   console.log(res.body)
    expect(res.statusCode).toBe(200)

    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    // expect(res.body.length).toBe(1)

   
  })

  test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.name === genre.name", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()  
    expect(res.body.name).toBe(genre.name)

  })
  test("PUT -> 'BASE_URL/:id, should return statusCode 200, and res.body.name === updatedGenre.name", async () => {
    const updatedGenre = {
        name:"Acción"
    }
    const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(updatedGenre)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(updatedGenre.name)
  })

  test("DELETE -> 'BASE_URL/:id, should return statusCode 204",async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(204)

  })
  


