import '../app/globals.css'
import { type FormEvent } from 'react'

interface TextEntryProps {
  label: string
  id: string
  placeholder?: string
  value: string
  changeHandler: (event: FormEvent) => void
}

export default function TextEntry (props: TextEntryProps) {
  return (
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                {props.label}
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mt-2">
                <input
                    type="text"
                    name={props.id}
                    id={props.id}
                    value={props.value}
                    onChange={props.changeHandler}
                    autoComplete={props.id}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-zinc-300"
                    placeholder={props.placeholder}
                />
            </div>
        </div>
  )
};
