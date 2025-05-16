const request = require('supertest');
const app = require('../app');
const {connectDB, disconnectDB} = require('../config/db');
const User = require('../model/userModel');
const Author = require('../model/authorModel');
const Book = require('../model/bookModel');

describe('Book API', () => {
    let token, authorId, bookId;

    beforeAll(async () => {
        await connectDB();
        await Promise.all([User.deleteMany({}), Author.deleteMany({}), Book.deleteMany({})]);

        const userData = {name: 'Book User', email: 'bookuser@example.com', password: 'password123'};
        await request(app).post('/api/register').send(userData);
        const res = await request(app).post('/api/login').send({email: userData.email, password: userData.password});
        token = res.body.token;

        const authorRes = await request(app)
            .post('/api/authors')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'Book Author'});
        authorId = authorRes.body.data._id;
    });

    afterAll(async () => {
        await Promise.all([User.deleteMany({}), Author.deleteMany({}), Book.deleteMany({})]);
        await disconnectDB();
    });

    it('should create a new book', async () => {
        const res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({title: 'Book One', year: 2020, authorId});
        expect(res.statusCode).toBe(201);
        expect(res.body.data.title).toBe('Book One');
        bookId = res.body.data._id;
    });

    it('should get all books', async () => {
        const res = await request(app)
            .get('/api/books')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get a book by id', async () => {
        const res = await request(app)
            .get(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBe(bookId);
    });

    it('should update a book', async () => {
        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({title: 'Book Updated'});
        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe('Book Updated');
    });

    it('should delete a book', async () => {
        const res = await request(app)
            .delete(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });

    it('should paginate books', async () => {
        // Create 12 books
        await Promise.all(
            Array.from({length: 12}, (_, i) =>
                request(app)
                    .post('/api/books')
                    .set('Authorization', `Bearer ${token}`)
                    .send({title: `Book ${i}`, year: 2000 + i, authorId})
            )
        );
        // Request page 2, limit 5
        const res = await request(app)
            .get('/api/books?page=2&limit=5')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        const books = res.body.data.books || res.body.data;
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBe(5);
        const {total, page, limit} = res.body.data;
        if (total) {
            expect(total).toBeGreaterThanOrEqual(12);
            expect(page).toBe(2);
            expect(limit).toBe(5);
        }
    });
    it('should failed validation', async () => {
        const res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({title: 'Book One', year: 'book'});
        console.log(res.body.error);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/year.*number/i);
    });
});