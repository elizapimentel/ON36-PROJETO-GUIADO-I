import { Module } from '@nestjs/common';
import { AlunoService } from '../aluno/services/aluno.service';
import { AlunoController } from '../aluno/controllers/aluno.controller';
import { AlunoRepository } from '../aluno/repositories/aluno.repository';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
})
export class AlunoModule {}
