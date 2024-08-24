import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAlunoService } from './IAlunoService';
import { Aluno } from '../../../domain/aluno';
import { IAlunoRepository } from '../output/IAluno.repository';
import { AlunoFactory } from '../../../domain/factories/aluno-factory';
import { CreateAlunoCommand } from '../../commands/create-aluno-command';
import { ICursoRepository } from '../../../../cursos/application/ports/output/ICurso.repository';

@Injectable()
export class AlunoService implements IAlunoService {

  constructor(
    @Inject(IAlunoRepository)
    private readonly repo: IAlunoRepository,
    @Inject(ICursoRepository)
    private readonly cursoRepo: ICursoRepository,
    private readonly alunoFactory: AlunoFactory,
  ) { }

  create(createAlunoCommand: CreateAlunoCommand): Aluno {
    this.validarIdadeMinima(createAlunoCommand);
    this.validarSeJaExiste(createAlunoCommand);

    const novoAluno = this.alunoFactory.create(
      createAlunoCommand.nome,
      createAlunoCommand.endereco,
      createAlunoCommand.email,
      createAlunoCommand.telefone,
    );

    return this.repo.criar(novoAluno);
  }

  private validarSeJaExiste(createAlunoCommand: CreateAlunoCommand) {
    const alunoExistente = this.repo.encontrarPorEmail(
      createAlunoCommand.email,
    );
    if (alunoExistente) {
      throw new ConflictException(
        'Já existe um aluno cadastrado com esse email.',
      );
    }
  }

  private validarIdadeMinima(createAlunoCommand: CreateAlunoCommand) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoCommand.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;
    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 16 anos.');
    }
  }

  getAll() {
    return this.repo.listar();
  }

  getByEmail(email: string): Aluno {
    return this.repo.encontrarPorEmail(email);
  }

  async adicionarCurso(alunoId: string, cursoId: string): Promise<void> {
    const aluno = await this.repo.encontrarPorId(alunoId);
    const curso = await this.cursoRepo.encontrarPorId(cursoId);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    if (aluno.cursos.find(c => c.id === cursoId)) {
      throw new ConflictException('Aluno já está matriculado nesse curso');
    }

    aluno.cursos.push(curso);
    
    curso.alunos.push(aluno);

    await this.repo.salvar(aluno);
    await this.cursoRepo.salvar(curso);
  }


}
