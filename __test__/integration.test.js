/**
 * @jest-environment node
 */
require('dotenv').config();
const request = require('supertest');
const app = require('../index.js');

token = process.env.token

// test of the administrators route
describe('POST/administrators/cadastro', () => {
    it ("should return 201 to register administrator", async() => {
        const response = await request(app)
        .post('/administrators/cadastro')
        .send({ email: "teste@gmail.com", senha: "123mudar" })

    expect(response.status).toBe(201)
    })
})

describe('POST/administrators/login', () => {
    it ('should return 200 to login user', async() => {
        const response = await request(app)
        .post('/administrators/login')
        .send({ email: "teste@gmail.com", senha: "123mudar" })

    expect(response.status).toBe(200)
    })
})

// test of the users route
describe('GET/users', () => {
    it ('should return 200 to listen the users', async () => {
        const response = await request(app)
        .get('/users')

    expect(response.status).toBe(200)
    });
});

describe('GET/users/:id', () => {
    it ('should return 200 to listen an user', async () => {
        const response = await request(app)
        .get('/users/29')

    expect(response.status).toBe(200)
    });
});

describe('POST/users', () => {
    it ('should return 201 to create an user', async () => {
        const response = await request(app)
        .post('/users')
        .send({ "name": "João", "email": "joao1@hotmail.com"})

    expect(response.status).toBe(201)
    });
});

describe('PUT/users/:id', () => {
    it ('should return 200 to change an user', async () => {
        const response = await request(app)
        .put('/users/29')
        .send({ "name": "João", "email": "joao20@hotmail.com"})

    expect(response.status).toBe(200)
    });
});

describe('DELETE/users/:id', () => {
    it ('should return 200 to delete an user', async () => {
        const response = await request(app)
        .delete('/users/34')

    expect(response.status).toBe(200)
    });
});