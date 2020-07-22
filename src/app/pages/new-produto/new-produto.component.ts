import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-produto',
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.css'],
})
export class NewProdutoComponent implements OnInit {
  formProduto: FormGroup;

  produtos: ProdutoModel[];

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService
  ) {}

  ngOnInit(): void {
    this.montarForm();
  }

  montarForm() {
    this.formProduto = this.formBuilder.group({
      emissor: ['', Validators.required],
      dataDeEntrega: [''],
      dataConclusao: [''],
      dataDeSaida: [''],
      numeroPedido: ['', Validators.required],
      notaFiscal: ['', Validators.required],
      status: ['', Validators.required],
      setor: ['', Validators.required],
      descricao: [''],
      quantidade: ['', Validators.required],
      responsavelRetirada: [''],
      observacaoDoProduto: [''],
      cliente: ['', Validators.required],
      tipoProduto: ['', Validators.required],
    });
  }

  addProduto() {
    this.serviceProduto.AddProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.formProduto.reset();
        this.msgSucess(res.message)
      },
      (error) => {}
    );
  


  }

  obterProdutos(){
    this.serviceProduto.ObterProdutos().subscribe(
      (result: ProdutoModel[]) => {
        this.produtos = result; 
      },
      (error) => {}
    );
  }


  msgSucess(msg: string){
    Swal.fire(
      msg,
      '',
      'success'
    )
  }
}
