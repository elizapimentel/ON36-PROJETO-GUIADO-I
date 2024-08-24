import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AlunoService } from '../../../../application/ports/input/aluno.service';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { CreateAlunoCommand } from '../../../../application/commands/create-aluno-command';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post()
  cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(
      new CreateAlunoCommand(
        createAlunoDto.nome,
        createAlunoDto.endereco,
        createAlunoDto.telefone,
        createAlunoDto.email,
        createAlunoDto.anoNascimento
      )
    );
  }

  @Get()
  listar() {
    return this.alunoService.getAll();
  }

   @Post(':id/cursos/:cursoId')
  async adicionarCurso(@Param('id') alunoId: string, @Param('cursoId') cursoId: string) {
    return this.alunoService.adicionarCurso(alunoId, cursoId);
  }
}
