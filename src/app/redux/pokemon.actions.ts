import { createAction, props } from '@ngrx/store';
import { PokemonData } from '../entities/pokemon-data.entity';
import { PokemonList } from '../entities/pokemonList.entity';

export const getPokemonById = createAction(
  '[Pokemon Component] getPokemonById',
  props<{ id: number }>()
);

export const getPokemonByIdSuccess = createAction(
  '[Pokemon Component] getPokemonByIdSuccess',
  props<{ pokemon: PokemonData }>()
);

export const getPokemon = createAction(
  '[Pokemon Component] getPokemon'
);

export const getPokemonSuccess = createAction(
  '[Pokemon Component] getPokemonSuccess',
  props<{ pokemonList: PokemonList }>()
)

export const missingNo = createAction(
  '[Pokemon Component] missingNo',
  props<{ error: any }>()
);
