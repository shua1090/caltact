import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeToggle from '@/components/themetoggle'

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    render(<ThemeToggle />)
    // The button with the Sun icon should be present for light theme
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
