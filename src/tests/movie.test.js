const supertest = require("supertest")
const app = require('../app')
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
})