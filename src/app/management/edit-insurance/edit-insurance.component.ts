// src/app/management/edit-insurance/edit-insurance.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguroService } from '../../service/seguro.service';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de que esto esté importado
import { CommonModule } from '@angular/common'; // Importar CommonModule


@Component({
  selector: 'app-edit-insurance',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], 
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.css']
})
export class EditInsuranceComponent {
  editForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private seguroService: SeguroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.editForm = this.fb.group({
      numeroIdentificacion: [{ value: '', disabled: true }, Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      telefonoContacto: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      valorEstimadoSeguro: ['', [Validators.required, Validators.min(0)]],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.loadInsurance();
  }

  loadInsurance(): void {
    this.seguroService.getSeguroById(this.id).subscribe(
      data => {
        if (data.fechaNacimiento) {
          const fechaNacimiento = new Date(data.fechaNacimiento);
          data.fechaNacimiento = fechaNacimiento.toISOString().split('T')[0];
        }
        
        this.editForm.patchValue(data)},
      error => console.error('Error loading insurance:', error)
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const seguroData = this.editForm.getRawValue(); // Obtiene todos los valores incluyendo los deshabilitados
      seguroData.numeroIdentificacion = this.id; // Si el ID es el mismo, lo reasigna
      
      this.seguroService.updateSeguro(this.id, seguroData).subscribe(
        response => {
          console.log('Asegurado actualizado con éxito:', response);
          this.router.navigate(['/management']);
        },
        error => {
          console.error('Error updating insurance:', error);
          if (error.status === 400) {
            alert('Error en los datos enviados. Verifica los campos del formulario.');
          } else {
            alert('Ocurrió un error inesperado.');
          }
        }
      );
    } else {
      console.error('Formulario inválido', this.editForm.errors);
    }
  }
  


}
