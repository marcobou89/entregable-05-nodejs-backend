require('../models')
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

let movieId

const BASE_URL ="/api/v1/movies"

const movie={
    name: "The Godfather",
    image: "sdfsdfsd",
    synopsis:"terror",
    releaseYear:1998
}

test("POST -> BASE_URL, should return statusCode 201, res.body.name === movie.name",async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(movie)

    movieId= res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})


test("GET -> 'BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
//  console.log(res.body)
    expect(res.statusCode).toBe(200)

    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    // expect(res.body.length).toBe(1)

    // espect par que pueda traer y haces test al objeto que esta relacionado
    // expect(res.body[0].actors).toBeDefined()
    // expect(res.body[0].actors).toHaveLength(0)
})

test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.name === movie.name", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT -> 'BASE_URL + movieId, should return statusCode 200, res.body.name === movieUpdate.name",async()=>{
    const movieUpdate = {
        name:"The Godfather: Part II",
        image: "sdfsdfsd",
        synopsis:"terror",
        releaseYear:1998
    }

    const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

test("POST -> /BASE_URL/:id/actors, should return status code 200, and res.body.length === 1", async()=>{

    const actor={
        firstName: "John",
        lastName: "Doe",
        nationality: "American",
        image: "https://example.com/john-doe.jpg",
        birthday: "1980-05-15"
    }
    
    const createActors = await Actor.create(actor)

    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActors.id])
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    // expect(res.body.length).toBe(1)
    
    // espect par que pueda traer y haces test al objeto que esta relacionado
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createActors.id)
    await createActors.destroy()

})

test("POST -> /BASE_URL/:id/directors, should return status code 200, and res.body.length === 1", async()=>{

    const director={
        firstName: "John",
        lastName: "Doe",
        nationality: "American",
        image: "https://example.com/john-doe.jpg",
        birthday: "1980-05-15"
    }

   
    
    const createDirector = await Director.create(director)

    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirector.id])
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    // expect(res.body.length).toBe(1)
    
    // espect par que pueda traer y haces test al objeto que esta relacionado
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createDirector.id)
    await createDirector.destroy()

})

test("POST -> /BASE_URL/:id/genres, should return status code 200, and res.body.length === 1", async()=>{

    const genre={
        name: "John"
    }

   
    
    const createGenre = await Genre.create(genre)

    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenre.id])
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    // expect(res.body.length).toBe(1)
    
    // espect par que pueda traer y haces test al objeto que esta relacionado
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createGenre.id)
    await createGenre.destroy()

})


test("DELETE -> 'BASE_URL + movieId, should return statusCode 204",async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)

})