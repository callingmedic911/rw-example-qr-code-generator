import { render } from '@redwoodjs/testing/web'

import Button from './Button'

describe('Button', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Button>Check</Button>)
    }).not.toThrow()
  })

  it('renders custom tag using `as`', () => {
    const buttonComponent = render(<Button as="div">Check</Button>)
    const customButton = buttonComponent.getByTestId('custom-button')

    expect(customButton).toHaveTextContent('Check')
  })
})
