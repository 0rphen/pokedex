import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonList } from '../entities/pokemonList.entity';
import { map } from 'rxjs/operators';
import { PokemonData } from '../entities/pokemon-data.entity';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private _http: HttpClient) { }

  getPokemon(id: number): Observable<PokemonData> {
    return this._http.get<PokemonData>(`${environment.pokeApiUrl}/pokemon/${id}`).pipe(
      map((pokemon: any) => new PokemonData(
        pokemon.id,
        pokemon.name,
        pokemon.base_experience,
        pokemon.height,
        pokemon.is_default,
        pokemon.order,
        pokemon.height,
        pokemon.sprites.front_default
      ))
    );
  }

  getPokemons(): Observable<PokemonList> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('limit', '20');
    headers.set('order', '1');
    return this._http.get<PokemonList>(`${environment.pokeApiUrl}/pokemon/`, { headers: headers });
  }
}
