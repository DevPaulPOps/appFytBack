import request from 'supertest';
import app from '../../src/app';
import faker from 'faker';

describe('Users API', () => {
	describe('GET /users', () => {
		it('should return a list of users', async () => {
			const response = await request(app).get('/users');
			expect(response.statusCode).toBe(200);
			expect(Array.isArray(response.body)).toBeTruthy();
		});
	});
});
