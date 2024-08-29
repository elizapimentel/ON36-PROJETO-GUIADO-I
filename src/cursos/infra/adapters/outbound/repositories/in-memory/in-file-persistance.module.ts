import { Module } from '@nestjs/common';
import { ICursoRepository } from '../../../../../../cursos/application/ports/output/ICurso.repository';
import { CursoRepositoryInMemory } from './curso.repository';



@Module({
  imports: [],
  providers: [
    {
      provide: ICursoRepository,
      useClass: CursoRepositoryInMemory,
    },
  ],
  exports: [ICursoRepository],
})
export class InFileAlunoPersistenceModule {}