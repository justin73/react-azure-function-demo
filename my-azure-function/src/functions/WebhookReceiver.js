const { app } = require("@azure/functions");
const { AzureSignalR } = require("@microsoft/signalr");

app.http("WebhookReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "world";

    // Send data to connected clients via SignalR
    const signalRServiceEndpoint = process.env.AzureSignalRConnectionString;
    console.log("AzureSignalRConnectionString ---->", signalRServiceEndpoint);
    const serviceClient = new AzureSignalR(signalRServiceEndpoint);

    try {
      // Send message to the "notifications" hub
      await serviceClient.sendToAll("notifications", JSON.stringify(data));
      context.log("Sent notification via SignalR:", data);
    } catch (error) {
      context.log.error("Error sending notification via SignalR:", error);
    }
    return { body: `Hello, ${name} from Webhook added signalR!` };
  },
});
