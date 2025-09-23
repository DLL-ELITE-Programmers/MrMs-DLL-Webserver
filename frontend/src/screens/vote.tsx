import { useEffect, useState } from "react";
import { useForm, type FieldValues, type UseFormHandleSubmit } from "react-hook-form";
import Header from "../components/header";
import type { candidate, participant } from "../interfaces";
import axios from "axios";
import { useFormState } from "react-dom";

export default function Vote(){
    const [contestants, setContestants] = useState<candidate>()
    const [message, setMessage] = useState("")
    const {register, handleSubmit, formState: {errors}} = useForm()

    useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get("http://localhost:3000/candidates?code=missnapokita")
                setContestants(data)
            }catch(e){
                setMessage(e)
            }
        })()
    }, [])

    const submit = (data: UseFormHandleSubmit<FieldValues, FieldValues>) => {
        setMessage("")
    }

    const numberValidator = (input: React.ChangeEvent<HTMLInputElement>) => {
        input.target.value = input.target.value.replace(/[^0-9.]/g, "");
		if ((input.target.value.match(/\./g) || []).length > 1) {
			input.target.value = input.target.value.slice(0, -1);
		}
    }

    return (
        <div className="flex flex-col gap-1">
            <Header/>
            {message}
            <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col gap-1">
                <div className="flex flex-row">
                    <div className="flex flex-col w-full gap-1">
                        {contestants?.male?.map((contestant: participant) => {
                            return (
                                <div>
                                    <img src={`http://localhost:3000/assets/male/candidate_${contestant.number}.png`} />
                                    <div>
                                        <h3>{contestant.department}</h3>
                                        <input type="" onChange={numberValidator} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        {contestants?.female?.map((contestant: participant) => {
                            return (
                                <div className="flex flex-row">
                                    <img className="aspect-[9_16] w-[10%]" src={`http://localhost:3000/assets/female/candidate_${contestant.number}.png`} />
                                    <span>
                                        <h3>{contestant.department}</h3>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <input type="submit" className="" />
            </form>
        </div>
    )
}