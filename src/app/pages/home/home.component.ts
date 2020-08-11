import { Component, OnInit } from '@angular/core';
import { SetorModel } from 'src/app/model/setorModel';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';

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
  
  constructor(public serviceProduto: ServiceProdutoService) { }

  ngOnInit(): void {
    this.obterQtdProdutosPorSetor();
  }

  obterQtdProdutosPorSetor(){
    this.serviceProduto.obterQuantidadeDeProdutosPorSetor().subscribe(
      (result: SetorModel[]) => {
        this.setores = result; 
      },
      (error) => {}
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
      }
    );
  }
}
