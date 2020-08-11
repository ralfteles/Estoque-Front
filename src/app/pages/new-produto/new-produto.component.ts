import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import Swal from 'sweetalert2';
import { SetorModel } from 'src/app/model/setorModel';

@Component({
  selector: 'app-new-produto',
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.css'],
})
export class NewProdutoComponent implements OnInit {
  formProduto: FormGroup;

  produtos: ProdutoModel[];
  salvando: boolean = false;

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
      dataDeEntrada: [null, Validators.required],
      dataConclusao: [null],
      dataDeSaida: [null],
      numeroPedido: ['', Validators.required],
      notaFiscal: ['', Validators.required],
      status: [1],
      setor: [1],
      tipoProduto: [1],
      descricao: [''],
      quantidade: ['', Validators.required],
      responsavelRetirada: [''],
      observacaoDoProduto: [''],
      cliente: ['', Validators.required],
      
    });
  }

  addProduto() {
    this.salvando = true;
    this.serviceProduto.AddProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.formProduto.reset();
        this.msgSucess(res.mensagem)
      },
      (error) => {
        this.salvando = false;
      }
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
