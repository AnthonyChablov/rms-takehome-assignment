import { describe, it, expect, vi } from 'vitest';
import { getEarthquakeApiUrl } from '../earthquakeUrl';

describe('getEarthquakeApiUrl()', () => {
  const BASE_URL: string =
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

  it('should return the base URL in production environment', () => {
    // Arrange
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const consoleSpy = vi.spyOn(console, 'log');

    // Act
    const apiUrl = getEarthquakeApiUrl();

    // Assert
    expect(apiUrl).toBe(BASE_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Running in production mode. Using URL: ${BASE_URL}`,
    );

    // Cleanup
    process.env.NODE_ENV = originalNodeEnv;
    consoleSpy.mockRestore();
  });

  it('should return the proxied URL in development environment', () => {
    // Arrange
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const consoleSpy = vi.spyOn(console, 'log');

    // Act
    const apiUrl = getEarthquakeApiUrl();

    // Assert
    expect(apiUrl).toBe(PROXY_URL + BASE_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Running in development mode. Using URL: ${PROXY_URL + BASE_URL}`,
    );

    // Cleanup
    process.env.NODE_ENV = originalNodeEnv;
    consoleSpy.mockRestore();
  });

  it('should return the base URL when NODE_ENV is not explicitly set', () => {
    // Arrange
    const originalNodeEnv = process.env.NODE_ENV;
    delete process.env.NODE_ENV; // Simulate NODE_ENV being undefined
    const consoleSpy = vi.spyOn(console, 'log');

    // Act
    const apiUrl = getEarthquakeApiUrl();

    // Assert
    expect(apiUrl).toBe(BASE_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Running in production mode. Using URL: ${BASE_URL}`,
    );

    // Cleanup
    process.env.NODE_ENV = originalNodeEnv; // Restore if it was initially defined
    consoleSpy.mockRestore();
  });
});
