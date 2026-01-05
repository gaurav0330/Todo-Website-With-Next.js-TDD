export const NextResponse = {
  json: (data: any, init?: { status?: number }) => {
    return {
      status: init?.status ?? 200,
      json: async () => data,
    };
  },
};
