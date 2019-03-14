import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.devuelveObservable().subscribe(
      numero => { console.log('Subs ', numero); },     // callback para next
      error => console.error('Error en obs ', error ), // calback para error
      () => console.log( 'El observador terminó ')     // callback para fin
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log( 'La página se va a cerrar.' );
    this.subscription.unsubscribe();
  }

  devuelveObservable(): Observable<any> {

    return new Observable( ( observer: Subscriber<any> ) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

      }, 1000);

    }).pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {
        if ( (valor % 2) === 0 ) {
          // par
          return false;
        } else {
          // impar
          return true;
        }
      })
    );

  }

}
