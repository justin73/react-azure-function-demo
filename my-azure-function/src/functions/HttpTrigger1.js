const { app } = require("@azure/functions");

app.http("HttpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "world";

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // For production, replace '*' with your app's URL
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: `Hello, ${name}!`,
    };
  },
});
