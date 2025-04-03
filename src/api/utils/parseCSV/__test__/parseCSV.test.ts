import { parseCSV } from '../parseCSV';
import { describe, it, expect, vi } from 'vitest';
import Papa, { ParseResult } from 'papaparse';

interface SimpleRow {
  id: number;
  name: string;
  value: number;
}

// Mock Papa.parse to control its behavior in tests
vi.mock('papaparse');
const mockedPapaParse = Papa.parse as jest.Mock;

describe('parseCSV', () => {
  it('should resolve with parsed data when parsing is successful', async () => {
    // Arrange
    const csvString = 'id,name,value\n1,Alice,10\n2,Bob,20';
    const mockParseResult: ParseResult<SimpleRow> = {
      data: [
        { id: 1, name: 'Alice', value: 10 },
        { id: 2, name: 'Bob', value: 20 },
      ],
      errors: [],
      meta: {
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
        cursor: 32,
      },
    };
    mockedPapaParse.mockImplementation((_, config) => {
      config.complete!(mockParseResult);
    });

    // Act
    const parsedData = await parseCSV(csvString);

    // Assert
    expect(mockedPapaParse).toHaveBeenCalledWith(csvString, expect.any(Object));
    expect(parsedData).toEqual([
      { id: 1, name: 'Alice', value: 10 },
      { id: 2, name: 'Bob', value: 20 },
    ]);
  });

  it('should reject with an error when parsing has errors', async () => {
    // Arrange
    const csvString = 'id,name,value\n1,Alice,abc\n2,Bob,20';
    const mockParseResult: ParseResult<SimpleRow> = {
      data: [],
      errors: [
        {
          row: 1,
          message: 'Type conversion error',
          code: 'TooFewFields',
          type: 'FieldMismatch',
        },
      ],
      meta: {
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
        cursor: 32,
      },
    };
    mockedPapaParse.mockImplementation((_, config) => {
      config.complete!(mockParseResult);
    });

    // Act & Assert
    await expect(parseCSV(csvString)).rejects.toThrow(
      'CSV Parsing failed: Type conversion error',
    );
    expect(mockedPapaParse).toHaveBeenCalledWith(csvString, expect.any(Object));
  });

  it('should reject with an error when Papa.parse calls the error callback', async () => {
    // Arrange
    const csvString = 'invalid csv data';
    const mockError = new Error('Something went wrong during parsing');
    mockedPapaParse.mockImplementation((_, config) => {
      config.error!(mockError);
    });

    // Act & Assert
    await expect(parseCSV(csvString)).rejects.toThrow(
      'Something went wrong during parsing',
    );
    expect(mockedPapaParse).toHaveBeenCalledWith(csvString, expect.any(Object));
  });

  it('should filter out empty rows from the parsed data', async () => {
    // Arrange
    const csvString = 'id,name,value\n1,Alice,10\n\n2,Bob,20\n,,\n3,Charlie,30';
    const mockParseResult: ParseResult<SimpleRow | any> = {
      data: [
        { id: 1, name: 'Alice', value: 10 },
        {},
        { id: 2, name: 'Bob', value: 20 },
        {},
        { id: 3, name: 'Charlie', value: 30 },
      ],
      errors: [],
      meta: {
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
        cursor: 60,
      },
    };
    mockedPapaParse.mockImplementation((_, config) => {
      config.complete!(mockParseResult);
    });

    // Act
    const parsedData = await parseCSV(csvString);

    // Assert
    expect(parsedData).toEqual([
      { id: 1, name: 'Alice', value: 10 },
      { id: 2, name: 'Bob', value: 20 },
      { id: 3, name: 'Charlie', value: 30 },
    ]);
  });
});
