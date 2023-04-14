export const getCommits = jest.fn().mockResolvedValue({
  statusCode: 200,
  data: {
    page: 2,
    nextPage: 3,
    itemsPerPage: 1,
    totalItems: 1,
    items: [
      {
        message: "commit message",
        author: "Me",
        date: "2023-04-13T19:51:12Z",
        commit: "2505e1114616990759ad75712840140289aa08a7",
        user: "https://github.com",
      },
    ],
  },
});
