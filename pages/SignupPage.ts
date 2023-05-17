import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
        this.page = page;
        this.elements = {
            imABusinessButton: this.page.locator('button[data-qa="client"]'),
            nextButton: this.page.locator('text=Next'),
        };
  }

}


