import { Injectable } from '@nestjs/common';

@Injectable()
export class ParamsValidationHelper {
  checkGrid(size: number, values: string) {
    const arrayOfStringValues = values.split(',');
    const arrayValuesConvertedToInteger = arrayOfStringValues.map(
      (value) => +value,
    );
    this.validateSize(size, arrayValuesConvertedToInteger);
    this.validateRange(arrayValuesConvertedToInteger);
    return this.valuesToMatrix(size, arrayValuesConvertedToInteger);
  }

  private validateSize(size: number, values: number[]) {
    if (Math.pow(size, 2) != values.length) {
      throw new Error(
        'The size of the grid must be equal to the number of values entered.',
      );
    }
  }

  private validateRange(values: number[]) {
    const lowestValueofHeat = process.env['LOWEST_VALUE_OF_HEAT'];
    const highestValueofHeat = process.env['HIGHEST_VALUE_OF_HEAT'];
    values.map((value) => {
      if (+value < +lowestValueofHeat || +value > +highestValueofHeat) {
        throw new Error(
          'In the raw data the range of measurements will always range from 0 (low heat) to 5 (high heat).',
        );
      }
    });
  }
  private valuesToMatrix(size: number, values: number[]) {
    return values.reduce(
      (rows, key, index) =>
        (index % size == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      [],
    );
  }
}
