import { Injectable } from "@nestjs/common";
import { randomUUID as uuid } from "crypto";
import { Aluno } from "../aluno";

@Injectable()
export class AlunoFactory {
  create(nome: string, endereco: string, email: string, telefone: string) {
    return new Aluno(nome, endereco,telefone,  email);
  }
}