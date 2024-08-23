import { Module } from '@nestjs/common';
import { IAlunoRepository } from '../../../../../application/ports/output/IAluno.repository';
import { AlunoRepositoryInMemory } from './aluno.repository';


@Module({
  imports: [],
  providers: [
    {
      provide: IAlunoRepository,
      useClass: AlunoRepositoryInMemory, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
  ],
  exports: [IAlunoRepository],
})
export class InFileAlunoPersistenceModule {}