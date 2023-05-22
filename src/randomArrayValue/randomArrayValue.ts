import { ErrorMessages } from "./errorMessagem.enum";
import { ArrayType } from "./types/array.types";

const produtos1: any = [
  { nome: "Caneta", qtde: 10, preco: 7.99 },
  { nome: "Impressora", qtde: 0, preco: 649.5 },
  { nome: "Caderno", qtde: 4, preco: 27.1 },
  { nome: "Lapis", qtde: 3, preco: 5.82 },
  { nome: "Tesoura", qtde: 1, preco: 19.99 },
  { nome: "Estojo", qtde: 7, preco: 9.99 },
  { nome: "Teclado", qtde: 2, preco: 609.99 },
  { nome: "Tenis", qtde: 3, preco: 350.99 },
  { nome: "Fone", qtde: 5, preco: 198.99 },
  { nome: "Mochila", qtde: 15, preco: 150.99 },
];
export class randomArrayValues {
  private _array: Array<ArrayType> = [];
  private _indexNumber: number;

  public setArray(array: ArrayType[]): void {
    this._array = array;
  }

  public setIndexNumber(indexNumbers: number): void {
    this._indexNumber = indexNumbers;
  }

  public getRandomObjects(): Array<ArrayType> | ErrorMessages {
    let result: Array<ArrayType> = [];

    const coditions: any = {
      ArrayZero: (array: Array<ArrayType>, indexNumbers: number) => {
        if (array.length === 0) return ErrorMessages.INVALID_ARRAY;
      },
      RangeInvalido: (array: Array<ArrayType>, indexNumbers: number) => {
        if (indexNumbers > array.length)
          return ErrorMessages.INVALID_NUMBER_RANGE;
      },
      NumberInvalido: (array: Array<ArrayType>, indexNumbers: number) => {
        if (indexNumbers < 1) return ErrorMessages.INVALID_NUMBER;
      },
    };

    if (
      coditions.ArrayZero(this._array, this._indexNumber) ||
      coditions.RangeInvalido(this._array, this._indexNumber) ||
      coditions.NumberInvalido(this._array, this._indexNumber)
    ) {
      return (
        coditions.ArrayZero(this._array, this._indexNumber) ||
        coditions.RangeInvalido(this._array, this._indexNumber) ||
        coditions.NumberInvalido(this._array, this._indexNumber)
      );
    }

    while (result.length < this._indexNumber) {
      let randomIndex = Math.floor(Math.random() * this._array.length);
      let randomObject: any = this._array[randomIndex];
      if (!result.includes(randomObject)) {
        result.push(randomObject);
      }
    }
    return result;
  }
}

const random = new randomArrayValues();
random.setArray([]);
random.setIndexNumber(5);

console.log(random.getRandomObjects());