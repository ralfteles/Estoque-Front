import { Component, OnInit } from '@angular/core';
import { SetorModel } from 'src/app/model/setorModel';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  setores: SetorModel[];
  
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

}
