import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as reducer from './pokemon.reducer';

export const selectPokemon = createFeatureSelector<reducer.State>('pokemon');

export const selectEntity = createSelector(
  selectPokemon,
  (state: reducer.State) => state.pokemonInfoList.entities[state.pokemonId]
);
