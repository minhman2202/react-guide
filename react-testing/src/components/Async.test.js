import Async from "./Async";
import {render, screen} from "@testing-library/react";

describe('Async component', () => {
  it('renders posts if request succeeds', async () => {
    // Arrange
    render(<Async/>);

    const listItemElements = await screen.findAllByRole('listitem', {}, {timeout: 5000});
    expect(listItemElements).not.toHaveLength(0);
  });
});