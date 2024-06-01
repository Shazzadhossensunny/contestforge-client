import { useContext } from "react"
import { AuthContext } from "../Provider/AuthContextComponent"


export default function UseAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
