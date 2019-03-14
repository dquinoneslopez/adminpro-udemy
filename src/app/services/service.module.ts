import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         HospitalService,
         MedicoService,
         VerificaTokenGuard,
        } from './service.index';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';

import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService,
    ModalUploadService,
    LoginGuardGuard,
    AdminGuard,
    UsuarioService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard,
  ],
  declarations: []
})
export class ServiceModule { }
