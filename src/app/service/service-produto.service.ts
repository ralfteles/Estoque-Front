import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceProdutoService {

  private urlApi = "https://localhost:5001/api/";
  
  private header = new HttpHeaders();
  constructor(public http: HttpClient) { }

  ObterProdutosPorSetor(setor) {
    return this.http.get(`${this.urlApi}Produto/ObterProdutosPorSetor?setorId=${setor}`);
  }

  AddProduto(obj) {
    return this.http.post(`${this.urlApi}Produto/AdicionarProduto`, obj);
  }

  obterQuantidadeDeProdutosPorSetor() {
    return this.http.get(`${this.urlApi}Produto/ObterQuantidadePorSetor`);
  }
}
