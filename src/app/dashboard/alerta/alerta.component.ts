import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {ListarAlertaService} from '../../services/listar-alerta.service';
import {Alerta} from '../../models/alerta';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
  @Input() listAlerta: Alerta[] | any;

  constructor(private router: Router, private alertaService: ListarAlertaService) {
  }

  ngOnInit(): void {
    // this.listarAlertas();
  }

  public mostrarDiagnostico(idLatencia: string, idAlerta: string): void{

    // Actualizar alerta a vista
    this.alertaService.actualizarAlerta(idAlerta);
    // Ir a diagnostico
    this.router.navigate(['/diagnostico/' + idLatencia]);
  }
  public listarAlertas(): void{

    this.alertaService.getAlerta().subscribe(data => {
      if (data.msg === 'OK'){
        data.listAlerta.forEach((objAlerta, index ) => {
          this.listAlerta.push(objAlerta);
        });
      }
    });
  }
}
