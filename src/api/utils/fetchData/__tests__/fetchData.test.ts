import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchData } from '../fetchData'; // Adjust the import path as needed

// Mock the axios module to control its behavior during testing
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  it('should successfully fetch data from the given URL', async () => {
    // Arrange
    const mockUrl = 'https://example.com/data.csv';
    const mockResponseData = 'column1,column2\nvalue1,value2\nvalue3,value4';
    mockedAxios.get.mockResolvedValue({ data: mockResponseData });

    // Act
    const data = await fetchData(mockUrl);

    // Assert
    expect(mockedAxios.get).toHaveBeenCalledWith(mockUrl, {
      headers: { Accept: 'text/csv, text/plain, */*' },
      transformResponse: expect.any(Function), // Check if it's a function
      withCredentials: false,
    });
    expect(data).toBe(mockResponseData);
  });

  it('should throw an error if the fetch request fails', async () => {
    // Arrange
    const mockUrl = 'https://example.com/error';
    const mockErrorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(mockErrorMessage));

    // Act and Assert
    await expect(fetchData(mockUrl)).rejects.toThrowError(
      `Failed to fetch data from ${mockUrl}. ${mockErrorMessage}`,
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(mockUrl, {
      headers: { Accept: 'text/csv, text/plain, */*' },
      transformResponse: expect.any(Function), // Check if it's a function
      withCredentials: false,
    });
  });

  it('should throw an error with a generic message if the error is not an Error object', async () => {
    // Arrange
    const mockUrl = 'https://example.com/other-error';
    const mockNonError = 'Something went wrong';
    mockedAxios.get.mockRejectedValue(mockNonError);

    // Act and Assert
    await expect(fetchData(mockUrl)).rejects.toThrowError(
      `Failed to fetch data from ${mockUrl}. ${mockNonError}`,
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(mockUrl, {
      headers: { Accept: 'text/csv, text/plain, */*' },
      transformResponse: expect.any(Function), // Check if it's a function
      withCredentials: false,
    });
  });
});
