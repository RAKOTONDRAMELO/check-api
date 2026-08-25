// seed.ts
import { AppDataSource } from 'data-source';
import { seedUsers } from './user.seed';

async function run() {
  await AppDataSource.initialize();

  await seedUsers(AppDataSource);

  await AppDataSource.destroy();

  console.log('Seed terminé');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
