import { expect, APIRequestContext, request } from '@playwright/test';
import { test } from '@fixtures/setupFixture';
import { randEmail, randFullName } from '@ngneat/falso'

let apiContext: APIRequestContext;

 test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    //baseURL: process.env.API_URL,
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
    const users = await apiContext.get('https://gorest.co.in/public/v2/users');
    const body = await users.json();

    expect(users.status()).toBe(200);
    console.log(body[0]);
    expect(body[0]).toHaveProperty('id');
    console.log(body[0].id);
/*     expect(body[0].id).toBe(1741441);
    expect(body[0].email).toContain('shresth_chattopadhyay@gusikowski.example'); */
   });
  
   test('Api flow test', async ( ) => {
    const name = randFullName();
    const email = randEmail();
    const response = await apiContext.post('https://gorest.co.in/public/v2/users', {
      data: {
        'name': name,
        'gender': 'male',
        'email': email,
        'status': 'active'
      },
    });
    expect(response.status()).toBe(201);
    console.log(`Email: ${email} Name: ${name}`);
    
   });

});

