import { describe, expect, test } from "@jest/globals";
import PokeTeamsService from "../../PokeTeams/pokeTeams.service";
import pokemonDataService from "../../PokemonData/pokemonData.service";
import pokemonDataSchema from "../../PokemonData/pokemonData.schema";
import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import mongoose from "mongoose";

beforeEach(() => {
  jest.setTimeout(10000);
  mongoose.connect("mongodb://0.0.0.0:27017/esoft5s");
});

afterAll(() => {
  mongoose.connection.close();
});

describe("pokemon Data Tests", () => {
  test("questão 1A", async () => {
    const result = await pokemonDataService.getPokemonData();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("type");
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("pokeIndex");
    expect(result[0]).toHaveProperty("height");
    expect(result[0]).toHaveProperty("weight");
    expect(result[0]).toHaveProperty("moves");
  });

  test("questão 1B testando com arquivo", async () => {
    const pokemon = await pokemonDataService.getPokemonData();
    const readPokeData = pokemon.map((poke) => ({
      name: poke.name,
    }));
    const pokemonJson = await readFile("pokemon.json", "utf-8");
    const result = JSON.parse(pokemonJson);
    const readPokeJson = result.map((poke) => ({
      name: poke.name,
    }));
    expect(readPokeData).toStrictEqual(readPokeJson);
  });

  test("questão 1B testando com BD", async () => {
    const pokemonInsert = await pokemonDataSchema.find({});
    const pokemonInsertName = pokemonInsert.map((poke) => ({
      name: poke.name,
    }));
    const pokemonJson = await readFile("pokemon.json", "utf-8");
    const result = JSON.parse(pokemonJson);
    const readPokeJson = result.map((poke) => ({
      name: poke.name,
    }));
    expect(pokemonInsertName).toEqual(readPokeJson);
  });

  test("questão 2", async () => {
    const pokemonSortedJson = await readFile("pokemonTipos.json", "utf-8");
    const sortedPokemon = JSON.parse(pokemonSortedJson);
    for (const type of sortedPokemon) {
      const pokemonType = sortedPokemon[type];
      const dexNumbers = pokemonType.map((pokemon) => pokemon.pokeIndex);
      expect(dexNumbers).toEqual([...dexNumbers].sort((a, b) => a - b));
    }
  });
  test("questõa 4", async () => {
    const type = "fire";
    const pokemon = await pokemonDataService.getPokemonByTypes(type);
    expect(pokemon).toBeDefined();
    expect(Array.isArray(pokemon)).toBe(true);
  });

  test("questão 6", async () => {
    const name = "pikachu"
    const pokemon = await pokemonDataService.getPokemonByName(name);
    expect(pokemon).toBeDefined();
    expect(Array.isArray(pokemon)).toBe(true);
  });
});

describe("pokemon Teams Tests", () => {
  const data = {
    trainerName: "Ash",
    team: [
      { name: "pikachu" },
      { name: "charizard" },
      { name: "squirtle" },
      { name: "bulbasaur" },
    ],
  };
  test("questão 3A", async () => {
    const team = await PokeTeamsService.createTeam(data);
    const teamJson = await readFile("team.json", "utf-8");
    const result = JSON.parse(teamJson);
    expect(result.trainerName).toBe(data.trainerName);
  });

  test("questão 3B", async () => {
    const team = await PokeTeamsService.getAllpokemon();
    const teamJson = await readFile("team.json", "utf-8");
    const result = JSON.parse(teamJson);
    expect(result).toEqual(team);
  });

  test("questão 3C", async () => {
    const team = await PokeTeamsService.getpokemonByTrainer(data.trainerName);
    const teamJson = await readFile("team.json", "utf-8");
    const result = JSON.parse(teamJson);
    expect(result).toEqual(team);
  });

  test("questão 3D", async () => {
    const newData = {
      trainerName: "Ash",
      team: [
        { name: "pikachu" },
        { name: "charizard" },
        { name: "squirtle" },
        { name: "bulbasaur" },
        { name: "pidgeot" },
      ],
    };
    const team = await PokeTeamsService.updateByTrainer(
      data.trainerName,
      newData
    );
    const teams = await PokeTeamsService.getAllpokemon();
    const teamJson = await readFile("team.json", "utf-8");
    const result = JSON.parse(teamJson);
    expect(result).toEqual(teams);
  });

  test("questão 3E", async () => {
    const teamFilePath = "team.json";
    const fileExists = existsSync(teamFilePath);
    expect(fileExists).toBe(true);
  });
});
