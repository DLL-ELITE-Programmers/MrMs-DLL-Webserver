import { useEffect, useState } from "react";
import Header from "../components/header";
import type { candidate, participant } from "../interfaces";
import axios from "axios";

export default function Vote(){
    const [contestants, setContestants] = useState<candidate>()
    const [message, setMessage] = useState("")
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

    return (
        <div className="flex flex-col">
            <Header/>
            {message}
            <div className="flex flex-row">
                <div className="flex flex-col w-full">
                    {contestants?.male?.map((contestant: participant) => {
                        return (
                            <div>
                                <img src={`http://localhost:3000/assets/male/candidate_${contestant.number}.png`} />
                                <h3>{contestant.department}</h3>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col w-full">
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
        </div>
    )
}