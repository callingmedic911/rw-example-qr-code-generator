import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TabSelector from './TabSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TabSelector', () => {
  it('renders successfully', async () => {
    const tabSelectorComponent = render(
      <TabSelector
        options={['One', 'Two', 'Three']}
        defaultValue="One"
        currentValue="One"
        onChange={() => null}
      />
    )
    expect(() => tabSelectorComponent).not.toThrow()

    // Length should 2 because one is within nav for large screen and another inside select for small screen
    expect(screen.getAllByText('One').length).toBe(2)
    expect(screen.getAllByText('Two').length).toBe(2)
    expect(screen.getAllByText('Three').length).toBe(2)
  })

  it('calls onChange when clicking a button', () => {
    const onChange = jest.fn()
    const tabSelectorComponent = render(
      <TabSelector
        options={['One', 'Two', 'Three']}
        defaultValue="One"
        currentValue="One"
        onChange={() => onChange}
      />
    )

    tabSelectorComponent.getByTestId('tab-Two').click()

    waitFor(() => expect(onChange).toHaveBeenCalledWith('Two'))
  })
})
