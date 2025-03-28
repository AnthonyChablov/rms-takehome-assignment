import '@testing-library/jest-dom/extend-expect';
import { vi, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
