import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
    return (
        <input
            {...props}
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        ></input>
    )
}
