import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { setTimeout } from 'timers/promises';
import { IAlumno } from '../../../core/models/IAlumno';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TYPE_MODAL_VER } from '../../../shared/utils/constants';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';


@Component({
  selector: 'app-alumnos-modal',
  standalone: true,
  imports: [FormsModule,InputTextModule, FloatLabelModule, ButtonModule,CalendarModule,RadioButtonModule,FieldsetModule],
  templateUrl: './alumnos-modal.component.html',
  styleUrl: './alumnos-modal.component.scss'
})
export class AlumnosModalComponent implements OnInit{

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ){
    this.fb.group({
      codigoEstudiante: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.maxLength(10) ]
      ],
      correoInstitucional: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.email ]
      ],
      documentoIdentidad: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.maxLength(8), Validators.minLength(8) ]
      ],
      nombres: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required ]
      ],
      apellidoPaterno: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required ]
      ],
      apellidoMaterno: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required ]
      ],
      fechaNacimiento: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.pattern('(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)') ]
      ],
      sexo: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.maxLength(1), Validators.minLength(1) ]
      ],
      direccion: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required ]
      ]
    })
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
