import { useState } from "react";
import { Login } from "../components/login";
import { User } from "../types";

export default function Root() {
  const [user, setUser] = useState<User>(null);

  if (!user) return <Login setUser={setUser} />;

  return <div>hi</div>;
}
