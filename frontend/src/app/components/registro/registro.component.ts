import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fadeInAnimation } from '../../animations/route.animations';

@Component({
  selector: 'app-registro',
  template: `
    <div class="min-h-screen flex items-center justify-center p-4" @fadeIn>
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-miel-500/20 rounded-full mb-4">
            <svg class="w-10 h-10 text-miel-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-miel-400">Crear Cuenta</h1>
          <p class="text-gray-400 mt-2">Regístrate para gestionar las colmenas</p>
        </div>

        <div class="card p-8">
          <form [formGroup]="registroForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input type="text" formControlName="nombre" class="input-field" placeholder="Juan">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
                <input type="text" formControlName="apellido" class="input-field" placeholder="Pérez">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" formControlName="email" class="input-field" placeholder="tu@email.com">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <input type="password" formControlName="password" class="input-field" placeholder="Mínimo 6 caracteres">
            </div>

            <div *ngIf="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p class="text-red-400 text-sm">{{ error }}</p>
            </div>

            <button type="submit" [disabled]="registroForm.invalid || loading"
                    class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="!loading">Registrarse</span>
              <span *ngIf="loading">Procesando...</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              ¿Ya tienes cuenta?
              <a routerLink="/login" class="text-miel-400 hover:text-miel-300 transition-colors">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [fadeInAnimation]
})
export class RegistroComponent {
  registroForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { nombre, apellido, email, password } = this.registroForm.value;

    this.authService.registro(nombre, apellido, email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrarse';
        this.loading = false;
      }
    });
  }
}
