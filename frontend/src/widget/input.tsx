import { useState } from "react"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"

interface InputProps {
    className?: string
    name?: string
    onChange: (input: React.ChangeEvent<HTMLInputElement>) => void
    min?: number
    max?: number
    required?: boolean
}

export default function Input(props: InputProps){
    const [inputType, setInputType] = useState("text")

    const setType = () => {
        if(inputType === "text"){
            setInputType("password")
        }else{
            setInputType("text")
        }
    }

    return (
        <div className={`${props.className} flex flex-row w-full border-[1px] border-solid border-slate-200 items-center px-2 rounded py-1 shadow text-shadow-zinc-700`}>
            <input
                className="text-2xl outline-none w-full"
                min={props.min}
                key={props.name}
                name={props.name}
                type={inputType}
                onChange={props.onChange}
                max={props.max}
                required={props.required}
                />
            <span onClick={setType} className="text-2xl">
                {
                inputType === "text" ? 
                    <IoIosEye />
                    :
                    <IoIosEyeOff />
                }
            </span>
        </div>
    )
}