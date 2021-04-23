import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppState } from './app.reducer';
import * as pokemonReducer from './redux/pokemon.reducer';
import * as pokeAction from './redux/pokemon.actions';
import { selectEntity } from './redux/pokemon.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  pokemon$: Observable<pokemonReducer.State> = this._store.select('pokemon');
  poke$: Observable<any> = this._store.select(selectEntity);
  subs: Subscription = new Subscription();

  formBuilder: FormGroup = new FormGroup({
    'pokemonId': new FormControl(null),
    'id': new FormControl(null, [Validators.pattern('[0-9]*'), Validators.required])
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.dispatch(pokeAction.getPokemon());
    this.subs.add(this.formBuilder.get('pokemonId')?.valueChanges.subscribe(id => {
      this._store.dispatch(pokeAction.getPokemonById({ id: id }));
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getPokemon(): void {
    let id = this.formBuilder.get('id')?.value;
    this._store.dispatch(pokeAction.getPokemonById({ id: id }));
  }
}
