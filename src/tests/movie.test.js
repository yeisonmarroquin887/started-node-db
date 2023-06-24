const supertest = require("supertest")
const app = require('../app');
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require('../models')

let movieId;
test("POST -> '/api/v1/movies' should return code 201", async() => {
    const body = {
        name: "Super Dragon Ball Heroes",
        image: "https://th.bing.com/th/id/OIP.wbNsM8vD0q-FE3nJgkfZrgHaKr?pid=ImgDet&w=480&h=692&rs=1",
        synopsis: "Goku y Vegeta se enteran que Trunks está prisionero en el Prisión Planetaria. Por lo tanto, los dos personajes acuden a dicho planeta para salvar a Trunks.",
        releaseYear: 2018
    }
    const res = await supertest(app)
        .post('/api/v1/movies')
        .send(body)
        
        movieId = res.body.id
        expect(res.status).toBe(201)
        expect(res.body.name).toBe(body.name)
});

test("GET -> '/api/v1/movies' should return status code 200", async() => {
    const res = await supertest(app).get('/api/v1/movies')
    expect(res.status).toBe(200)
});

test("GET ONE -> '/api/v1/movies/:id' should return status 200", async() => {
    const res = await supertest(app)
    .get(`/api/v1/movies/${movieId}`)
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Super Dragon Ball Heroes")
});

test("PUT -> '/api/v1/movies/:id' should return status 200 and res.body.name === body.name", async() => {
    const body = {
        name: "Super Dragon Ball Heroes"
    }

    const res = await supertest(app) 
    .put(`/api/v1/movies/${movieId}`)
    .send(body)

    expect(res.status).toBe(200)
    expect(res.body[1][0].name).toBe(body.name)
});

test("POST -> '/api/v1/movies/:id/actors' set actors movies, should return status code 200 and res.body.length = 1", async() => {
        const body = {
        firstName: "Jack",
        lastName: "Nicholson",
        nationality: "Usa",
        image: "https://1.bp.blogspot.com/-n68-QCQt0WI/X2Y53miUDAI/AAAAAAAAC14/-r_x7B-OdR8cZkfR1ocUfku5sFTA2X0FQCLcBGAsYHQ/s16000/El.Resplandor.1980.REMASTERED.BDRemux.1080p.Latino.DescargatePelis.com.mkv_snapshot_01.13.50_%255B2020.09.19_09.55.30%255D.jpg",
        birthday: "1953-01-03"
        }

        const actors = await Actor.create(body)
        const res = await supertest(app)
        .post(`/api/v1/movies/${movieId}/actors`)
        .send([actors.id])
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
        actors.destroy()
});

test("POST -> '/api/v1/movies/:id/directors' set directors movies, should return status code 200 add res.body.length = 1", async() => {
    const body = {
        firstName: "Jack",
        lastName: "Torrance",
        nationality: "Usa",
        image: "https://th.bing.com/th/id/R.44da5bf3afa6eb39a6d6202c7b8d821b?rik=dIPl09MMDCR3lQ&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f20100000%2fJack-Nicholson-jack-nicholson-20161999-1699-2560.jpg&ehk=u7lWn8D67SAr5RYUeHvZNrkF1Z%2bN0yj5w0kKfuyvKr4%3d&risl=&pid=ImgRaw&r=0",
        birthday: "01-02-1947"
    }
    const directors = await Director.create(body)
    const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/directors`)
    .send([directors.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    directors.destroy()
});

test("POST -> '/api/v1/movies/:id/genres' set genres movies, should return status code 200 and res.body.length = 1", async() => {
    const body = {
        name: "Drama"
    }

    const genres = await Genre.create(body)
    const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/genres`)
    .send([genres.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    genres.destroy()
})

test("DELETE -> '/api/v1/movies/:id' should return status code 204", async() => {
    const res = await supertest(app).delete(`/api/v1/movies/${movieId}`)
    
    expect(res.status).toBe(204)
 })