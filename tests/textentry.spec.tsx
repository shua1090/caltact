import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TextEntry from '@/components/textentry'

describe('TextEntry', () => {
  const mockChangeHandler = jest.fn()

  it('renders with correct label, placeholder, and value', () => {
    render(
      <TextEntry
        label="Test Label"
        id="testInput"
        placeholder="Enter text"
        value="Initial Value"
        changeHandler={mockChangeHandler}
      />
    )

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Initial Value')).toBeInTheDocument()
  })

  it('calls changeHandler on input change', () => {
    render(
      <TextEntry
        label="Test Label"
        id="testInput"
        value=""
        changeHandler={mockChangeHandler}
      />
    )

    const inputElement = screen.getByLabelText('Test Label')
    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockChangeHandler).toHaveBeenCalledWith(expect.anything()) // You can further refine this expectation based on the specific event structure
  })

  // Additional tests...
})
