import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService,
  ) { }

  ngOnInit() {

    this.cargarMedicos();

  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos()
                       .subscribe( medicos => this.medicos = medicos );

    this.cargando = false;

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this._medicoService.totalMedicos ) {

      return;

    }

    if (desde < 0 ) {

      return;

    }

    this.desde += valor;
    this.cargarMedicos();

  }

  buscarMedico( termino: string ) {

    if (termino.length <= 0) {

      this.cargarMedicos();
      return;

    }

    this.cargando = true;

    this._medicoService
        .buscarMedicos( termino )
        .subscribe( medicos => this.medicos = medicos );

    this.cargando = false;

  }

  borrarMedico(medico: Medico) {

    this._medicoService
        .borrarMedico( medico._id )
        .subscribe( () => this.cargarMedicos() );

  }

}
