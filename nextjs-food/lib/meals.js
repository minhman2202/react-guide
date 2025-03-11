import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // adding extra delay to simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}