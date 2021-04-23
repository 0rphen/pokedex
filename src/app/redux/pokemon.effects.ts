import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { PokeApiService } from '../service/poke-api.service';

import { AppState } from '../app.reducer';
import * as pokemonActions from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  constructor(private _action$: Actions,
    private _pokeApi$: PokeApiService,
    private _store$: Store<AppState>) { }

  getPokemon$ = createEffect(() => this._action$.pipe(
    ofType(pokemonActions.getPokemonById),
    withLatestFrom(this._store$.select('pokemon')),
    filter(([poke, pokemonStore]): boolean =>
      !pokemonStore.pokemonInfoList.entities[poke.id]),
    mergeMap(filter => this._pokeApi$.getPokemon(filter[0].id).pipe(
      map(pokemon => pokemonActions.getPokemonByIdSuccess(
        { pokemon: pokemon }
      )),
      catchError(err => {
        Swal.fire('' + err.status, err.error, 'error');
        return of(pokemonActions.missingNo({ error: err }));
      })
    ))
  ));

  getPokemonList$ = createEffect(() => this._action$.pipe(
    ofType(pokemonActions.getPokemon),
    mergeMap(() => this._pokeApi$.getPokemons().pipe(
      map(pokemonList => pokemonActions.getPokemonSuccess(
        { pokemonList: pokemonList }
      )),
      catchError(err => {
        Swal.fire('' + err.status, err.error, 'error');
        return of(pokemonActions.missingNo({ error: err }));
      })
    ))
  ));
}
