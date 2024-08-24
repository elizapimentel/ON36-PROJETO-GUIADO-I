import { Aluno } from "../../../domain/aluno";
import { CreateAlunoCommand } from "../../commands/create-aluno-command";


export interface IAlunoService {
    create(reateAlunoCommand: CreateAlunoCommand): Aluno;
    getAll(): Aluno[];
    getByEmail(email: string): Aluno;
    adicionarCurso(alunoId: string, cursoId: string): Promise<void> ;
    
}