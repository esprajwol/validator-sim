const request = require("supertest");
const app = require("./server");

describe("POST /verify", () => {
    it("should return success for valid codes", async () => {
        const res = await request(app).post("/verify").send({ code: "123456" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });
    });

    it("should return error for codes not 6 digits", async () => {
        const res = await request(app).post("/verify").send({ code: "12345" });
        expect(res.statusCode).toBe(400);
    });

    it("should return error for codes ending in 7", async () => {
        const res = await request(app).post("/verify").send({ code: "123457" });
        expect(res.statusCode).toBe(400);
    });
});
