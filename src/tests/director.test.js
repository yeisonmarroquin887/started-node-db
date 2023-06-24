const supertest = require("supertest")
const app = require('../app')
const movies = require('../models/Movie')
require('../models')

let directorId;
test("POST -> 'api/v1/directors' should return status code 201", async() => {
    const body = {
        firstName: "Jack",
        lastName: "Torrance",
        nationality: "Usa",
        image: "https://th.bing.com/th/id/R.44da5bf3afa6eb39a6d6202c7b8d821b?rik=dIPl09MMDCR3lQ&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f20100000%2fJack-Nicholson-jack-nicholson-20161999-1699-2560.jpg&ehk=u7lWn8D67SAr5RYUeHvZNrkF1Z%2bN0yj5w0kKfuyvKr4%3d&risl=&pid=ImgRaw&r=0",
        birthday: "01-02-1947"
    }

    const res = await supertest(app)
    .post('/api/v1/directors')
    .send(body)
    
    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
});

test("GET -> '/api/v1/directors' should return status code 200", async() => {
    const res = await supertest(app)
    .get('/api/v1/directors')
    expect(res.status).toBe(200)
});

test("GET ONE -> '/api/v1/directors/:id' should return status 200", async() => {
    const res = await supertest(app)
    .get(`/api/v1/directors/${directorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Jack")
});

test("PUT -> '/api/v1/directors/:id' should return status 200 and res.body.name = body.name", async() => {
    const body = {
       firstName: "Jack"
    }
    const res = await supertest(app)
    .put(`/api/v1/directors/${directorId}`)
    .send(body)
    expect(res.status).toBe(200)
    expect(res.body[1][0].firstName).toBe(body.firstName)
  });