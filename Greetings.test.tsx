// components/Greeting.test.tsx
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

describe('Greeting Component', () => {
    it('renders the correct greeting message', () => {
        render(<Greeting name="Alice" />)
        const heading = screen.getByRole('heading', { name: /hello, alice!/i })
        expect(heading).toBeInTheDocument()
    })


})
