import { Injectable } from "@nestjs/common";
import { Curso } from "../curso";


@Injectable()
export class CursoFactory {
  create(nome: string, professor: string, horarios: string[], vagas: number) {
    return new Curso(nome, professor, horarios, vagas);
  }
}