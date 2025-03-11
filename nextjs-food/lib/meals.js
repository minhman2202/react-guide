import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';
import {Buffer} from 'node:buffer';

const db = sql('meals.db');

export async function getMeals() {
  // adding extra delay to simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions); // sanitize the instructions to avoid XSS attacks

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Failed to write image file to disk.');
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    'INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(
    meal.title,
    meal.summary,
    meal.instructions,
    meal.image,
    meal.creator,
    meal.creator_email,
    meal.slug
  );
}