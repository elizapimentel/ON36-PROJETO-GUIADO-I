import { AdicionarAlunoDto } from "src/cursos/infra/adapters/inbound/dto/adicionar-aluno.dto";
import { Curso } from "../../../domain/curso";
import { CreateCursoCommand } from "../../commands/create-curso-command";


export interface ICursoService {
    create(createCursoCommand: CreateCursoCommand): Curso;
    getAll(): Curso[];
    adicionarAluno(cursoId: string, aluno: AdicionarAlunoDto): Promise<void>;
    removerAluno(cursoId: string, alunoId: string): Promise<void>;
    registrarPresenca(cursoId: string, data: string, alunoId: string): Promise<void>;
    listarPresencaPorData(cursoId: string, data: string): Promise<string[] | undefined>

}