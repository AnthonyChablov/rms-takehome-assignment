import Papa, { ParseResult } from 'papaparse';

/**
 * Parses a CSV string into an array of objects using Papaparse.
 * The type of the resulting objects is inferred from the CSV header row.
 * @param csvString - The raw CSV data string.
 * @returns A promise that resolves to an array of objects, where each object
 * represents a row and its keys are the CSV headers.
 * @throws Throws an error if parsing fails.
 */
export const parseCSV = <T extends Record<string, any>>(
  csvString: string,
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvString, {
      header: true, // Assumes the first row is the header
      dynamicTyping: true, // Automatically convert numbers, booleans
      skipEmptyLines: true, // Ignore empty lines
      complete: (results: ParseResult<T>) => {
        if (results.errors.length > 0) {
          // Log all errors for debugging
          console.error('CSV Parsing Errors:', results.errors);
          // Reject with the first error message for simplicity
          reject(new Error(`CSV Parsing failed: ${results.errors[0].message}`));
        } else {
          // Filter out potential empty rows if skipEmptyLines didn't catch them
          const validData = results.data.filter(
            (row) => Object.keys(row).length > 0,
          );
          resolve(validData);
        }
      },
      error: (error: Error) => {
        // console.error('CSV Parsing Error:', error);
        reject(error);
      },
    });
  });
};
