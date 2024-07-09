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

  async insertarAlumno(alumno: any){
    const observable = this.http.post(this.url,alumno);
    return await lastValueFrom(observable);
  }

  async listarAlumnos(){
    const observable = this.http.get(this.url);
    return await lastValueFrom(observable);
  }

  async modificarAlumno(id: number, alumno: any){
    const observable = this.http.put(`${this.url}/${id}`,alumno);
    return await lastValueFrom(observable);
  }

  async eliminarAlumno(id: number) {
    const observable = this.http.delete(`${this.url}/${id}`);
    return await lastValueFrom(observable);
  }

  obtenerAlumnos(){
    this.http.get(this.url);
  }


  
}
