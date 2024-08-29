import { Curso } from "../../../domain/curso";


export interface ICursoRepository {
    criar(curso: Curso): Curso;
    salvar(curso: Curso): Curso;
    listar(): Curso[];
    encontrarPorId(id: string): Curso;
 
}

export const ICursoRepository = Symbol('ICursoRepository'); 