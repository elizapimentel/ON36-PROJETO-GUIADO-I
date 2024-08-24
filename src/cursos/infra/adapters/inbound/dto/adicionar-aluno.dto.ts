import { IsString, IsNotEmpty } from "class-validator";

export class AdicionarAlunoDto {

  @IsString()
  @IsNotEmpty()
  alunoId: string;
}