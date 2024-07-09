import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IAlumno } from '../../../core/models/IAlumno';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlumnosModalComponent } from '../alumnos-modal/alumnos-modal.component';
import { FooterModalComponent } from '../../../shared/components/footer-modal/footer-modal.component';
import { TYPE_MODAL_CREAR, TYPE_MODAL_EDITAR, TYPE_MODAL_VER } from '../../../shared/utils/constants';
import { HomeComponent } from '../../../pages/home/home.component';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { SweetService } from '../../../core/services/sweet.service';


@Component({
  selector: 'app-alumnos-listar',
  standalone: true,
  imports: [TableModule, ButtonModule,IconFieldModule,InputIconModule, InputTextModule],
  templateUrl: './alumnos-listar.component.html',
  styleUrl: './alumnos-listar.component.scss',
  providers: [DialogService]
})
export class AlumnosListarComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private alumnosService: AlumnosService,
    private sweetService: SweetService
  ){

  }
  

  @ViewChild('tblAlumnosListar') tblAlumnosListar: Table | undefined;

  ref: DynamicDialogRef | undefined;

  buttonStyle= {
    width: '2.3rem',
    height: '2.3rem',
    'margin-left': '0.5rem'
  }

  alumnos: any = [];

  async ngOnInit() {
    await this.loadAlumnos();
  }

  async loadAlumnos(){
    const response:any = await this.alumnosService.listarAlumnos();
    console.log('response',response);
    this.alumnos = response.data;
  }

  applyFilterGlobal($event:any, stringVal:string) {
    this.tblAlumnosListar?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onClickCrearAlumno(){
    console.log('onClickCrearAlumno');
    this.ref = this.dialogService.open(AlumnosModalComponent,
      {
        header:'Crear un Alumno', 
        width: '80vw',
        height: '80vh',
        templates:{
          footer: FooterModalComponent
        },
        data: {
          typeModal: TYPE_MODAL_CREAR,
          data: undefined
        }
      }
    );

    this.ref.onClose.subscribe((data:any)=>{
      console.log('SE HA CERRADO EL MODAL:',data);
      this.loadAlumnos();
    })
  }

  onClickVerAlumno(alumno: IAlumno){
    console.log('onClickVerAlumno',alumno);
    this.ref = this.dialogService.open(AlumnosModalComponent,
      {
        header:'Información de Alumno', 
        width: '80vw',
        height: '80vh',
        templates:{
          footer: FooterModalComponent
        },
        data: {
          typeModal: TYPE_MODAL_VER,
          data: alumno
        }
      }
    );

    this.ref.onClose.subscribe((data:any)=>{
      console.log('SE HA CERRADO EL MODAL:',data);
    })
  }

  onClickEditarAlumno(alumno: IAlumno){
    console.log('onClickEditarAlumno',alumno);
    this.ref = this.dialogService.open(AlumnosModalComponent,
      {
        header:'Modificar al Alumno', 
        width: '80vw',
        height: '80vh',
        templates:{
          footer: FooterModalComponent
        },
        data: {
          typeModal: TYPE_MODAL_EDITAR,
          data: alumno
        }
      }
    );

    this.ref.onClose.subscribe((data:any)=>{
      console.log('SE HA CERRADO EL MODAL:',data);
      this.loadAlumnos();
    })

  }

  onClickEliminarAlumno(idAlumno: number){
    this.sweetService.showConfirm('¿Deseas eliminar al alumno?',async ()=>{
      try {
        const response: any = await this.alumnosService.eliminarAlumno(idAlumno);
        console.log(response);
        if (response.success) {
          this.sweetService.showSuccess();
          this.loadAlumnos();
        } else {
          this.sweetService.showError(response.message);
        }
      } catch (error:any) {
        this.sweetService.showError(error.message);
      }
    })
  }

  


}
