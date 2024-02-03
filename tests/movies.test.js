const request = require("supertest");
const app = require("../app");

describe("GET /api/movies", () => {
    it("should return all movies", async () => {
    /** Code your test here */
    const response = await request(app).get("/api/movies");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
});
  });

  describe("GET /api/movies/:id", () => {
    it("should return the movies by its respective id", async () => {
        const movieId = 1;
        const response = await request(app).get(`/api/movies/${movieId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
    
    });
  });

describe("GET /api/movies/:id", () => {
    it("Error 404 Not Found", async () => {
        const movieId = 0;
        const response = await request(app).get(`/api/movies/${movieId}`);
        expect(response.status).toEqual(404); // Expecting a 404 status code
    });
});

