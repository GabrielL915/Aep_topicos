import { writeFile, readFile } from "fs/promises";
import pokemonDataSchema from "./pokemonData.schema";

class PokemonDataService {
  public async getPokemonData() {
    try {
      const response = await fetch("http://localhost:3000/pokemons-data");
      const data = await response.json();
      const pokemonData = data.map((poke) => ({
        name: poke.name,
        type: poke.types.map((pokemonTypes) => pokemonTypes.type.name),
        status: poke.stats.map((pokemonStatus) => ({
          nameStatus: pokemonStatus.stat.name,
          statusValues: pokemonStatus.base_stat,
        })),
        pokeIndex: poke.game_indices[9].game_index,
        height: poke.height,
        weight: poke.weight,
        moves: poke.moves
          .map((pokemonMoves) => pokemonMoves.move.name)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4),
      }));
      return pokemonData;
    } catch (error) {
      console.error("Error in getPokemonData", error);
    }
  }

  public async pokemonInsert() {
    try {
      const pokemon = await this.getPokemonData();
      const pokemonFile = await this.pokemonCreateJson(pokemon);
      const pokemonInsert = await this.pokemonInsertMany(pokemon);
      return pokemonInsert;
    } catch (error) {
      console.error("Erro poke", error);
    }
  }

  public async pokemonCreateJson(pokemon: any) {
    try {
      const pokemonFile = await writeFile(
        "pokemon.json",
        JSON.stringify(pokemon, null, 2)
      );
      const pokemonRead = await readFile("pokemon.json", "utf-8");
      const result = JSON.parse(pokemonRead);
      return result;
    } catch (error) {
      console.error("Erro poke", error);
    }
  }

  public async pokemonInsertMany(pokemon: any) {
    try {
      const pokemonInsert = pokemonDataSchema.insertMany(pokemon);
      return pokemonInsert;
    } catch (error) {
      console.error("Erro poke", error);
    }
  }
  public async getByTypesOrderByDex() {
    try {
      const pokemon = await readFile("pokemon.json");
      const pokeString = pokemon.toString();
      const pokeParse = JSON.parse(pokeString);
      const pokemonTipos = pokeParse.reduce((pokemonAcc, pokemonAtual) => {
        pokemonAcc[pokemonAtual.type] = pokemonAcc[pokemonAtual.type] || [];
        pokemonAcc[pokemonAtual.type].push(pokemonAtual);
        pokemonAcc[pokemonAtual.type].sort((a, b) => a.pokeIndex - b.pokeIndex);
        return pokemonAcc;
      });
      const pokeResults = await writeFile(
        "pokemonTipos.json",
        JSON.stringify(pokemonTipos, null, 2)
      );
      return pokeResults;
    } catch (error) {
      console.error("Erro in order Types ", error);
    }
  }

  public async getPokemonByTypes(type: String) {
    try {
      const pokeData = await pokemonDataSchema.find({ type: type });
      return pokeData;
    } catch (error) {
      console.error("Error ", error);
    }
  }

  public async getPokemonByIndex(index: Number) {
    try {
      const pokeData = await pokemonDataSchema.find({ pokeIndex: index });
      return pokeData;
    } catch (error) {
      console.error("Error ", error);
    }
  }

  public async getPokemonByName(name: String) {
    try {
      const pokeData = await pokemonDataSchema.find({ name: name });
      return pokeData;
    } catch (error) {
      console.error("Error ", error);
    }
  }
}
export default new PokemonDataService();
