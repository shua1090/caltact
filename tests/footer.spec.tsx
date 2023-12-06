import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/footer'

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByText(/caltact 2023/i)).toBeInTheDocument()
  })

  it('displays the correct text', () => {
    render(<Footer />)
    const footerElement = screen.getByText(/caltact 2023/i)
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveTextContent('© Caltact 2023')
  })
})
