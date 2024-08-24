import { randomUUID as uuid } from 'crypto';
import { Aluno } from '../../aluno/domain/aluno';

export class Curso {
    id: string;
    nome: string;
    professor: string;
    horarios: string[];
    vagas: number;
    listaPresenca: Map<string, string[]>;
    alunos?: Aluno[];

    constructor(
        nome: string,
        professor: string,
        horarios: string[],
        vagas: number,
    ) {
        this.id = uuid();
        this.nome = nome;
        this.professor = professor;
        this.horarios = horarios;
        this.vagas = vagas;
        this.alunos = [];
        this.listaPresenca = new Map();
    }
    
}
