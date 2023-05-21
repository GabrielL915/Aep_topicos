import pokemonDataSchema from "../PokemonData/pokemonData.schema";
import { writeFile, readFile, unlink } from "fs/promises";

class PokeTeamsService {
  public async createTeam(data: any) {
    try {
      const pokemonNames = data.team.map((element) =>
        element.name.toLowerCase()
      );
      const pokemon = await pokemonDataSchema.find({
        name: { $in: pokemonNames },
      });
      const pokeTeam = {
        trainerName: data.trainerName,
        team: pokemon,
      };
      const newPokemon = await writeFile(
        "team.json",
        JSON.stringify(pokeTeam, null, 2)
      );
      return newPokemon;
    } catch (error) {
      console.error("Nao foi possivel criar time ", error);
    }
  }
  public async getAllpokemon() {
    try {
      const pokemonTeam = await readFile("team.json", "utf-8");
      return JSON.parse(pokemonTeam);
    } catch (error) {
      console.error("Error ", error);
    }
  }

  public async getpokemonByTrainer(name: string) {
    try {
      const pokemonTeam = await readFile("team.json", "utf-8");
      const parsedTeam = JSON.parse(pokemonTeam);
      if (parsedTeam.trainerName.toLowerCase() === name.toLowerCase()) {
        return parsedTeam;
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  public async updateByTrainer(name: String, data: any) {
    try {
      const existingTeams = await readFile("team.json", "utf-8");
      const teams = JSON.parse(existingTeams);

      if (teams.trainerName.toLowerCase() === name.toLowerCase()) {
        teams.trainerName = data.trainerName;
        teams.team = data.team;
      }
      const updatedTeam = this.createTeam(teams);

      return updatedTeam;
    } catch (error) {
      console.error("Error ", error);
    }
  }

  public async deleteByTrainer(name: String) {
    try {
      const existingTeams = await readFile("team.json", "utf-8");
      const teams = JSON.parse(existingTeams);
      if (teams.trainerName.toLowerCase() === name.toLowerCase()) {
        await unlink("team.json");
      }
      return teams;
    } catch (error) {
      console.error("Error ", error);
    }
  }
}
export default new PokeTeamsService();
