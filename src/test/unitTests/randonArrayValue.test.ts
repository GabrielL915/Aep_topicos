import { ErrorMessages } from "../../randomArrayValue/errorMessagem.enum";
import { ArrayType } from "../../randomArrayValue/types/array.types";
import { randomArrayValues } from "../../randomArrayValue/randomArrayValue";

const array: Array<ArrayType> = [
  { nome: "Caneta", qtde: 10, preco: 7.99 },
  { nome: "Impressora", qtde: 0, preco: 649.5 },
  { nome: "Caderno", qtde: 4, preco: 27.1 },
];

describe("Random Array Value", () => {
  test("retornar erro se index for maior que o numero do array", () => {
    const indexNumbers = 10;
    const result = new randomArrayValues();
    result.setArray(array);
    result.setIndexNumber(indexNumbers);
    expect(result.getRandomObjects()).toBe(ErrorMessages.INVALID_NUMBER_RANGE);
  });

  test("retornar erro se index for menor que 1", () => {
    const indexNumbers = 0;
    const result = new randomArrayValues();
    result.setArray(array);
    result.setIndexNumber(indexNumbers);
    expect(result.getRandomObjects()).toBe(ErrorMessages.INVALID_NUMBER);
  });

  test("retornar erro se array for vazio", () => {
    const array = [];
    const indexNumbers = 2;
    const result = new randomArrayValues();
    result.setArray(array);
    result.setIndexNumber(indexNumbers);
    expect(result.getRandomObjects()).toBe(ErrorMessages.INVALID_ARRAY);
  });
});
