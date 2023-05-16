import { LoginPage } from '@pages/LoginPage';
import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
import * as OTPAuth from "otpauth"

type MyFixtures = {
    github: Page;
    api: Page;
};

export const test = base.extend<MyFixtures>({
  github: async ({ page }, use) => {

      let totp = new OTPAuth.TOTP({
        issuer: "GitHub",
        label: "USERNAME",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: process.env.GIT_SECRET,
      })

      const loginPage = new LoginPage(page);
      await loginPage.load('/login');
      await loginPage.login(process.env.GIT_USER, process.env.GIT_PASSWORD);
      await page.getByPlaceholder("XXXXXX").click()
      await page.getByPlaceholder("XXXXXX").fill(totp.generate())
      await use(page);
    },
  
/*     api: async ({ api }, use) => {

    }, */
  });

export { expect } from '@playwright/test';

