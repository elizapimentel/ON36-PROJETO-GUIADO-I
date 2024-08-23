import { ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAlunoService } from './Ialuno.service';
import { Aluno } from '../../../domain/aluno';
import { IAlunoRepository } from '../output/IAluno.repository';
import { AlunoFactory } from '../../../domain/factories/aluno-factory';
import { CreateAlunoCommand } from '../../commands/create-aluno-command';

@Injectable()
export class AlunoService implements IAlunoService {

  constructor(
    @Inject(IAlunoRepository)
    private readonly repo: IAlunoRepository,
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

  getByEmail(email:string): Aluno {
    return this.repo.encontrarPorEmail(email);
  }



  // findOne(id: number) {
  //   return `This action returns a #${id} aluno`;
  // }

  // update(id: number, updateAlunoDto: UpdateAlunoDto) {
  //   return `This action updates a #${id} aluno`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} aluno`;
  // }
}
