import type { participant } from "../interfaces"
import Input from "../widget/input"

interface CandidateCardProps {
    sex: string
    minimum: number
    maximum: number
    children: participant
    validator: (input: React.ChangeEvent<HTMLInputElement>, canditate: string) => void
}

export default function AddContestant(props: CandidateCardProps){
    return (
        <div className="flex flex-row shadow-lg rounded-lg overflow-hidden gap-1">
            <img
                className="w-[20%] aspect-[10/16] border-[1px] border-slate-700 border-solid"
                src={`http://localhost:3000/assets/${props.sex}/candidate_${props.children.number}.png`}
            />
            <div className="p-2 w-full text-white border-2 border-slate-200 border-solid" style={{
                backgroundColor: "rgba(203, 213, 225, 0.1)",
                backdropFilter: "blur(25px)"
            }}>
                <h3 className="text-2xl">{props.sex[0].toUpperCase() + props.sex.substring(1)} Candidate #{props.children.number}</h3>
                <Input onChange={(
                    input: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        props.validator(
                            input,
                            `${props.sex}_candidate_${props.children.number}`,
                        );
                    }}
                    min={props.minimum}
                    max={props.maximum}
                    name={`${props.sex}_candidate_${props.children.number}`}
                />
            </div>
        </div>
    )
}