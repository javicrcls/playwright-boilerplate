import { expect } from '@playwright/test';
import { test } from '@fixtures/setupFixture';
import { RegisterPage } from '@pages/RegisterPage';
import { SignupPage } from '@pages/SignupPage';
import { randEmail } from '@ngneat/falso';

test.describe('Deel UI test suite: ', () => {

  test('User register', async ({ deel }) => {
    const signupPage = new SignupPage(deel);
    const registerPage = new RegisterPage(deel);
    const testEmail = randEmail();

    await expect(signupPage.elements.nextButton).toBeVisible();
    await signupPage.elements.imABusinessButton.click();
    await signupPage.elements.nextButton.click();

    await registerPage.fillForm('test', 'testlastname', testEmail, '3Deeltest.');
    await deel.locator('li', { hasText: 'Facebook'}).click();

    await registerPage.elements.submitRegisterButton.click();
    await deel.locator('h1',  { hasText: 'Your organization details'}).isVisible();
  });
  
});

