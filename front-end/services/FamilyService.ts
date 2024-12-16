import { Family } from "@/types";

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

const createFamily = (family: Family) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/family", {
      method: "POST",

      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(family),
  });
};

const FamilyService = {
  getFamilyByMemberEmail,
    createFamily,
    getFamilyByName,
}

export default FamilyService;