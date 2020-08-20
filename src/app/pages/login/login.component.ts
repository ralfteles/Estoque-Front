import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuarioModel';
import { ServiceLoginService } from 'src/app/service/service-login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  validando: boolean = false;
  msgError = '';

  constructor(
    public formBuilder: FormBuilder,
    public serviceAuth: ServiceLoginService,
    public router: Router,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.montarForm();
  }

  montarForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  autenticar() {
    this.validando = true;
    this.serviceAuth.Autenticar(this.formLogin.value).subscribe(
      (res: any) => {
        this.validando = false;
        
        this.storage.setItem('usuario', res);
        this.router.navigate(['home']);
      },
      (error) => {
        this.validando = false;
        this.msgError = error.error.mensagem;
      }
    );
  }
}
