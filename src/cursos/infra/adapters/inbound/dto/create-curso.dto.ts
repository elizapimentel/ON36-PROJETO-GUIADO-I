import { IsNumber, IsString, Max } from 'class-validator';


export class CreateCursoDto {
  @IsString()
  nome: string;

  @IsString()
  professor: string;

  @IsString({ each: true })
  horarios: string[];

  @IsNumber()
  @Max(30)
  vagas: number;

}