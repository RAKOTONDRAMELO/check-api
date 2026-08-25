// user.seed.ts
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from 'src/users/enum';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
  const repository = dataSource.getRepository(User);

  const count = await repository.count();

  if (count === 0) {
    const hashedPassword = await bcrypt.hash('admin123.Com', 10);
    await repository.save([
      {
        name: 'Admin',
        firstName: 'Admin',
        birthday: new Date('1990-01-01'),
        email: 'admin@test.com',
        password: hashedPassword,
        adress: '123 Main St',
        role: UserRole.ADMIN,
        contact: '1234567890',
      },
    ]);

    console.log('Users seeded');
  }
}
