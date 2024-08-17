import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';
import { Aluno } from '../entities/aluno.entity';
import { AlunoRepository } from '../repositories/aluno.repository';

@Injectable()
export class AlunoService {

  constructor(private readonly repo: AlunoRepository) { }

  create(createAlunoDto: CreateAlunoDto): Aluno {
    const novoAluno = new Aluno(createAlunoDto.nome, createAlunoDto.endereco, createAlunoDto.telefone, createAlunoDto.email);
    //verificar se o aluno existe no sistema (email)
    const alunoExistente = this.repo.encontrarPorEmail(novoAluno.email);
    if (alunoExistente) {
      throw new Error('Aluno já cadastrado');
    }
    return this.repo.salvar(novoAluno);
  }

  // findAll() {
  //   return `This action returns all aluno`;
  // }

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
