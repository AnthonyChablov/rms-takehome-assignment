import { render, screen } from '@testing-library/react';
import TablePane from '../TablePane';

describe('TablePane', () => {
  it('should render TablePane in the document', () => {
    // Arrange
    const mockData = [
      { id: 1, name: 'Item 1', value: 10 },
      { id: 2, name: 'Item 2', value: 20 },
    ];
    const title = 'USGS Most Recent Earthquakes (Top 100)';

    // Act
    render(<TablePane data={mockData} title={title} />);

    // Assert
    // Check if an element containing the text "TablePane" is present in the document.
    const element = screen.getByText(title);
    expect(element.parentNode).toBeInTheDocument();
  });

  it('should render with title', () => {
    // Arrange
    const mockData = [
      { id: 1, name: 'Item 1', value: 10 },
      { id: 2, name: 'Item 2', value: 20 },
    ];
    const title = 'USGS Most Recent Earthquakes (Top 100)';

    // Act
    render(<TablePane data={mockData} title={title} />);

    // Assert
    const element = screen.getByText(title);
    expect(element.textContent).toEqual(title);
  });
});
