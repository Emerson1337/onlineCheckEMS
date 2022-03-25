import { app } from '../../../app';
import request from "supertest";

describe('Category controller', () => {
    it('Should test a category creation', async () => {
        const response = await request(app).post(`/test/api/create-tag-food`)
        .set({ Authorization: `Bearer ${process.env.TOKEN_LOGIN}`})
        .set('Accept', 'application/json')
        .send({
            "name": "Combo de arroz com feijão",
            "enterpriseId": "13cba0a8-9c07-4955-af1a-3a4ad5ec3c17",
        });
        console.log(response.text);
        expect(response.statusCode).toBe(200);
    })
})