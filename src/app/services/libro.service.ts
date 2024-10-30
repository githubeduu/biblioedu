import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
    id: string;
    titulo: string;
    autor: string;
    añoPublicacion: number;
    genero: string;
}

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private apiUrl = 'http://localhost:3000/libros';

    constructor(private http: HttpClient) {}

    getLibros(): Observable<Libro[]> {
        return this.http.get<Libro[]>(this.apiUrl);
    }

    getLibro(id: string): Observable<Libro> {
        return this.http.get<Libro>(`${this.apiUrl}/${id}`);
    }

    addLibro(libro: Libro): Observable<Libro> {
        return this.http.post<Libro>(this.apiUrl, libro);
    }

    updateLibro(id: string, libro: Libro): Observable<Libro> {
        return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
    }

    deleteLibro(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
