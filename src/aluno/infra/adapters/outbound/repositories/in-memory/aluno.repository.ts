import { Injectable } from '@nestjs/common';
import { IAlunoRepository } from '../../../../../application/ports/output/IAluno.repository';
import { Aluno } from '../../../../../domain/aluno';
import { randomUUID as uuid } from 'crypto';


@Injectable()
export class AlunoRepositoryInMemory implements IAlunoRepository {
    private alunos: Aluno[] = [];

    constructor() { }

    criar(aluno: Aluno): Aluno {
        aluno.id = uuid();
        this.alunos.push(aluno);
        return aluno;
    }

    salvar(aluno: Aluno): Aluno {
        this.alunos.map((a) =>
            a.id === aluno.id ? aluno : a,
        );
        return aluno;
    }

    listar(): Aluno[] {
        return this.alunos;
    }

    encontrarPorEmail(email: string): Aluno {
        return this.alunos.find(aluno => aluno.email === email);
    }

    encontrarPorId(alunoId: string): Aluno {
        return this.alunos.find(aluno => aluno.id === alunoId);
    }

}
