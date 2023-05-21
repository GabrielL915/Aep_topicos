import { Request, Response } from "express";
import poketeamsService from "./pokeTeams.service";

class PokemonTeamController {
  public async createPokemonTeam(req: Request, res: Response) {
    const pokemon = await poketeamsService.createTeam(req.body);
    return res.status(201).send(pokemon);
  }
  public async getAllPoke(req: Request, res: Response) {
    const pokemon = await poketeamsService.getAllpokemon();
    return res.status(200).json(pokemon);
  }
  public async getPokeByTrainer(req: Request, res: Response) {
    const pokemon = await poketeamsService.getpokemonByTrainer(req.params.name);
    return res.status(200).json(pokemon);
  }

  public async updateByTrainer(req: Request, res: Response) {
    const pokemon = await poketeamsService.updateByTrainer(req.params.name, req.body);
    return res.status(200).json(pokemon);
  }

  public async deleteByTrainer(req: Request, res: Response) {
    const pokemon = await poketeamsService.deleteByTrainer(req.params.name);
    return res.status(200).json(pokemon);
  }
}

export default new PokemonTeamController();
