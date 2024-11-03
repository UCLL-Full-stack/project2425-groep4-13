const getFamiliesByMemberEmail = async (memberEmail: string) => {
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

const FamilyService = {
    getFamiliesByMemberEmail,
}

export default FamilyService;