import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ParametrizacionComponent} from './dashboard/parametrizacion/parametrizacion.component';
import {GraficaComponent} from './dashboard/grafica/grafica.component';
import {DiagnosticoComponent} from './dashboard/diagnostico/diagnostico.component';

const routes: Routes = [
  { path : '', redirectTo: 'inicio', pathMatch: 'full' },
  { path : 'inicio', component: DashboardComponent},
  { path : 'parametrizacion', component: ParametrizacionComponent},
  { path : 'grafica', component: GraficaComponent},
  { path : 'diagnostico', component: DiagnosticoComponent},
  { path : 'diagnostico/**', component: DiagnosticoComponent, pathMatch: 'full'},
  { path : '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
