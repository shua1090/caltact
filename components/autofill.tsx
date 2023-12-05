interface AutoFillModalProps {
  autoFill: any[]
  setAutoFill: (value: any) => void
  onButtonClick: (value: any) => void
}

const AutoFillModal = ({ autoFill, setAutoFill, onButtonClick }: AutoFillModalProps) => {
  if (autoFill.length === 0) {
    return null
  }

  const handleClose = () => {
    setAutoFill([])
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center text-black">
      <div className="relative my-auto mx-auto p-5 border w-96 shadow-lg rounded-md bg-white text-black">
        <div className="flex justify-between items-center mb-4 text-black">
          <h3 className="text-xl font-bold">Auto Fill Options</h3>
          <button onClick={handleClose} className="text-black">
            X
          </button>
        </div>
        <div>
          {autoFill.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <div>
                <p>First Name: {item.firstName}</p>
                <p>Last Name: {item.lastName}</p>
                <p>Email: {item.email}</p>
              </div>
              <button
                onClick={() => { onButtonClick(item) }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AutoFillModal
