import * as jest from "ts-jest";
import request from "supertest";
import { app } from '../../../app';

describe('Food controller', () => {
    it('List all foods', async () => {
        let enterprise = "brotherlanches";
        const response = await request(app).get(`/api/test`);

        expect(response.statusCode).toEqual(200);
    })
})