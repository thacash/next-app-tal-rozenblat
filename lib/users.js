export async function getUserByEmail(email) {
    return await fetch(`/api/mongo/${email}`).then((response) => response.json());
  }