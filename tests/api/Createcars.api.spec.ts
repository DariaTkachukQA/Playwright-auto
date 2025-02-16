import { test, expect } from '@playwright/test';
import { credentials } from '../../test-data/states/userData';


test.describe(('Private requests'), () => {
    let globalAuthHeader: string;


    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post('/api/auth/signin', {
            data: {
                "email": credentials.userOne.email,
                "password": credentials.userOne.password,
                "remember": false
            }
        });
        globalAuthHeader = responseAuth.headers()['set-cookie'].split(';')[0];

        expect(globalAuthHeader).toBeDefined();
    })

    test('Get user cars', async ({ request }) => {
        const responseCars = await request.get('/api/cars', {
            headers: {
                'Cookie': globalAuthHeader
            }
        });
        console.log(await responseCars.json());
    });

    test('Create a car successfully', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            },
            headers: {
                'Cookie': globalAuthHeader 
            }
        });
    
        expect(response.status()).toBe(201); 
        const responseBody = await response.json();
        expect(responseBody.status).toBe('ok');
        expect(responseBody.data).toHaveProperty('id'); 
    });
    
    
    test('Fail to create a car without required fields', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {},
            headers: {
                'Cookie': globalAuthHeader 
            } 
        });
    
        expect(response.status()).toBe(400); 
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
    });
    test('Fail to create a car - invalid endpoint', async ({ request }) => {
        const response = await request.post('/api/beds', { 
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            },
            headers: {
                'Cookie': globalAuthHeader 
            }
        });
    
        expect(response.status()).toBe(404);
    
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Not found');
    });
    
});    
