import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguroService } from '../../service/seguro.service';
import { Seguro } from '../../models/seguro.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insurance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {
  insurances: Seguro[] = [];
  filteredInsurances: Seguro[] = [];  // Lista filtrada
  searchText: string = '';  // Texto de búsqueda

  constructor(private seguroService: SeguroService) {}

  ngOnInit() {
    this.loadInsurances();
  }

  loadInsurances() {
    this.seguroService.getSeguros().subscribe(
      data => {
        console.log('Data received from API:', data);
        this.insurances = data;
        this.filteredInsurances = data;  // Inicialmente, mostrar todos los asegurados
      },
      error => {
        console.error('Error fetching insurances:', error);
      }
    );
  }

  filterInsurances() {
    this.filteredInsurances = this.insurances.filter(seguro =>
      seguro.numeroIdentificacion.toString().includes(this.searchText)
    );
  }

  deleteInsurance(id: number) {
    this.seguroService.deleteSeguro(id).subscribe(() => {
      this.loadInsurances();  // Reload the list after deletion
    });
  }
}
