import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {

    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales() );

  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal( 'hospitales', id );

  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
                         .subscribe( hospitales => this.hospitales = hospitales);

    this.cargando = false;

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales ) {

      return;

    }

    if (desde < 0 ) {

      return;

    }

    this.desde += valor;
    this.cargarHospitales();

  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {

      this.cargarHospitales();
      return;

    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
                         .subscribe( hospitales => this.hospitales = hospitales );

    this.cargando = false;

  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital( hospital._id )
                         .subscribe( () => this.cargarHospitales() );

  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
                         .subscribe();

  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
                           .subscribe( () => this.cargarHospitales() );
    });

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
