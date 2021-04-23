import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { PokemonData } from '../entities/pokemon-data.entity';
import { PokemonList } from '../entities/pokemonList.entity';
import * as pokemonAction from './pokemon.actions';

export interface PokeState extends EntityState<PokemonData> {
}

export function selectPokemonId(p: PokemonData): number {
  return p.id;
}

export const adapter: EntityAdapter<PokemonData> = createEntityAdapter<PokemonData>({
})

export const pokeInitialState: PokeState = adapter.getInitialState();

export interface State {
  pokemonId: number;
  pokemonInfoList: PokeState;
  pokemonList?: PokemonList;
}

export const initialState: State = {
  pokemonId: 0,
  pokemonInfoList: pokeInitialState
}

const _pokemonReducer = createReducer(
  initialState,
  on(pokemonAction.getPokemonById, (state, { id }) => ({ ...state, pokemonId: id })),
  on(pokemonAction.getPokemonByIdSuccess, (state, { pokemon }) => ({
    ...state, pokemonInfoList: adapter.addOne(pokemon, state.pokemonInfoList)
  })),
  on(pokemonAction.getPokemonSuccess, (state, { pokemonList }) => ({
    ...state, pokemonList: pokemonList
  })),
  on(pokemonAction.missingNo, (state, _) => ({ ...state, pokemonId: 0 }))
);

export function pokemonReducer(state: State | undefined, action: Action): State {
  return _pokemonReducer(state, action);
}
