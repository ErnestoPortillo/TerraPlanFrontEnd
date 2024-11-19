import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/Proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarproyecto',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './listarproyecto.component.html',
  styleUrls: ['./listarproyecto.component.css'],
})
export class ListarProyectoComponent implements OnInit {
  proyectoDataSource: MatTableDataSource<Proyecto> = new MatTableDataSource();
  paginatedProyectos: Proyecto[] = []; // Proyectos visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) proyectoPaginator!: MatPaginator;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.loadProyectos();
  }

  // Carga la lista de Proyectos
  loadProyectos(): void {
    this.proyectoService.list().subscribe((data) => {
      this.proyectoDataSource.data = data;
      this.updatePaginatedProyectos();
    });
  }

  // Actualiza la lista de Proyectos según la página actual
  updatePaginatedProyectos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProyectos = this.proyectoDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Proyectos
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.proyectoDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedProyectos();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProyectos();
  }

  // Elimina un Proyecto por ID
  deleteProyecto(idProyecto: number): void {
    this.proyectoService.delete(idProyecto).subscribe(() => {
      this.loadProyectos(); // Refresca la lista después de eliminar
    });
  }
}
