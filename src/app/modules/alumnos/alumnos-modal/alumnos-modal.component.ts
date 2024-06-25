import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { setTimeout } from 'timers/promises';
import { IAlumno } from '../../../core/models/IAlumno';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TYPE_MODAL_VER } from '../../../shared/utils/constants';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-alumnos-modal',
  standalone: true,
  imports: [FormsModule,InputTextModule, FloatLabelModule, ButtonModule,CalendarModule],
  templateUrl: './alumnos-modal.component.html',
  styleUrl: './alumnos-modal.component.scss'
})
export class AlumnosModalComponent implements OnInit{

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ){
  }


  alumno: IAlumno = {
    idAlumno: 0,
    codigo:'',
    correoInstitucional: '',
    documentoIdentidad: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    fechaNacimiento: '',
    sexo: ''
  };

  ngOnInit(): void {
   console.log('AlumnosModalComponent',this.config.data);
   if(this.config.data.data){
    this.alumno = this.config.data.data;
   }
  }

  isModoVer():boolean{
    return this.config.data.typeModal == TYPE_MODAL_VER
  }



  
}
