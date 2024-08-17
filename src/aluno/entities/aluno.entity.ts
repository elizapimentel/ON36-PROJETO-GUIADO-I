export class Aluno {
    id: string;
    cursos: string[];

    constructor(public nome: string, public endereco: string, public telefone: string, public email: string) {
        this.cursos = [];
    }
}
