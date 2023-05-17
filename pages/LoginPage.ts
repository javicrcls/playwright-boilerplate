import { Locator, Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
        this.page = page;
        this.elements = {
            signUpButton: this.page.locator('button[data-qa="sign-up"]')
        };
  }

  async load(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

}