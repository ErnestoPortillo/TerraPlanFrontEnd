import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrls: ['./listarcomentario.component.css'],
})
export class ListarComentarioComponent implements OnInit {
  comentarios: Comentario[] = []; // Lista completa de comentarios
  paginatedComentarios: Comentario[] = []; // Comentarios para la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) comentarioPaginator!: MatPaginator;

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.loadComentarios();
  }

  // Cargar comentarios
  loadComentarios(): void {
    this.comentarioService.list().subscribe((data) => {
      this.comentarios = data;
      this.updatePaginatedComentarios();
    });
  }

  // Actualizar los comentarios para la página actual
  updatePaginatedComentarios(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedComentarios = this.comentarios.slice(startIndex, endIndex);
  }

  // Aplicar filtro
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredData = this.comentarios.filter((comentario) =>
      comentario.contenidoComentario.toLowerCase().includes(filterValue)
    );
    // Ajustar la paginación al aplicar filtro
    this.paginatedComentarios = filteredData.slice(0, this.pageSize);
  }

  // Cambiar de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedComentarios();
  }

  // Eliminar comentario
  deleteComentario(idComentario: number): void {
    this.comentarioService.delete(idComentario).subscribe(() => {
      this.loadComentarios(); // Refrescar la lista
    });
  }
}
