import { test, expect } from '@playwright/test';

test('landing page visual check light', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'landing-page-light.png', fullPage: true });
});

test('landing page visual check dark', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'landing-page-dark.png', fullPage: true });
});

test('dashboard visual check dark', async ({ page }) => {
  await page.goto('http://localhost:3000/en/dashboard');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dashboard-dark.png', fullPage: true });
});
