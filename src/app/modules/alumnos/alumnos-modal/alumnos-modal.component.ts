import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAlumno } from '../../../core/models/IAlumno';
import { TYPE_MODAL_CREAR, TYPE_MODAL_VER } from '../../../shared/utils/constants';

import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { ValidatorFormComponent } from '../../../shared/components/validator-form/validator-form.component';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { SweetService } from '../../../core/services/sweet.service';

@Component({
  selector: 'app-alumnos-modal',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
    ValidatorFormComponent,

    InputTextModule, 
    FloatLabelModule,
    ButtonModule,
    CalendarModule,
    RadioButtonModule,
    FieldsetModule
  ],
  templateUrl: './alumnos-modal.component.html',
  styleUrl: './alumnos-modal.component.scss'
})
export class AlumnosModalComponent implements OnInit{

  alumnoForm: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private sweetService: SweetService
  ){
    this.alumnoForm = this.fb.group({
      codigo: [
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
        [ Validators.required/*, Validators.pattern('(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)')*/ ]
      ],
      sexo: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required, Validators.maxLength(1), Validators.minLength(1) ]
      ],
      direccion: [
        { value:'', disabled: this.isModoVer() },
        [ Validators.required ]
      ]
    });
  }


  /*alumno: IAlumno = {
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
  };*/

  ngOnInit(): void {
   console.log('AlumnosModalComponent',this.config.data);
   if(this.config.data.data){
    //this.alumno = this.config.data.data;
    this.alumnoForm.patchValue(this.config.data.data);
    //this.alumnoForm.get('codigo')?.setValue('MANUAL')
   }
  }

  isModoVer():boolean{
    return this.config.data.typeModal == TYPE_MODAL_VER
  }

  async onSubmit(){
    console.log('onSubmit');

    //console.log('this.alumnoForm.errors',this.alumnoForm.get('codigoEstudiante')?.errors)

    this.alumnoForm.markAllAsTouched();


    if(!this.alumnoForm.valid){
      console.error('El formulario tiene errores');
      return;
    }

    const alumno = {
      codigo: this.alumnoForm.get('codigo')?.value,
      correoInstitucional: this.alumnoForm.get('correoInstitucional')?.value,
      documentoIdentidad: this.alumnoForm.get('documentoIdentidad')?.value,
      nombres: this.alumnoForm.get('nombres')?.value,
      apellidoPaterno: this.alumnoForm.get('apellidoPaterno')?.value,
      apellidoMaterno: this.alumnoForm.get('apellidoMaterno')?.value,
      fechaNacimiento: this.alumnoForm.get('fechaNacimiento')?.value,
      sexo: this.alumnoForm.get('sexo')?.value,
      direccion: this.alumnoForm.get('direccion')?.value
    }

    console.log('alumno',alumno);

    try {
      let response: any;

      if(this.config.data.typeModal == TYPE_MODAL_CREAR) {
        response = await this.alumnosService.insertarAlumno(alumno);
      } else {
        const id = this.config.data.data.idAlumno;
        response = await this.alumnosService.modificarAlumno(id,alumno);
      }
      
      console.log('response', response);
      
      if (response.success) {
        this.sweetService.showSuccess();
      } else {
        this.sweetService.showError(response.message);
      }
    } catch (error:any) {
      this.sweetService.showError(error.message);
    }

    this.ref.close();
    

    console.log('El formulario esta OK');
  }



  
}
