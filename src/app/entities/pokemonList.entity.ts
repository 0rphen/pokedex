import { Uri } from './uri.entity';

export class PokemonList {
  constructor(
    public count: number,
    public next: string,
    public previous: string,
    public results: Uri[]
  ) { }
}
