export const QUERY_KEYS = {
  users: {
    all: ["all"],
    details: (id: number) => [...QUERY_KEYS.users.all, "details", { id }],
  },
};
