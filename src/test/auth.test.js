const request = require('supertest');
const app = require('../app');
const {connectDB, disconnectDB} = require('../config/db');
const User = require('../model/userModel');

describe('Auth API', () => {
    beforeAll(async () => {
        await connectDB();
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
        await disconnectDB();
    });

    const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send(userData);
        console.log(res.json)
        expect(res.statusCode).toBe(201);
        expect(res.body.data.email).toBe(userData.email);
    });

    it('should not register an existing user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send(userData);
        expect(res.statusCode).toBe(409);
    });

    it('should login with correct credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({email: userData.email, password: userData.password});
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should not login with wrong password', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({email: userData.email, password: 'wrongpassword'});
        expect(res.statusCode).toBe(401);
    });

    it('should not login with non-existent user', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({email: 'nouser@example.com', password: 'password123'});
        expect(res.statusCode).toBe(404);
    });
    it('should unauthorized without token', async () => {
        const res = await request(app)
            .get('/api/authors');
        expect(res.statusCode).toBe(401);
    });
    it('should unauthorized with fake token', async () => {
        const res = await request(app)
            .get('/api/authors')
            .set('Authorization', `Bearer fakeToken`);
        expect(res.statusCode).toBe(401);
    });
});