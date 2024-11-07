import { redirect } from "react-router-dom";

export async function validate() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    throw redirect("/login?message=credential validation failed");
  }

  return null;
}
