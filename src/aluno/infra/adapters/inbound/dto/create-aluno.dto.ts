import { IsEmail, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export class CreateAlunoDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNumber()
  @Max(currentYear - 16)
  anoNascimento: number;
}