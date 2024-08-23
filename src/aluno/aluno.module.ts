import { Module } from '@nestjs/common';
import { AlunoController } from './infra/adapters/inbound/controllers/aluno.controller';
import { AlunoRepositoryInMemory } from './infra/adapters/outbound/repositories/in-memory/aluno.repository';
import { AlunoService } from './application/ports/input/aluno.service';
import { IAlunoRepository } from './application/ports/output/IAluno.repository';
import { AlunoFactory } from './domain/factories/aluno-factory';


@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoFactory,
  
  {
    provide: IAlunoRepository,
    useClass: AlunoRepositoryInMemory}
    ],
})
export class AlunoModule { }
