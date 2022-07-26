import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Score } from '../../scores/entities/score.entity';
import { AnalyserService } from '../../analyser/analyser.service';
import { ParamsValidationHelper } from '../../common/helpers/params-validation.helper';
import { CreateGridDto } from '../dto/create-grid.dto';
import { Grid } from '../entities/grid.entity';
import { GridService } from '../grid.service';
import { ScoresService } from '../../scores/scores.service';

describe('GridService', () => {
  const gridRepositoryMock = {
    save: jest.fn().mockResolvedValue({ id: 1 }),
    findOne: jest.fn().mockResolvedValue({ id: 1 }),
    createQueryBuilder: jest.fn(),
  };

  const scoreRepositoryMock = {
    save: jest.fn().mockResolvedValue({ id: 1 }),
    createQueryBuilder: jest.fn(),
  };

  let service: GridService;
  let paramsValidationHelper: ParamsValidationHelper;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AnalyserService,
        ScoresService,
        GridService,
        ParamsValidationHelper,
        {
          provide: getRepositoryToken(Grid),
          useValue: gridRepositoryMock,
        },
        {
          provide: getRepositoryToken(Score),
          useValue: scoreRepositoryMock,
        },
      ],
    }).compile();

    service = moduleRef.get<GridService>(GridService);
    paramsValidationHelper = moduleRef.get<ParamsValidationHelper>(
      ParamsValidationHelper,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a grid and return its Id', async () => {
    const saveSpy = jest.spyOn(scoreRepositoryMock, 'save');

    const create = {
      size: 3,
      values: '4, 2, 3, 2, 2, 1, 3, 2, 1',
    };

    const grid = paramsValidationHelper.checkGrid(create.size, create.values);

    const createGridDto: CreateGridDto = {
      ...create,
      grid,
    };

    const gridResult = await service.create(createGridDto);

    expect(gridResult).toEqual({ id: 1 });

    expect(saveSpy).toHaveBeenCalledTimes(9);
  });

  it("Shouldn't create a grid and return an error - The size of the grid must be equal to the number of values entered.", async () => {
    const create = {
      size: 4,
      values: '4, 2, 3, 2, 2, 1, 3, 2, 1',
    };

    try {
      paramsValidationHelper.checkGrid(create.size, create.values);
    } catch (error) {
      expect(error.message).toBe(
        'The size of the grid must be equal to the number of values entered.',
      );
    }
  });

  it("Shouldn't create a grid and return an error - In the raw data the range of measurements will always range from 0 (low heat) to 5 (high heat).", async () => {
    const create = {
      size: 3,
      values: '9, 2, 3, 2, 2, 1, 3, 2, 1',
    };

    try {
      paramsValidationHelper.checkGrid(create.size, create.values);
    } catch (error) {
      expect(error.message).toBe(
        'In the raw data the range of measurements will always range from 0 (low heat) to 5 (high heat).',
      );
    }
  });
});
