import { expect } from '@playwright/test';
import { test } from '@fixtures/setupFixture';
import { DashboardPage } from '@pages/DashboardPage';


test.describe('Deel UI test suite: ', () => {

  test('Github login and check dashboard', async ({ github }) => {
    const dashboardPage = new DashboardPage(github);
    await expect(dashboardPage.elements.searchBar).toBeVisible();
  });
  
});

