import { ActionReducerMap } from '@ngrx/store';
import * as pokemon from './redux/pokemon.reducer';

export interface AppState {
  pokemon: pokemon.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pokemon: pokemon.pokemonReducer
};
