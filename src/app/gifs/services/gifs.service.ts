import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'OBKK9sgSDH7r4DThhLakmdPeQfZa0HQF';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }


  constructor(private httpclient: HttpClient) {
    if (localStorage.getItem("Historial")) {
      this._historial = JSON.parse(localStorage.getItem("Historial")!);
      this.resultados = JSON.parse(localStorage.getItem("resultados")!);
    }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem("Historial", JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '30')
      .set('q', query)

    this.httpclient.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe(
        (response) => {
          this.resultados = response.data;
          localStorage.setItem("resultados", JSON.stringify(this.resultados));
        }
      )

  }

  borrarHistorial(){
    localStorage.clear()
    location.reload();
  }
}
