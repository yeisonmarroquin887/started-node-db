const supertest = require('supertest')
const app = require('../app')
require('../models')

let actorId;
test("POST -> '/api/v1/actors' should return status code 201", async() => {
    const body = {
    firstName: "Jack",
    lastName: "Nicholson",
    nationality: "Usa",
    image: "https://1.bp.blogspot.com/-n68-QCQt0WI/X2Y53miUDAI/AAAAAAAAC14/-r_x7B-OdR8cZkfR1ocUfku5sFTA2X0FQCLcBGAsYHQ/s16000/El.Resplandor.1980.REMASTERED.BDRemux.1080p.Latino.DescargatePelis.com.mkv_snapshot_01.13.50_%255B2020.09.19_09.55.30%255D.jpg",
    birthday: "1953-01-03"
    }

    const res = await supertest(app)
    .post('/api/v1/actors')
    .send(body)
    
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
});

test("GET -> '/api/v1/actors' should return status code 200", async() => {
    const res = await supertest(app)
    .get('/api/v1/actors')
    expect(res.status).toBe(200)
});

test("GET ONE -> '/api/v1/actors/:id' should return status 200", async() => {
    const res = await supertest(app)
    .get(`/api/v1/actors/${actorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Jack")
});

 test("PUT -> '/api/v1/actors/:id' should return status 200 and res.body.firstName === actor.firstName", async() => {
    const body = {
        firstName: "Jack"
        }
    const res = await supertest(app)
    .put(`/api/v1/actors/${actorId}`)
    .send(body)
    expect(res.status).toBe(200)
    expect(res.body[1][0].firstName).toBe(body.firstName)
 });

 test("DELETE -> '/api/v1/actors/:id' should return status code 204", async() => {
    const res = await supertest(app).delete(`/api/v1/actors/${actorId}`)
    console.log(res.body)
    expect(res.status).toBe(204)
 })