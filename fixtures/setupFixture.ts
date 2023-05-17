import { LoginPage } from '@pages/LoginPage';
import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

type MyFixtures = {
    deel: Page;
};

export const test = base.extend<MyFixtures>({
  deel: async ({ page }, use) => {

      const loginPage = new LoginPage(page);
      await loginPage.load('/login');
      await loginPage.elements.signUpButton.click();
      await use(page);
    },

  });

export { expect } from '@playwright/test';

