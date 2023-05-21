import { Schema, model } from "mongoose";

const PokemonDataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: [
      {
        type: String,
        required: true,
      },
    ],
    status: [
      {
        nameStatus: {
          type: String,
          required: true,
        },
        statusValues: {
          type: Number,
          required: true,
        },
      },
    ],
    pokeIndex: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    moves: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("PokemonSchema", PokemonDataSchema);
