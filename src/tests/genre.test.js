const supertest = require("supertest")
const app = require("../app")
require('../models')

let genreId;
test("POST -> '/api/v1/genres' should return status code 201", async() => {
    const body = {
        name: "Drama"
    }

    const res = await supertest(app)
    .post('/api/v1/genres')
    .send(body)
    
    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
});

test("GET -> '/api/v1/genres' should return status code 200", async() => {
    const res = await supertest(app)
    .get('/api/v1/genres')
    expect(res.status).toBe(200)
});

test("GET ONE -> '/api/v1/genres/:id' should return status 200", async() => {
    const res = await supertest(app)
    .get(`/api/v1/genres/${genreId}`)
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Drama")
});

test("PUT -> '/api/v1/genres/:id' should return status 200 and res.body.name === body.name", async() => {
    const body = {
        name: "Drama"
    }

    const res = await supertest(app)
    .put(`/api/v1/genres/${genreId}`)
    .send(body)
    
    expect(res.status).toBe(200)
    expect(res.body[1][0].name).toBe(body.name)
})