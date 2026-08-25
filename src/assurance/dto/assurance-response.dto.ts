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
    obj.frontPicture
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/assurances/${obj.frontPicture}`
      : null,
  )
  assuranceRectoUrl!: string | null;

  @Expose()
  @Transform(({ obj }: { obj: Assurance }) =>
    obj.backPicture
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/assurances/${obj.backPicture}`
      : null,
  )
  assuranceVersoUrl!: string | null;
}
