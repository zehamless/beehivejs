const request = require('supertest');
const app = require('../app');
const {connectDB, disconnectDB} = require('../config/db');
const User = require('../model/userModel');
const Author = require('../model/authorModel');
const Book = require("../model/bookModel");

describe('Author API', () => {
    let token, authorId;

    beforeAll(async () => {
        await connectDB();
        await Promise.all([
            User.deleteMany({}),
            Author.deleteMany({}),
            Book.deleteMany({})
        ]);

        const userData = {name: 'Test User', email: 'authoruser@example.com', password: 'password123'};
        await request(app).post('/api/register').send(userData);
        const res = await request(app).post('/api/login').send({email: userData.email, password: userData.password});
        token = res.body.token;
    });

    afterAll(async () => {
        await Promise.all([User.deleteMany({}), Author.deleteMany({})]);
        await disconnectDB();
    });

    it('should create a new author', async () => {
        const res = await request(app)
            .post('/api/authors')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'Author One'});
        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe('Author One');
        authorId = res.body.data._id;
    });

    it('should get all authors', async () => {
        const res = await request(app)
            .get('/api/authors')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get an author by id', async () => {
        const res = await request(app)
            .get(`/api/authors/${authorId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBe(authorId);
    });

    it('should update an author', async () => {
        const res = await request(app)
            .put(`/api/authors/${authorId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'Author Updated'});
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe('Author Updated');
    });

    it('should delete an author', async () => {
        const res = await request(app)
            .delete(`/api/authors/${authorId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
    it('should paginate authors', async () => {
        for (let i = 0; i < 12; i++) {
            await request(app)
                .post('/api/authors')
                .set('Authorization', `Bearer ${token}`)
                .send({name: `Author ${i}`});
        }
        const res = await request(app)
            .get('/api/authors?page=2&limit=5')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data.authors || res.body.data)).toBe(true);

        const authors = res.body.data.authors || res.body.data;
        expect(authors.length).toBe(5);

        if (res.body.data.total) {
            expect(res.body.data.total).toBeGreaterThanOrEqual(12);
            expect(res.body.data.page).toBe(2);
            expect(res.body.data.limit).toBe(5);
        }
    });
});