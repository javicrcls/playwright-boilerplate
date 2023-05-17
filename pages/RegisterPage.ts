import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
        this.page = page;
        this.elements = {
            nameInput: this.page.locator('text=First name'),
            lastnameInput: this.page.locator('text=Last name'),
            emailInput: this.page.locator('text=Email address'),
            passwordInput: this.page.locator('text=Password'),
            hearAboutPicker: this.page.locator('div[id="mui-component-select-source"]'),
            submitRegisterButton: this.page.locator('text=Create Your Deel Account')
        };
  }

  async fillForm(
    name: string,
    lastname: string,
    email: string,
    password: string
  ) {
    await this.elements.nameInput.fill(name);
    await this.elements.lastnameInput.fill(lastname);
    await this.elements.emailInput.fill(email);
    await this.elements.passwordInput.fill(password);
    await this.elements.hearAboutPicker.click();
  }

}


