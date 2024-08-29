import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './application/ports/input/curso.service';
import { CursoFactory } from './domain/factories/curso-factory';
import { CursoController } from './infra/adapters/inbound/controllers/curso.controller';
import { CursoRepositoryInMemory } from './infra/adapters/outbound/repositories/in-memory/curso.repository';
import { ICursoRepository } from './application/ports/output/ICurso.repository';
import { AlunoModule } from '../aluno/aluno.module';


@Module({
  controllers: [CursoController],
  providers: [
    CursoService,
    CursoFactory,

    {
      provide: ICursoRepository,
      useClass: CursoRepositoryInMemory
    }
  ],

  imports: [forwardRef(() => AlunoModule)],
  exports: [ICursoRepository],
})
export class CursoModule { }
