import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChequeoGeneralDTO {
  id?: number;
  colmenaId: number;
  fecha: string;
  alza: string;
  cuadro: number;
  temperamento: string;
  poblacion: string;
  presenciaMiel: string;
  presenciaPanAbeja: string;
  presenciaCriaOperculada: string;
  presenciaCriaAbierta: string;
  porcentajeCuadro?: number;
  reinas: string;
  reservaAlimento: string;
  alimentacionArtificial: string;
  comportamientoHigienico: string;
  estadoSanitario: string;
  observaciones?: string;
}

export interface RegistroCosechaDTO {
  id?: number;
  colmenaId: number;
  fecha: string;
  alza: string;
  cuadro: number;
  metodoExtraccion: string;
  cuadroReemplazo: string;
  cuadrosFaltantesConCera?: number;
  cuadrosFaltantesSinCera?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColmenaService {
  private apiUrl = `${environment.apiUrl}/colmenas`;

  constructor(private http: HttpClient) {}

  crearChequeo(colmenaId: number, dto: ChequeoGeneralDTO): Observable<ChequeoGeneralDTO> {
    return this.http.post<ChequeoGeneralDTO>(`${this.apiUrl}/${colmenaId}/chequeos`, dto);
  }

  listarChequeos(colmenaId: number): Observable<ChequeoGeneralDTO[]> {
    return this.http.get<ChequeoGeneralDTO[]>(`${this.apiUrl}/${colmenaId}/chequeos`);
  }

  crearCosecha(colmenaId: number, dto: RegistroCosechaDTO): Observable<RegistroCosechaDTO> {
    return this.http.post<RegistroCosechaDTO>(`${this.apiUrl}/${colmenaId}/cosechas`, dto);
  }

  listarCosechas(colmenaId: number): Observable<RegistroCosechaDTO[]> {
    return this.http.get<RegistroCosechaDTO[]>(`${this.apiUrl}/${colmenaId}/cosechas`);
  }

  descargarExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/excel/exportar`, {
      responseType: 'blob'
    });
  }
}
