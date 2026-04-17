import { test, expect } from '@playwright/test';

test.describe('Création de tâche', () => {
  // Avant chaque test, on simule la connexion de l'utilisateur
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('jane.doe@test.com');
    await page.getByLabel('Mot de passe').fill('password123');
    await page.getByRole('button').click();

    // await page.goto('/');
    // await page.evaluate(() => {
    //   const user = { name: 'Doe', firstName: 'Jane', email: 'jane.doe@test.com' };
    //   localStorage.setItem('user', JSON.stringify(user));
    // });
    // await page.goto('/dashboard');
  });

  test('doit créer une nouvelle tâche et l\'afficher dans la colonne "À faire"', async ({
    page,
  }) => {
    const nouvelleTache = `Tester l'application E2E - ${Date.now()}`;
    await page.locator('button:has-text("Créer une Tâche")').click();
    await expect(page.locator('app-task-form h3')).toHaveText('Nouvelle tâche');

    await page.locator('#title').fill(nouvelleTache);
    await page.locator('app-task-form button:has-text("Enregistrer")').click();
    const todoColumn = page.locator('section').filter({ hasText: 'À faire' });
    await expect(todoColumn).toContainText(nouvelleTache);
  });
});
