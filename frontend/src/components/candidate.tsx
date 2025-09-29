import type { participant } from "../interfaces"

interface CandidateCardProps {
    sex: string
    minimum: number
    maximum: number
    children: participant
    validator: (input: React.ChangeEvent<HTMLInputElement>, canditate: string) => void
}

export default function AddContestant(props: CandidateCardProps){
    return (
        <div className="flex flex-row shadow-lg m-1 rounded">
            <img
                className="w-[20%] aspect-[10/16]"
                src={`http://localhost:3000/assets/${props.sex}/candidate_${props.children.number}.png`}
            />
            <div>
            <h3 className="text-2xl">{props.sex[0].toUpperCase() + props.sex.substring(1)} Candidate #{props.children.number}</h3>
            <input
                className="text-2xl outline-none ml-2"
                min={props.minimum}
                required={true}
                key={`${props.sex}_candidate_${props.children.number}`}
                name={`${props.sex}_candidate_${props.children.number}`}
                type="text"
                onChange={(
                input: React.ChangeEvent<HTMLInputElement>,
                ) => {
                props.validator(
                    input,
                    `${props.sex}_candidate_${props.children.number}`,
                );
                }}
                max={props.maximum}
            />
            </div>
        </div>
    )
}