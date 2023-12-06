import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AutoFillModal from '@/components/autofill'
import '@testing-library/jest-dom'

describe('AutoFillModal', () => {
  const mockAutoFill = [
    { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' }
  ]
  const mockSetAutoFill = jest.fn()
  const mockOnButtonClick = jest.fn()

  it('renders correctly with autoFill data', () => {
    render(<AutoFillModal autoFill={mockAutoFill} setAutoFill={mockSetAutoFill} onButtonClick={mockOnButtonClick} />)
    expect(screen.getByText('Auto Fill Options')).toBeInTheDocument()
    expect(screen.getByText('First Name: John')).toBeInTheDocument()
  })

  it('does not render when autoFill is empty', () => {
    render(<AutoFillModal autoFill={[]} setAutoFill={mockSetAutoFill} onButtonClick={mockOnButtonClick} />)
    expect(screen.queryByText('Auto Fill Options')).not.toBeInTheDocument()
  })

  it('calls setAutoFill with an empty array on close button click', () => {
    render(<AutoFillModal autoFill={mockAutoFill} setAutoFill={mockSetAutoFill} onButtonClick={mockOnButtonClick} />)
    fireEvent.click(screen.getByText('X'))
    expect(mockSetAutoFill).toHaveBeenCalledWith([])
  })

  it('calls onButtonClick with the correct item on select button click', () => {
    render(<AutoFillModal autoFill={mockAutoFill} setAutoFill={mockSetAutoFill} onButtonClick={mockOnButtonClick} />)
    fireEvent.click(screen.getAllByText('Select')[0])
    expect(mockOnButtonClick).toHaveBeenCalledWith(mockAutoFill[0])
  })
})
