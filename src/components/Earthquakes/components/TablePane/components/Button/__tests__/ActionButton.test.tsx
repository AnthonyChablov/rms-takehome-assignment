import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActionButton from '../ActionButton';

describe('ActionButton.tsx', () => {
  it('should render in the DOM', () => {
    // Arrange
    // No specific arrangement needed for basic rendering

    // Act
    render(<ActionButton onClick={() => {}} />);

    // Assert
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should display the provided title', () => {
    // Arrange
    const titleText = 'Click Me';

    // Act
    render(<ActionButton onClick={() => {}} title={titleText} />);

    // Assert
    const buttonElement = screen.getByRole('button', { name: titleText });
    expect(buttonElement).toHaveTextContent(titleText);
  });

  it('should be disabled when the disabled prop is true', () => {
    // Arrange
    const handleClick = vi.fn(); // Mock function to track calls

    // Act
    render(<ActionButton onClick={handleClick} disabled={true} />);
    const buttonElement = screen.getByRole('button');

    // Assert
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement); // Simulate a click event
    expect(handleClick).not.toHaveBeenCalled(); // Ensure the click handler is not called
  });

  it('should apply the provided className', () => {
    // Arrange
    const customClassName = 'custom-button-class';

    // Act
    render(<ActionButton onClick={() => {}} className={customClassName} />);

    // Assert
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(customClassName);
  });

  it('should call the onClick handler when clicked', () => {
    // Arrange
    const handleClick = vi.fn(); // Mock function to track calls

    // Act
    render(<ActionButton onClick={handleClick} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render children if provided', () => {
    // Arrange
    const childrenElement = <span>Child Element</span>;

    // Act
    render(<ActionButton onClick={() => {}}>{childrenElement}</ActionButton>);

    // Assert
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  it('should not throw an error if no title is provided', () => {
    // Arrange
    const handleClick = vi.fn(); // Mock function to track calls

    // Act & Assert
    expect(() => {
      render(<ActionButton onClick={handleClick} />);
    }).not.toThrowError();
  });

  it('should render title before children', () => {
    // Arrange
    const titleText = 'Button Title';
    const childrenElement = <span>Child Content</span>;

    // Act
    render(
      <ActionButton onClick={() => {}} title={titleText}>
        {childrenElement}
      </ActionButton>,
    );

    // Assert
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(`${titleText}Child Content`);

    // To specifically check the order in the DOM, we can use a more direct approach:
    const buttonTextNodes = Array.from(buttonElement.childNodes).map(
      (node) => node.textContent,
    );
    expect(buttonTextNodes[0]).toBe(titleText);
    expect(buttonTextNodes[1]).toBe('Child Content');
  });
});
