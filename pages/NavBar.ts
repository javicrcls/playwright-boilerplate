import { Locator, Page } from '@playwright/test';

export abstract class NavBar {
  readonly page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
        data: this.page.locator('a[data-cy="nav-schema"]'),
        records: this.page.locator('a[data-cy="nav-records"]'),
        pages: this.page.locator('a[data-cy="nav-pages"]'),
        settings: this.page.locator('a[data-cy="nav-settings"]')
    };
  }
}