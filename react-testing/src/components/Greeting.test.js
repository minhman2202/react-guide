import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Greeting from "./Greeting";

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting/>);

    // Act
    // ... nothing

    // Assert
    const greetingElement = screen.getByText(/hello, world!/i);
    expect(greetingElement).toBeInTheDocument();
  });

  test('renders a default greeting message if the button was NOT clicked', () => {
    render(<Greeting/>);
    const defaultMessage = screen.getByText('It\'s good to see you!', {exact: false});
    expect(defaultMessage).toBeInTheDocument();
  });

  test('renders a changed greeting message if the button was clicked', () => {
    // Arrange
    render(<Greeting/>);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const defaultMessage = screen.getByText('Changed!');
    expect(defaultMessage).toBeInTheDocument();
  });

  test('does not render the default message if the button was clicked', () => {
    // Arrange
    render(<Greeting/>);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const defaultMessage = screen.queryByText('It\'s good to see you!', {exact: false});
    expect(defaultMessage).toBeNull();
  });
});