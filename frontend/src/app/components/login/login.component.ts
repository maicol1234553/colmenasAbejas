import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fadeInAnimation } from '../../animations/route.animations';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center p-4" @fadeIn>
      <div class="w-full max-w-md">
        <!-- Logo y título -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-miel-500/20 rounded-full mb-4 animate-pulse-glow">
            <svg class="w-10 h-10 text-miel-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-miel-400">Gestión de Colmenas</h1>
          <p class="text-gray-400 mt-2">Universidad de Cundinamarca</p>
        </div>

        <!-- Formulario -->
        <div class="card p-8">
          <h2 class="text-xl font-semibold text-white mb-6">Iniciar Sesión</h2>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" formControlName="email" class="input-field"
                     placeholder="tu@email.com">
              <p *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                 class="text-red-400 text-xs mt-1">Email es requerido</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <input type="password" formControlName="password" class="input-field"
                     placeholder="••••••••">
              <p *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                 class="text-red-400 text-xs mt-1">Contraseña es requerida</p>
            </div>

            <div *ngIf="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p class="text-red-400 text-sm">{{ error }}</p>
            </div>

            <button type="submit" [disabled]="loginForm.invalid || loading"
                    class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="!loading">Ingresar</span>
              <span *ngIf="loading" class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Cargando...
              </span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              ¿No tienes cuenta?
              <a routerLink="/registro" class="text-miel-400 hover:text-miel-300 transition-colors">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [fadeInAnimation]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      }
    });
  }
}
