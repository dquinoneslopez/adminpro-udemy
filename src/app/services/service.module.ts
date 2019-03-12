import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         HospitalService,
         MedicoService,
        } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
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
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    UsuarioService,
    HospitalService,
    MedicoService,
  ],
  declarations: []
})
export class ServiceModule { }
