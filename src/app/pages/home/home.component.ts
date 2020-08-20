import { Component, OnInit } from '@angular/core';
import { SetorModel } from 'src/app/model/setorModel';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { UsuarioModel } from 'src/app/model/usuarioModel';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  setores: SetorModel[];
  produtos: ProdutoModel[] = [];
  setor: String = "";
  loading: boolean = false;
  nome: string;
  
  constructor(
    public serviceProduto: ServiceProdutoService,
    public storage: StorageService,
    public router: Router) { }

  ngOnInit(): void {
    this.obterQtdProdutosPorSetor();
 
    let storage = this.storage.getItem('usuario');
    this.nome = storage.userToken.nome;

  }

  obterQtdProdutosPorSetor(){
    this.serviceProduto.obterQuantidadeDeProdutosPorSetor().subscribe(
      (result: SetorModel[]) => {
        this.setores = result; 
      },
      (error) => {
        if(error.status == 401){
          this.router.navigate(['']);
        }
      }
    );
  }

  obterProdutosPorSetor(setor){
    this.loading = true;
    this.setor = '';
    this.produtos = [];

    this.serviceProduto.ObterProdutosPorSetor(setor.idSetor).subscribe(
      (result: ProdutoModel[]) => {
        this.setor = setor.nomeSetor;
        this.produtos = result; 
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        if(error.status == 401){
          this.router.navigate(['']);
        }
      }
    );
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['']);
  }
}
