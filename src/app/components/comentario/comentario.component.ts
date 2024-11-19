import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarComentarioComponent } from './listarcomentario/listarcomentario.component';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarComentarioComponent],
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
})
export class ComentarioComponent {
  constructor(public route: ActivatedRoute) {}
}
