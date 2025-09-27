import { useEffect, useState } from "react";
import {
  useForm,
  type FieldValues,
  type UseFormHandleSubmit,
} from "react-hook-form";
import Header from "../components/header";
import type { candidate, participant } from "../interfaces";
import axios from "axios";
import { useFormState } from "react-dom";

export default function Vote() {
  const [contestants, setContestants] = useState<candidate>();
  const [message, setMessage] = useState("");
  const [sheets, setSheets] = useState({});
  const [requiredFields, setRequired] = useState<string[]>([]);
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
        setMessage(e);
      }
    })();
  }, []);

  const numberValidator = (
    input: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    input.target.value = input.target.value.replace(/[^0-9.]/g, "");
    if ((input.target.value.match(/\./g) || []).length > 1) {
      input.target.value = input.target.value.slice(0, -1);
    }
    const n = parseInt(input.target.value);
    if (n <= minimum && n >= maximum) {
      setSheets({
        ...sheets,
        [key]: n,
      });
    } else {
      const req = requiredFields;
      req.push(key);
      setRequired(req);
    }
  };

  const submit = () => {
    if (requiredFields.length > 0) {
      setMessage(
        `The minimum score is ${minimum} and the maximum score is ${maximum}. Please check out these fields: \n${requiredFields.join("\n")}`,
      );
      setRequired([]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Header />
      {message}
      <form
        method="POST"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit();
        }}
        className="w-full flex flex-col gap-1"
      >
        <div className="flex flex-row">
          <div className="flex flex-col w-full gap-1">
            {contestants?.male?.map((contestant: participant) => {
              return (
                <div className="flex flex-row shadow-lg m-1 rounded">
                  <img
                    src={`http://localhost:3000/assets/male/candidate_${contestant.number}.png`}
                  />
                  <div>
                    <h3>Male Candidate #{contestant.number}</h3>
                    <input
                      min={minimum}
                      required={true}
                      key={`male_candidate_${contestant.number}`}
                      name={`male_candidate_${contestant.number}`}
                      type="text"
                      onChange={(
                        input: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        numberValidator(
                          input,
                          `male_candidate_${contestant.number}`,
                        );
                      }}
                      max={maximum}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full gap-1">
            {contestants?.female?.map((contestant: participant) => {
              return (
                <div className="flex flex-row shadow-lg rounded m-1">
                  <img
                    className="aspect-[9_16] w-[10%]"
                    src={`http://localhost:3000/assets/female/candidate_${contestant.number}.png`}
                  />
                  <span>
                    <h3>Female Candidate #{contestant.number}</h3>
                    <input
                      min={minimum}
                      required={true}
                      key={`female_candidate${contestant.number}`}
                      name={`female_candidate${contestant.number}`}
                      type="text"
                      max={maximum}
                      onChange={(
                        input: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        numberValidator(
                          input,
                          `female_candidate_${contestant.number}`,
                        );
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <input onClick={submit} type="submit" className="" value="Send" />
      </form>
    </div>
  );
}
