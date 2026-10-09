import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColmenaService, ChequeoGeneralDTO, RegistroCosechaDTO } from '../../services/colmena.service';
import { fadeInAnimation } from '../../animations/route.animations';

@Component({
  selector: 'app-colmena-panel',
  template: `
    <div class="min-h-screen p-6" @fadeIn>
      <!-- Header -->
      <header class="max-w-4xl mx-auto mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button (click)="volver()" class="btn-secondary">
              ← Volver
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gradient">
                Colmena {{ colmenaId }}
              </h1>
              <p class="text-gray-400">Panel de gestión</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <main class="max-w-4xl mx-auto">
        <div class="flex gap-2 mb-6">
          <button (click)="tabActiva = 'chequeo'"
                  [class.btn-primary]="tabActiva === 'chequeo'"
                  [class.btn-secondary]="tabActiva !== 'chequeo'">
            Chequeo General
          </button>
          <button (click)="tabActiva = 'cosecha'"
                  [class.btn-primary]="tabActiva === 'cosecha'"
                  [class.btn-secondary]="tabActiva !== 'cosecha'">
            Registro Cosecha
          </button>
        </div>

        <!-- Formulario Chequeo General -->
        <div *ngIf="tabActiva === 'chequeo'" class="card p-6">
          <h2 class="text-xl font-semibold text-white mb-6">Formulario A: Chequeo General</h2>

          <form [formGroup]="chequeoForm" (ngSubmit)="guardarChequeo()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
                <input type="date" formControlName="fecha" class="input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Alza</label>
                <input type="text" formControlName="alza" class="input-field" placeholder="Ej: Alza 1">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Cuadro (1-10)</label>
                <input type="number" formControlName="cuadro" class="input-field"
                       min="1" max="10" placeholder="1-10">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Temperamento</label>
                <select formControlName="temperamento" class="input-field">
                  <option value="">Seleccionar</option>
                  <option value="Calmado">Calmado</option>
                  <option value="Nervioso">Nervioso</option>
                  <option value="Agresivo">Agresivo</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Población</label>
                <select formControlName="poblacion" class="input-field">
                  <option value="">Seleccionar</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Porcentaje del Cuadro (%)</label>
                <input type="number" formControlName="porcentajeCuadro" class="input-field"
                       min="0" max="100" placeholder="0-100">
              </div>
            </div>

            <!-- Presencia por Cuadro -->
            <div class="border-t border-miel-500/20 pt-4">
              <h3 class="text-sm font-medium text-miel-400 mb-3">Presencia por Cuadro</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Miel</label>
                  <select formControlName="presenciaMiel" class="input-field">
                    <option value="Sin presencia">Sin presencia</option>
                    <option value="Poca">Poca</option>
                    <option value="Media">Media</option>
                    <option value="Abundante">Abundante</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Pan de Abeja</label>
                  <select formControlName="presenciaPanAbeja" class="input-field">
                    <option value="Sin presencia">Sin presencia</option>
                    <option value="Poca">Poca</option>
                    <option value="Media">Media</option>
                    <option value="Abundante">Abundante</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Cría Operculada</label>
                  <select formControlName="presenciaCriaOperculada" class="input-field">
                    <option value="Sin presencia">Sin presencia</option>
                    <option value="Poca">Poca</option>
                    <option value="Media">Media</option>
                    <option value="Abundante">Abundante</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Cría Abierta</label>
                  <select formControlName="presenciaCriaAbierta" class="input-field">
                    <option value="Sin presencia">Sin presencia</option>
                    <option value="Poca">Poca</option>
                    <option value="Media">Media</option>
                    <option value="Abundante">Abundante</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Reinas</label>
                <select formControlName="reinas" class="input-field">
                  <option value="Sin reina">Sin reina</option>
                  <option value="1 reina">1 reina</option>
                  <option value="2 reinas">2 reinas</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Reserva de Alimento</label>
                <select formControlName="reservaAlimento" class="input-field">
                  <option value="Sin reserva">Sin reserva</option>
                  <option value="Poca">Poca</option>
                  <option value="Suficiente">Suficiente</option>
                  <option value="Abundante">Abundante</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Alimentación Artificial</label>
                <select formControlName="alimentacionArtificial" class="input-field">
                  <option value="Sin alimentación">Sin alimentación</option>
                  <option value="Jarabe">Jarabe</option>
                  <option value="Polen">Polen</option>
                  <option value="Ambos">Ambos</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Comportamiento Higiénico</label>
                <select formControlName="comportamientoHigienico" class="input-field">
                  <option value="Regular">Regular</option>
                  <option value="Bueno">Bueno</option>
                  <option value="Excelente">Excelente</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Estado Sanitario</label>
              <select formControlName="estadoSanitario" class="input-field">
                <option value="Sano">Sano</option>
                <option value="Con alerta">Con alerta</option>
                <option value="Enfermo">Enfermo</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
              <textarea formControlName="observaciones" class="input-field" rows="3"
                        placeholder="Notas adicionales..."></textarea>
            </div>

            <button type="submit" class="btn-primary w-full">
              Guardar Chequeo
            </button>
          </form>
        </div>

        <!-- Formulario Cosecha -->
        <div *ngIf="tabActiva === 'cosecha'" class="card p-6">
          <h2 class="text-xl font-semibold text-white mb-6">Formulario B: Registro de Cosecha</h2>

          <form [formGroup]="cosechaForm" (ngSubmit)="guardarCosecha()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
                <input type="date" formControlName="fecha" class="input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Alza</label>
                <input type="text" formControlName="alza" class="input-field" placeholder="Ej: Alza 1">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Cuadro (1-10)</label>
                <input type="number" formControlName="cuadro" class="input-field"
                       min="1" max="10" placeholder="1-10">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Método de Extracción</label>
                <select formControlName="metodoExtraccion" class="input-field">
                  <option value="">Seleccionar</option>
                  <option value="Presión">Presión</option>
                  <option value="Centrífuga">Centrífuga</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Cuadro de Reemplazo</label>
              <select formControlName="cuadroReemplazo" class="input-field">
                <option value="">Seleccionar</option>
                <option value="Con cera">Con cera</option>
                <option value="Sin cera">Sin cera</option>
              </select>
            </div>

            <div class="border-t border-miel-500/20 pt-4">
              <h3 class="text-sm font-medium text-miel-400 mb-3">Cuadros Faltantes</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Con Cera</label>
                  <input type="number" formControlName="cuadrosFaltantesConCera" class="input-field"
                         min="0" placeholder="0">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Sin Cera</label>
                  <input type="number" formControlName="cuadrosFaltantesSinCera" class="input-field"
                         min="0" placeholder="0">
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full">
              Guardar Cosecha
            </button>
          </form>
        </div>
      </main>
    </div>
  `,
  animations: [fadeInAnimation]
})
export class ColmenaPanelComponent implements OnInit {
  colmenaId!: number;
  tabActiva: 'chequeo' | 'cosecha' = 'chequeo';

