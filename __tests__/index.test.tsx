import { render, screen } from '@testing-library/react'
import Swap from '../src/pages/swap'
import '@testing-library/jest-dom'

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe('Home', () => {
  it('renders a heading', () => {

    render(<Swap updates={[]} path={[]} tokens={[]} />)

    const inputNode1 = screen.getByLabelText('SLP-WETH')

    expect(inputNode1).toBeInTheDocument()
  })
})