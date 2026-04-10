export const QUERIES = {
  getUsers: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      const error = await res.json().catch(() => null);

      throw new Error(error?.message || "Request failed");
    }

    const data = await res.json();

    return data;
  },
  getUserDetails: async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) {
      const error = await res.json().catch(() => null);

      throw new Error(error?.message || "Request failed");
    }

    const data = await res.json();

    return data;
  },
};
