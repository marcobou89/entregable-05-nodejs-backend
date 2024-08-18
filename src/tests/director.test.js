require('../models')
const request = require('supertest')
const app = require('../app')

let directorId

const BASE_URL ="/api/v1/directors"

const director={
    firstName:"Marco",
    lastName: "Cruz",
    nationality: "ecuador",
    image: "addsdfdf",
    birthday: "2024-02-02"
}

test("POST -> BASE_URL, should return statusCode 201, res.body.firstName === director.firstName",async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(director)

    directorId= res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

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

  test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

  })

  test("PUT -> 'BASE_URL + directorId, should return statusCode 200, res.body.firstName === directorUpdate.firstName",async()=>{
    const directorUpdate = {
        firstName:"Vinicio"
        
        }
        
    const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
  })

  test("DELETE -> 'BASE_URL + directorId, should return statusCode 204",async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)

  })
  


