require('../models')
const request = require('supertest')
const app = require('../app')

let actorId

const BASE_URL ="/api/v1/actors"


const actor={
    firstName: "John",
    lastName: "Doe",
    nationality: "American",
    image: "https://example.com/john-doe.jpg",
    birthday: "1980-05-15"
}

test("POST -> BASE_URL, should return statusCode 201, res.body.firstName === actor.firstName",async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId= res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

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

  test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

  })

  test("PUT -> 'BASE_URL + actorId, should return statusCode 200, res.body.firstName === actorUpdate.firstName",async()=>{
    const actorUpdate = {
        firstName:"Vinicio"
        
        }
        
    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)

})

test("DELETE -> 'BASE_URL + actorId, should return statusCode 204",async()=>{


    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
    
    expect(res.statusCode).toBe(204)
    

})
