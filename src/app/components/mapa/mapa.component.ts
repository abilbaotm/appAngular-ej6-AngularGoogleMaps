import { Component, OnInit } from '@angular/core';
import {Marcador} from '../../classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef } from '@angular/material';
import {MapaEditarComponent} from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  title = 'Mapa';
  lat = 42.8453072;
  lng = -2.6866899;


  constructor(public _snackBar: MatSnackBar, public _dialog: MatDialog) {

    if ( localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }
  agragarMarcador( evento: any ) {

    const coords: { lat: number, lng: number} = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();

    this._snackBar.open('Marcador agregado', 'Cerrar');
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador ( i ) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();

    this._snackBar.open('Marcador eliminado', 'Cerrar');
  }

  editarMarcador ( marcador: Marcador) {
      const dialogRef = this._dialog.open(MapaEditarComponent, {
        width: '250px',
        data: {titulo: marcador.titulo, desc: marcador.desc}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialogo cerrado');

        if (! result) {
          return;
        }

        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();

        this._snackBar.open('Marcador guardado correctamente', 'Cerrar',{duration: 3000});
      });
  }

}
