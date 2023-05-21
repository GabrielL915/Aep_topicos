import pokemonDataController from "./PokemonData/pokemonData.controller";
import { Router } from "express";
import pokeTeamsController from "./PokeTeams/pokeTeams.controller";

const routes = Router();
//questão 1A
routes.get("/pokemon", pokemonDataController.getData);
//questão 1B
routes.post("/pokemon", pokemonDataController.insertPokemon);
//questão 2
routes.get("/pokemon/types", pokemonDataController.getTypesOrderByDex);
//questão 4
routes.get("/pokemon/types/:type", pokemonDataController.getPokemonByTypes);
//questão 5
routes.get("/pokemon/index/:index", pokemonDataController.getPokemonByIndex);
//questão 6
routes.get("/pokemon/name/:name", pokemonDataController.getPokemonByName);

//questão 3A
routes.post("/teams", pokeTeamsController.createPokemonTeam);
//questão 3B
routes.get("/teams", pokeTeamsController.getAllPoke);
//questão 3C
routes.get("/teams/trainer/:name", pokeTeamsController.getPokeByTrainer);
//questão 3D
routes.put("/teams/trainer/:name", pokeTeamsController.updateByTrainer);
//questão 3E
routes.delete("/teams/trainer/:name", pokeTeamsController.deleteByTrainer);

export default routes;
