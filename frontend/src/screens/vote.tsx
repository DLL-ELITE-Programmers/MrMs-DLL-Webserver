import { useEffect, useState } from "react";
import Header from "../components/header";
import {type candidate, type participant, type scores } from "../interfaces";
import axios from "axios";
import AddContestant from "../components/candidate";

const categories = [
  "Institutional",
  "Evening Gown",
  "Summer wear"
]

export default function Vote() {
  const [contestants, setContestants] = useState<candidate>();
  const [message, setMessage] = useState("");
  const [sheets, setSheets] = useState<scores>({});
  const [requiredFields, setRequired] = useState<string[]>([]);
  const [category, setCategory] = useState(0)
  const minimum = 7;
  const maximum = 10;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/candidates?code=missnapokita",
        );
        setContestants(data);
      } catch (e) {
        setMessage(e.error);
      }
    })();
  }, []);

  const numberValidator = (
    input: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    let required = requiredFields;
    input.target.value = input.target.value.replace(/[^0-9.]/g, "");
    if ((input.target.value.match(/\./g) || []).length > 1) {
      const splitByDot = input.target.value.split(".")
      const first = splitByDot[0]
      splitByDot.shift()
      const combined = `${first}.${splitByDot.join("")}`
      input.target.value = combined
    }
    const n = parseFloat(input.target.value);
    if (n >= minimum && n <= maximum) {
        required = required.filter(item => item !== key);
        required = [...new Set(required.filter(item => item !== key))];
        setSheets({
        ...sheets,
        [key]: n,
      });
    } else {
        required.push(key);
        setSheets({
          ...sheets,
          [key]: undefined,
        });
    }
    setRequired(required)
  };

  const submit = () => {
    if (requiredFields.length > 0) {
      setMessage(
        `The minimum score is ${minimum} and the maximum score is ${maximum}. Please check out these fields: \n${requiredFields.join("\n")}`,
      );
    }else{
        setMessage("Done")
    }
  };

  return (
    <div className="flex flex-col gap-1 h-full">
      <Header subtitle={message} />
      <form
        method="POST"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit();
        }}
        className="w-full flex flex-col gap-1 h-full box-border"
      >
        <div className="flex gap-2 justify-center">
          {
            categories.map((_category: string, index: number) => {
              return (
                <span onClick={() => {
                  setCategory(index)
                }} className={`border-2 ${index === category ? "border-solid border-black" : "border-b-solid border-transparent border-b-black"} cursor-pointer select-none transition-all delay-75 rounded-lg px-2`}>
                  {_category}
                </span>
              )
            })
          }
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-full gap-1">
            {contestants?.male?.map((contestant: participant) => {
              return (
                <AddContestant sex="female" validator={numberValidator} minimum={minimum} maximum={maximum}>{contestant}</AddContestant>
              );
            })}
          </div>
          <div className="flex flex-col w-full gap-1">
            {contestants?.female?.map((contestant: participant) => {
              return (
                <AddContestant sex="female" validator={numberValidator} minimum={minimum} maximum={maximum}>{contestant}</AddContestant>
              );
            })}
          </div>
        </div>
        <input type="submit" className="text-2xl bg-[rgb(33_33_33)]" value="Send" />
      </form>
    </div>
  );
}
