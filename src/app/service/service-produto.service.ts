import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceProdutoService {
  private urlApi = 'https://localhost:5001/api/';

  private header = new HttpHeaders();
  constructor(public http: HttpClient, public storage: StorageService) {}

  ObterProdutosPorSetor(setor) {
    return this.http.get(
      `${environment.urlApi}Produto/ObterProdutosPorSetor?setorId=${setor}`,
      { headers: this.storage.getToken() }
    );
  }

  AddProduto(obj) {
    return this.http.post(`${environment.urlApi}Produto/AdicionarProduto`, obj,
    { headers: this.storage.getToken() });
  }

  obterQuantidadeDeProdutosPorSetor() {
    return this.http.get(
      `${environment.urlApi}Produto/ObterQuantidadePorSetor`,
      { headers: this.storage.getToken() }
    );
  }
}
