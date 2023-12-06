import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/header'

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />)
    expect(screen.getByText('Caltact')).toBeInTheDocument()
  })

  it('contains links with correct hrefs', () => {
    render(<Header />)
    // Check for link to the homepage
    expect(screen.getByText('Caltact').closest('a')).toHaveAttribute('href', '/')
    // Check for link to add contact page
    expect(screen.getByText('Add Contact').closest('a')).toHaveAttribute('href', '/addpage')
    // Check for link to sign in page
    expect(screen.getByText('Sign In').closest('a')).toHaveAttribute('href', '/signin')
    // Check for link to user info page
    expect(screen.getByAltText('Gear Image').closest('a')).toHaveAttribute('href', '/userInfo')
  })

  it('contains the ThemeToggle component', () => {
    render(<Header />)
  })
})
