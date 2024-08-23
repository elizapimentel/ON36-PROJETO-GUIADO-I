import { Controller, Get, Post, Body } from '@nestjs/common';
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.alunoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
  //   return this.alunoService.update(+id, updateAlunoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.alunoService.remove(+id);
  // }
}
