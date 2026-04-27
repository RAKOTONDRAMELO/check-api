import { Expose, Exclude, Transform } from 'class-transformer';
import { Assurance } from '../entities/assurance.entity';

@Exclude()
export class AssuranceResponseDto {
  @Expose()
  id!: number;

  @Expose()
  dateAssurance!: Date;

  @Expose()
  dateProchain!: Date;

  @Expose()
  @Transform(({ obj }: { obj: Assurance }) =>
    obj.assuranceRectoPath
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/assurances/${obj.assuranceRectoPath}`
      : null,
  )
  assuranceRectoUrl!: string | null;

  @Expose()
  @Transform(({ obj }: { obj: Assurance }) =>
    obj.assuranceVersoPath
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/assurances/${obj.assuranceVersoPath}`
      : null,
  )
  assuranceVersoUrl!: string | null;
}
