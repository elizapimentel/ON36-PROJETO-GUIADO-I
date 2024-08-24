import { Aluno } from "../../../domain/aluno";


export interface IAlunoRepository {
    encontrarPorId(alunoId: string): Aluno;
    criar(aluno: Aluno): Aluno;
    salvar(aluno: Aluno): Aluno;
    listar(): Aluno[];
    encontrarPorEmail(email: string): Aluno;
}

export const IAlunoRepository = Symbol('IAlunoRepository'); 