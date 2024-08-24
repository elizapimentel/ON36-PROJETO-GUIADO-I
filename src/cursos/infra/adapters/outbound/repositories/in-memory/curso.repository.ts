import { Injectable } from '@nestjs/common';
import { randomUUID as uuid } from 'crypto';
import { Curso } from '../../../../../domain/curso';
import { ICursoRepository } from '../../../../../application/ports/output/ICurso.repository';


@Injectable()
export class CursoRepositoryInMemory implements ICursoRepository {
    private cursos: Curso[] = [];

    constructor() { }

    criar(curso: Curso): Curso {
        curso.id = uuid();
        this.cursos.push(curso);
        return curso;
    }

    salvar(curso: Curso): Curso {
        this.cursos.map((a) =>
            a.id === curso.id ? curso : a,
        );
        return curso;
    }

    listar(): Curso[] {
        return this.cursos;
    }

    encontrarPorId(id: string): Curso {
        return this.cursos.find((a) => a.id === id);
    }


}
