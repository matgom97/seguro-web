// src/app/register/register-form/register-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguroService } from '../../service/seguro.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Agregar CommonModule aquí
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private seguroService: SeguroService, private router: Router) {
    this.registerForm = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      telefonoContacto: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correoElectronico: [
        '', 
        [
          Validators.required, 
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/)
        ]
      ],
      fechaNacimiento: ['', Validators.required],
      valorEstimadoSeguro: ['', [Validators.required, Validators.min(0)]],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.seguroService.createSeguro(this.registerForm.value).subscribe(
        response => {
          console.log('Asegurado registrado con éxito:', response);
          this.router.navigate(['/management']);
        },
        error => {
          console.error('Error al registrar asegurado:', error);
        }
      );
    }
  }
}
