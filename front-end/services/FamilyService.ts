import { Family, User } from "@types";

const getFamilyByMemberEmail = async (memberEmail: string) => {
    return await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/family/member/${memberEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
}

const getFamilyByName = async (familyName: string) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/family/${familyName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// HIER BEZIG met proberen te zien hoe het object moet doorgegeven naar backend

const createFamily = (family: Family) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/family", {
      method: "POST",

      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(family),
  });
};

const addUserToFamily = (family: Family, userEmail: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/family/member", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        family: family,
        user: {email: userEmail}, // er een object van maken, want back-end verwacht een UserInput object (maar niet alle velden zijn nodig)
    }),
  });
}

const FamilyService = {
  getFamilyByMemberEmail,
    createFamily,
    getFamilyByName,
    addUserToFamily,
}

export default FamilyService;