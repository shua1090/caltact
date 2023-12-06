import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContactCard from '@/components/contact'

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    reload: jest.fn()
  })
}))

// Mock fetch
global.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve({})
  })
) as any

describe('ContactCard', () => {
  const mockProps = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    photo: '',
    index: 1,
    setIsLoading: jest.fn(),
    major: 'Engineering',
    college: 'Cal Poly SLO'
  }

  it('renders with correct information', () => {
    render(<ContactCard {...mockProps} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Engineering at')).toBeInTheDocument()
    expect(screen.getByText('Cal Poly SLO')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument()
    // Add more assertions as needed
  })

  it('displays default values when props are undefined', () => {
    render(<ContactCard {...{ ...mockProps, firstName: undefined, lastName: undefined, major: undefined }} />)
    expect(screen.getByText('N/A N/A')).toBeInTheDocument()
    expect(screen.getByText('Student at')).toBeInTheDocument()
  })

  it('calls deleteContact on delete button click', () => {
    render(<ContactCard {...mockProps} />)
    fireEvent.click(screen.getByRole('button'))
    // Check if fetch is called with DELETE method
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: 'DELETE' }))
  })
})
