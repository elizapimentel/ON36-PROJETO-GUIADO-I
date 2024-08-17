import { Injectable } from '@nestjs/common';
import { Aluno } from '../entities/aluno.entity';
import { randomUUID as uuid } from 'crypto';

@Injectable()
export class AlunoRepository {
    aluno: Aluno[] = [];

    salvar(aluno: Aluno): Aluno {
        aluno.id = uuid();
        this.aluno.push(aluno);
        return aluno;
    }

    encontrarPorEmail(email: string): Aluno {
        return this.aluno.find(aluno => aluno.email === email);
    }

}