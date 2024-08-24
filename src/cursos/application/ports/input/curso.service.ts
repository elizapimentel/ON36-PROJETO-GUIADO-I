import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICursoService } from './ICursoService';
import { ICursoRepository } from '../output/ICurso.repository';
import { Curso } from '../../../domain/curso';
import { CursoFactory } from '../../../domain/factories/curso-factory';
import { CreateCursoCommand } from '../../commands/create-curso-command';
import { AdicionarAlunoDto } from '../../../infra/adapters/inbound/dto/adicionar-aluno.dto';
import { IAlunoRepository } from '../../../../aluno/application/ports/output/IAluno.repository';


@Injectable()
export class CursoService implements ICursoService {

  constructor(
    @Inject(ICursoRepository)
    private readonly repo: ICursoRepository,
    @Inject(IAlunoRepository)
    private readonly alunoRepo: IAlunoRepository,
    private readonly cursoFactory: CursoFactory,
  ) { }

  create(createCursoCommand: CreateCursoCommand): Curso {
    const novoCurso = this.cursoFactory.create(
      createCursoCommand.nome,
      createCursoCommand.professor,
      createCursoCommand.horarios,
      createCursoCommand.vagas,
    );
    return this.repo.criar(novoCurso);
  }

  getAll(): Curso[] {
    return this.repo.listar();
  }

  async adicionarAluno(cursoId: string, alunoDto: AdicionarAlunoDto): Promise<void> {
    const curso = await this.repo.encontrarPorId(cursoId);
    const aluno = await this.alunoRepo.encontrarPorId(alunoDto.alunoId);
    

    if (!curso) {
      throw new Error('Curso não encontrado.');
    }

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    if (curso.alunos.length >= curso.vagas) {
      throw new Error('Não há vagas disponíveis neste curso.');
    }

    if (curso.alunos.find(a => a.id === aluno.id)) {
      throw new ConflictException('Aluno já está matriculado nesse curso');
    }

    curso.alunos.push(aluno);
    aluno.cursos.push(curso);

    await this.repo.salvar(curso);
    await this.alunoRepo.salvar(aluno);
  }

  async removerAluno(cursoId: string, alunoId: string): Promise<void> {
    const curso = this.repo.encontrarPorId(cursoId);

    if (!curso) {
      throw new Error('Curso não encontrado.');
    }

    curso.alunos = curso.alunos.filter(aluno => aluno.id !== alunoId);
    this.repo.salvar(curso);
  }

  async registrarPresenca(cursoId: string, data: string, alunoId: string): Promise<void> {
    const curso = this.repo.encontrarPorId(cursoId);

    if (!curso) {
      throw new Error('Curso não encontrado.');
    }

    if (!curso.alunos.find(aluno => aluno.id === alunoId)) {
      throw new Error('Aluno não matriculado no curso.');
    }

    if (!curso.listaPresenca.has(data)) {
      curso.listaPresenca.set(data, []);
    }

    const presenca = curso.listaPresenca.get(data);
    presenca.push(alunoId);
    this.repo.salvar(curso);
  }

  async listarPresencaPorData(cursoId: string, data: string): Promise<string[] | undefined> {
    const curso = this.repo.encontrarPorId(cursoId);

    if (!curso) {
      throw new Error('Curso não encontrado.');
    }

    return curso.listaPresenca.get(data);
  }



}
