import { expect, APIRequestContext, request } from '@playwright/test';
import { test } from '@fixtures/setupFixture';
import { randEmail, randFullName } from '@ngneat/falso'

let apiContext: APIRequestContext;

 test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: process.env.API_URL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    }, 
  });
})

test.afterAll(async () => {
  await apiContext.dispose();
}); 

test.describe('Deel API test suite: ', () => {

   test('Get users', async () => {
    const users = await apiContext.get('/public/v2/users');
    const body = await users.json();

    expect(users.status()).toBe(200);
    console.log(body[0]);
    expect(body[0]).toHaveProperty('id');
    console.log(body[0].id);
/*     expect(body[0].id).toBe(1741441);
    expect(body[0].email).toContain('shresth_chattopadhyay@gusikowski.example'); */
   });
  
   test('Create user', async ( ) => {
    const name = randFullName();
    const email = randEmail();
    const response = await apiContext.post('/public/v2/users', {
      data: {
        'name': name,
        'gender': 'male',
        'email': email,
        'status': 'active'
      },
    });
    expect(response.status()).toBe(201);
    console.log(` User created: ${name} ${email}  `);
   });

   test('Data Validation: Create a user with invalid email', async () => {
    const name = randFullName();
    const email = 'invalid_email';
    const response = await apiContext.post('https://gorest.co.in/public/v2/users', {
      data: {
        'name': name,
        'gender': 'male',
        'email': email,
        'status': 'active'
      },
    });
    expect(response.status()).toBe(422);
  });

  test('Error Handling: Test non-existent endpoint', async () => {
    const response = await apiContext.get('https://gorest.co.in/nonexistent');
    expect(response.status()).toBe(404);
  });

  test('Data Manipulation: Update a user', async () => {
    const name = randFullName();
    const users = await apiContext.get('https://gorest.co.in/public/v2/users');
    const body = await users.json();
    const userId = body[0].id;
    const response = await apiContext.patch(`https://gorest.co.in/public/v2/users/${userId}`, {
      data: {
        'name': name,
      },
    });
    expect(response.status()).toBe(200);
  });

  test.describe('Update user flow: ', () => {
    const username = randFullName();

     test('Data Manipulation: Update a user', async () => {
      await test.step('Update user', async () => {
        const users = await apiContext.get('https://gorest.co.in/public/v2/users');
        const body = await users.json();
        const userId = body[0].id;
        const response = await apiContext.patch(`https://gorest.co.in/public/v2/users/${userId}`, {
          data: {
            'name': username,
          },
        });
        expect(response.status()).toBe(200);
      });

      await test.step('Check user exists', async () => {
        const users = await apiContext.get('/public/v2/users');
        const body = await users.json();
        expect(users.status()).toBe(200);
        console.log(body[0]);
        expect(body[0].name).toBe(username);
      });

    });

  });

});