  chequeoForm!: FormGroup;
  cosechaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private colmenaService: ColmenaService
  ) {}

  ngOnInit(): void {
    this.colmenaId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForms();
  }

  private initForms(): void {
    this.chequeoForm = this.fb.group({
      fecha: ['', Validators.required],
      alza: ['', Validators.required],
      cuadro: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      temperamento: ['', Validators.required],
      poblacion: ['', Validators.required],
      presenciaMiel: ['Sin presencia'],
      presenciaPanAbeja: ['Sin presencia'],
      presenciaCriaOperculada: ['Sin presencia'],
      presenciaCriaAbierta: ['Sin presencia'],
      porcentajeCuadro: [null],
      reinas: ['Sin reina'],
      reservaAlimento: ['Sin reserva'],
      alimentacionArtificial: ['Sin alimentación'],
      comportamientoHigienico: ['Regular'],
      estadoSanitario: ['Sano'],
      observaciones: ['']
    });

    this.cosechaForm = this.fb.group({
      fecha: ['', Validators.required],
      alza: ['', Validators.required],
      cuadro: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      metodoExtraccion: ['', Validators.required],
      cuadroReemplazo: ['', Validators.required],
      cuadrosFaltantesConCera: [0],
      cuadrosFaltantesSinCera: [0]
    });
  }

  guardarChequeo(): void {
    if (this.chequeoForm.invalid) return;

    const dto: ChequeoGeneralDTO = {
      ...this.chequeoForm.value,
      colmenaId: this.colmenaId
    };

    this.colmenaService.crearChequeo(this.colmenaId, dto).subscribe({
      next: () => {
        alert('Chequeo guardado correctamente');
        this.chequeoForm.reset();
      },
      error: (err) => {
        alert('Error al guardar: ' + (err.error?.message || err.message));
      }
    });
  }

  guardarCosecha(): void {
    if (this.cosechaForm.invalid) return;

    const dto: RegistroCosechaDTO = {
      ...this.cosechaForm.value,
      colmenaId: this.colmenaId
    };

    this.colmenaService.crearCosecha(this.colmenaId, dto).subscribe({
      next: () => {
        alert('Cosecha guardada correctamente');
        this.cosechaForm.reset();
      },
      error: (err) => {
        alert('Error al guardar: ' + (err.error?.message || err.message));
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }
}
