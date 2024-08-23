import { IPessoa } from '../../commons/interfaces/pessoa.interface';
import { randomUUID as uuid } from 'crypto';

export class Aluno implements IPessoa {
    id: string;
    cursos: string[];
    
    constructor(
        public nome: string,
        public endereco: string,
        public telefone: string,
        public email: string,
        id?: string
    ) {
        this.id = id ?? uuid();
        this.cursos = [];
    }
}
