/**
 * @jest-environment node
 */
require('dotenv').config();
const request = require('supertest');
const app = require('../index.js');
const truncate = require('./utils/truncate.js');

token = process.env.token

beforeAll(async () => {
    await truncate();
})

// test of the administrators route
describe('POST/administrators/cadastro', () => {
    it ("should return 201 to register administrator", async() => {
        const response = await request(app)
        .post('/administrators/cadastro')
        .send({ email: "teste1@gmail.com", senha: "123mudar" })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('admCriado');
    })
})

describe('POST/administrators/login', () => {
    it ('should return 200 to login user', async() => {
        const response = await request(app)
        .post('/administrators/login')
        .send({ email: "teste1@gmail.com", senha: "123mudar" })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    })
})

describe('PUT/administrators', () => {
    it ('should return 200 to change user', async() => {
        const response = await request(app)
        .put('/administrators/2')
        .send({ email: "teste2@gmail.com", senha: "123mudar" })
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    })
})

describe('DELETE/administrators', () => {
    it ('should return 200 to delete user', async() => {
        const response = await request(app)
        .delete('/administrators/1')
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    })
})


// test of the users route

describe('POST/users', () => {
    it ('should return 201 to create an user', async () => {
        const response = await request(app)
        .post('/users')
        .send({ "name": "Marciel", "email": "joao1@hotmail.com"})
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    });
});

describe('PUT/users/:id', () => {
    it ('should return 200 to change an user', async () => {
        const response = await request(app)
        .put('/users/1')
        .send({ "name": "Marcos", "email": "marquinho@hotmail.com"})
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    });
});

describe('GET/users', () => {
    it ('should return 200 to listen the users', async () => {
        const response = await request(app)
        .get('/users')
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    });
});

describe('GET/users/:id', () => {
    it ('should return 200 to listen an user', async () => {
        const response = await request(app)
        .get('/users/1')
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    });
});


describe('DELETE/users/:id', () => {
    it ('should return 200 to delete an user', async () => {
        const response = await request(app)
        .delete('/users/1')
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    });
});