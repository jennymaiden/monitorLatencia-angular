import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {ListarAlertaService} from '../../services/listar-alerta.service';
import {Alerta} from '../../models/alerta';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent  {
  @Input() listAlerta: Alerta[] | any;

  constructor(private router: Router, private alertaService: ListarAlertaService) {
  }

  public mostrarDiagnostico(idLatencia: string, idAlerta: string): void{
    // Actualizar alerta a vista
    this.alertaService.actualizarAlerta(idAlerta).subscribe(data => {
      if (data.msg === 'OK'){
        // Ir a diagnostico
        this.router.navigate(['/diagnostico/' + idLatencia]);
      }
    });
  }
}
