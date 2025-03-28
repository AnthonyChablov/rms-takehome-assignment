import { render, screen } from '@testing-library/react';
import TablePane from '../TablePane'; 

describe('TablePane', () => {
  test('should render TablePane in the document', () => {
    render(<TablePane />);

    // Check if "TablePane" text is in the document
    const element = screen.getByText('TablePane');
    expect(element).toBeInTheDocument();
  });
});
