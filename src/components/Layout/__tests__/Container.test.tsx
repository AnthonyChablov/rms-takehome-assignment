import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Container from '../Container';

describe('Container.tsx', () => {
  it('should render in the DOM', () => {
    // Arrange
    const child = <div>testData</div>;

    // Act
    render(<Container>{child}</Container>);
    const containerComponent = screen.getByText('testData');

    // Assert
    expect(containerComponent).toBeInTheDocument();
  });

  it('should render with custom classnames', () => {
    // Arrange
    const customClassName = 'custom-class-name';
    const childText = '123';
    const child = <div>{childText}</div>;

    // Act
    render(<Container className={`${customClassName}`}>{child}</Container>);
    const containerComponent = screen.getByText(`123`);

    // Assert
    expect(containerComponent.parentNode).toHaveClass(`${customClassName}`);
  });

  it('should render with children', () => {
    // Arrange
    const childText = '123';
    const child = <div>{childText}</div>;

    // Act
    render(<Container>{child}</Container>);
    const containerChild = screen.getByText(childText);

    // Assert
    expect(containerChild).toBeInTheDocument();
    expect(containerChild.textContent).toEqual(childText);
  });
});
