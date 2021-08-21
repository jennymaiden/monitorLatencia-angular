import {Parametro} from './parametro';
import {Diagnostico} from './diagnostico';
import {Recomendacion} from './recomendacion';

export interface ResponseDiagnostico {
    msg: string;
    parametro: Parametro;
    diagnostico: Diagnostico;
    recomendacion: Recomendacion;
}
