import pokemonDataService from "./pokemonData.service";
import { Request, Response } from "express";

class pokemonDataController {
  public async getData(req: Request, res: Response) {
    const pokemon = await pokemonDataService.getPokemonData();
    return res.status(200).json(pokemon);
  }
  public async insertPokemon(req: Request, res: Response) {
    const pokemon = await pokemonDataService.pokemonInsert();
    return res.status(201).json(pokemon);
  }
  public async getTypesOrderByDex(req: Request, res: Response) {
    const pokemon = await pokemonDataService.getByTypesOrderByDex();
    return res.status(200).json(pokemon);
  }
  public async getPokemonByTypes(req: Request, res: Response) {
    const pokemon = await pokemonDataService.getPokemonByTypes(req.params.type);
    return res.status(200).json(pokemon);
  }
  public async getPokemonByIndex(req: Request, res: Response) {
    const pokemon = await pokemonDataService.getPokemonByIndex(Number(req.params.index));
    return res.status(200).json(pokemon);
  }
  public async getPokemonByName(req: Request, res: Response) {
    const pokemon = await pokemonDataService.getPokemonByName(req.params.index);
    return res.status(200).json(pokemon);
  }
}

export default new pokemonDataController();
