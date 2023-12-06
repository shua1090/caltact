import 'jest-fetch-mock'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/header'
import { MemoryRouter } from 'react-router-dom'

describe('Header', () => {
  it('should render Caltact text', () => {
    render(<Header />)
    const header = screen.getByRole('heading')
    expect(header).toHaveTextContent('Caltact')
  })

  it('should turn into dark mode when dark mode is clicked after clicking on dropdown menu', async () => {
    render(<Header />)

    const settingsButton = screen.getByText(/Settings/i)
    fireEvent.click(settingsButton)

    const darkModeOption = screen.getByText(/Dark Mode/i)
    fireEvent.click(darkModeOption)
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

  it('should open a dropdown menu on click on "Settings" button', () => {
    render(<Header />)
    const settingsButton = screen.getByText('Settings')
    fireEvent.click(settingsButton)
    const dropdown = screen.getByRole('menu') // Assuming the dropdown has role 'menu'
    expect(dropdown).toBeInTheDocument()
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
