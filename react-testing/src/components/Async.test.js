import Async from "./Async";
import {render, screen} from "@testing-library/react";

describe('Async component', () => {
  it('renders posts if request succeeds', async () => {
    // create a mock function
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{id: 'p1', title: 'First post'}],
    });

    // Arrange
    render(<Async/>);

    const listItemElements = await screen.findAllByRole('listitem', {}, {timeout: 5000});
    expect(listItemElements).not.toHaveLength(0);
  });
});