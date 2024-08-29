export class CreateCursoCommand {
  constructor(
    public readonly nome: string,
    public readonly professor: string,
    public readonly horarios: string[],
    public readonly vagas: number,
  ) {}
}