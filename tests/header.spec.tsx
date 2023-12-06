/* eslint-disable no-tabs */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/header'
import { MemoryRouter } from 'react-router-dom'
describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />)
    expect(screen.getByText('Caltact')).toBeInTheDocument()
  })

  it('contains links with correct hrefs', () => {
    render(<Header />)
    // Check for link to the homepage
    expect(screen.getByText('Caltact').closest('a')).toHaveAttribute(
      'href',
      '/'
    )
    // Check for link to add contact page
    expect(screen.getByText('Add Contact').closest('a')).toHaveAttribute(
      'href',
      '/addpage'
    )
    // Check for link to sign in page
    expect(screen.getByText('Sign In').closest('a')).toHaveAttribute(
      'href',
      '/signin'
    )
  })

  it('contains the ThemeToggle component', () => {
    render(<Header />)
  })
  it('should redirect to "/" when clicking on "Caltact"', async () => {
    // Wrap the Header component with MemoryRouter
    render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
    )

    // Find the link with the text "Caltact"
    const caltactLink = screen.getByText('Caltact')
    fireEvent.click(caltactLink)
    expect(window.location.pathname).toBe('/')
  })

  it("should clear all the localStorage when the user clicks 'Logout'", () => {
    render(<Header />)
    const settingsButton = screen.getByText('Settings')
    fireEvent.click(settingsButton)

    const clearMock = jest.fn()
    Object.defineProperty(global, 'localStorage', {
      value: { clear: clearMock },
      writable: true
    })

    const logoutButton = screen.getByText('Log Out')
    fireEvent.click(logoutButton)

    expect(clearMock).toHaveBeenCalled()

    Object.defineProperty(global, 'localStorage', {
      value: localStorage,
      writable: true
    })
  })
})
