import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ColmenaService } from '../../services/colmena.service';
import { staggerAnimation, fadeInAnimation } from '../../animations/route.animations';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen p-6" @fadeIn>
      <!-- Header -->
      <header class="max-w-6xl mx-auto mb-10">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gradient">
              Universidad de Cundinamarca
            </h1>
            <p class="text-miel-400/80 text-lg mt-1">
              Unidad Agroambiental La Esperanza
            </p>
          </div>
          <button (click)="logout()" class="btn-secondary">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <!-- Grid de colmenas -->
      <main class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10" @stagger>
          <button *ngFor="let colmena of colmenas"
                  (click)="irAColmena(colmena)"
                  class="card p-6 text-center group cursor-pointer
                         hover:bg-miel-500/10 hover:border-miel-500/60
                         transform hover:scale-105 transition-all duration-300
                         active:scale-95">
            <div class="w-16 h-16 mx-auto mb-3 bg-miel-500/20 rounded-full
                        flex items-center justify-center
                        group-hover:bg-miel-500/40 transition-colors duration-300
                        group-hover:shadow-lg group-hover:shadow-miel-500/30">
              <span class="text-2xl font-bold text-miel-400">{{ colmena }}</span>
            </div>
            <p class="text-sm text-gray-300 group-hover:text-miel-300 transition-colors">
              Colmena {{ colmena }}
            </p>
          </button>
        </div>

        <!-- Botón Exportar Excel -->
        <div class="text-center">
          <button (click)="exportarExcel()"
                  class="btn-primary inline-flex items-center gap-3 text-lg px-10 py-4
                         animate-pulse-glow">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Exportar a Excel
          </button>
          <p class="text-gray-500 text-sm mt-3">
            Descarga un reporte consolidado con todos los datos
          </p>
        </div>
      </main>
    </div>
  `,
  animations: [fadeInAnimation, staggerAnimation]
})
export class DashboardComponent implements OnInit {
  colmenas: number[] = Array.from({ length: 15 }, (_, i) => i + 1);

  constructor(
    private authService: AuthService,
    private colmenaService: ColmenaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  irAColmena(id: number): void {
    this.router.navigate(['/colmena', id]);
  }

  exportarExcel(): void {
    this.colmenaService.descargarExcel().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_colmenas_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar Excel:', err);
        alert('Error al generar el reporte');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
