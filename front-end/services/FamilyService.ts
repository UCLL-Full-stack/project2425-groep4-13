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

// functie die een familie opvraagt via user maar als die niet bestaat dan gooit back-end geen error maar geeft gewoon "null" terug
const checkAndGetFamilyByMemberEmail = async (memberEmail: string) => {
  return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/family/check/member/${memberEmail}`,
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

// functie die een familie opvraagt maar als die niet bestaat dan gooit back-end geen error maar geeft gewoon "null" terug
const checkAndGetFamilyByName = async (familyName: string) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/family/check/${familyName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

const createFamily = async (family: Family) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/family", {
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
    checkAndGetFamilyByMemberEmail,
    createFamily,
    getFamilyByName,
    checkAndGetFamilyByName,
    addUserToFamily,
}

export default FamilyService;