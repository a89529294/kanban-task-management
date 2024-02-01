import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { User } from "../types";

export function Login({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<User>>;
}) {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setUser({ username: "Albert" });
  };

  return (
    <div className="h-full grid place-items-center bg-very-dark-grey">
      <div className="flex flex-col w-80">
        <h2 className="bg-neutral-200 py-3 px-6 uppercase text-neutral-800">
          Login to your account
        </h2>
        <form className="p-6 bg-neutral-100" onSubmit={onSubmit}>
          <input
            type="text"
            title="username"
            placeholder="username"
            className="mb-8 border-0 bg-transparent border-b border-b-neutral-300"
          />
          <input
            type="password"
            title="username"
            placeholder="password"
            className="mb-8 border-0 bg-transparent border-b border-b-neutral-300"
          />
          <button
            type="submit"
            className="py-1 px-7 text-neutral-50 bg-main-purple"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
