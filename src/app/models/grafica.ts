import {Latencia} from './latencia';
import {Muestra} from './muestra';
import {Arreglo} from './arreglo';

export interface Grafica {
    msg: string;
    latencia: Latencia[];
    arreglo: Arreglo[];
}
