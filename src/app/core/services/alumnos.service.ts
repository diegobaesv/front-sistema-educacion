import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_BACKEND } from '../../shared/utils/constants';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient
  ) { }

  private url = `${BASE_URL_BACKEND}/alumnos`;

  async listarAlumnos(){
    const observable = this.http.get(this.url);
    return await lastValueFrom(observable);
  }

  obtenerAlumnos(){
    this.http.get(this.url)
  }
  
}
