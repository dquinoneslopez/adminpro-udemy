import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {

    this.cargarStorage();

 }

 cargarStorage() {

  if (localStorage.getItem('token')) {

    this.token = localStorage.getItem('token');
    this.hospital = JSON.parse(localStorage.getItem('usuario'));

  } else {

    this.token = '';
    this.hospital = null;

  }
}

guardarStorage( id: string, token: string, hospital: Hospital) {

  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('hospital', JSON.stringify(hospital));

  this.hospital = hospital;
  this.token = token;

}

  cargarHospitales(desde: number = 0) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => {
                        this.totalHospitales = resp.total;
                        return resp.hospitales;
                      })
                    );

  }

  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => resp.hospital )
                    );

  }

  borrarHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                    .pipe(
                      map( borrado => {
                        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
                        return true;
                      }));

  }

  crearHospital( nombre: string ) {

    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre: nombre } )
                    .pipe(
                      map( (resp: any) => {

                        swal('Hospital creado', nombre, 'success');
                        return resp.hospital;

                      })
                    );

  }

  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => resp.hospitales)
                    );

  }

  actualizarHospital( hospital: Hospital ) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                    .pipe(
                        map( (resp: any) => {

                          swal('Hospital actualizado', hospital.nombre, 'success');
                          return resp.hospital;
                        })
                    );

  }

}
