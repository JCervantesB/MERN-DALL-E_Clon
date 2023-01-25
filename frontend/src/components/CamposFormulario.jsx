import React from 'react'

const CamposFormulario = ({ labelName, type, name, placeholder, value, handleChange, esSorprendeme, handleSorprendeme }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>
          {esSorprendeme && (
            <button
              type='button'
              onClick={handleSorprendeme}
              className='font-semibold text-xs bg-gray-200 py-1 px-2 rounded-md text-black'
            >
              Sorpréndeme
            </button>
            )}
      </div>
      <input 
        type={type} 
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none block w-full p-3'
      />
    </div>
  )
}

export default CamposFormulario