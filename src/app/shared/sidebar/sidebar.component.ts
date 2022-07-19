import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService:GifsService) { }

  get historial(){
    return this.gifsService.historial;
  }

  get borrar(){
    return this.gifsService.borrarHistorial;
  }

  buscar(item:string){
    this.gifsService.buscarGifs(item)
  }

  ngOnInit(): void {
  }

  validarStorage(){
    let  banderaStorage;
    if ( localStorage.getItem('resultados')) {
      banderaStorage = true;
    }else{
      banderaStorage = false;
    }
    return banderaStorage
  }
}
