import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CreateCursoCommand } from '../../../../application/commands/create-curso-command';
import { CursoService } from '../../../../application/ports/input/curso.service';
import { CreateCursoDto } from '../dto/create-curso.dto';
import { RegistrarPresencaDto } from '../dto/registrar-presenca.dto';
import { AdicionarAlunoDto } from '../dto/adicionar-aluno.dto';


@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Post()
  cadastrar(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(
      new CreateCursoCommand(
        createCursoDto.nome,
        createCursoDto.professor,
        createCursoDto.horarios,
        createCursoDto.vagas,        
      )
    );
  }

  @Get()
  listar() {
    return this.cursoService.getAll();
  }

  @Post(':id/alunos')
  async adicionarAluno(@Param('id') cursoId: string, @Body() adicionarAlunoDto: AdicionarAlunoDto) {
    return await this.cursoService.adicionarAluno(cursoId, adicionarAlunoDto);
  }

  @Patch(':cursoId/remover-aluno/:alunoId')
  async removerAluno(
    @Param('cursoId') cursoId: string,
    @Param('alunoId') alunoId: string,
  ) {
    await this.cursoService.removerAluno(cursoId, alunoId);
  }

  @Patch(':cursoId/registrar-presenca')
  async registrarPresenca(
    @Param('cursoId') cursoId: string,
    @Body() registrarPresencaDto: RegistrarPresencaDto,
  ) {
    await this.cursoService.registrarPresenca(
      cursoId,
      registrarPresencaDto.data,
      registrarPresencaDto.alunoId,
    );
  }

  @Get(':cursoId/listar-presenca/:data')
  async listarPresencaPorData(
    @Param('cursoId') cursoId: string,
    @Param('data') data: string,
  ) {
    return this.cursoService.listarPresencaPorData(cursoId, data);
  }
 
}
