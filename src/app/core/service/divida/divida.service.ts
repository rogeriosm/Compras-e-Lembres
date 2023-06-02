import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Divida } from 'src/app/shared/model/Divida';

@Injectable({
  providedIn: 'root',
})
export class DividaService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public listarDividas(): Observable<Array<Divida>> {
    return this.http.get<Array<Divida>>(`${this.url}/dividas`).pipe(
      (res) => res,
      (err) => err
    );
  }

  public salvarDivida(divida: Divida): Observable<Divida> {
    console.log(divida);

    return this.http
      .post<Divida>(`${this.url}/dividas`, divida, this.header())
      .pipe(
        (res) => {
          return res;
        },
        (err) => {
          return err;
        }
      );
  }

  private header() {
    const httpOptions = {
      headers: new HttpHeaders({
        // dataType: 'multipart/form-data',
        'Content-Type': 'application/json',
        // authorization: 'Bearer codigo',
      }),
    };
    return httpOptions;
  }
}
