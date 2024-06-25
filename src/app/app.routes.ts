import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AlumnosListarComponent } from './modules/alumnos/alumnos-listar/alumnos-listar.component';
import { DocentesListarComponent } from './modules/docentes/docentes-listar/docentes-listar.component';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosModalComponent } from './modules/alumnos/alumnos-modal/alumnos-modal.component';

export const routes: Routes = [
    { path:'', pathMatch: 'full', redirectTo:'principal'},
    { 
        path: 'principal', component: MainLayoutComponent, children: [
            { path: '', pathMatch:'full', redirectTo:'inicio'},
            { path: 'inicio', component: HomeComponent },
            { path: 'alumnos', component: AlumnosListarComponent },
            { path: 'docentes', component: DocentesListarComponent },        ]
    },
    
];
