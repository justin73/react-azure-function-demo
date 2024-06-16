const { app } = require("@azure/functions");
const signalR = require("@microsoft/signalr");

app.http("WebhookReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "world";

    // Send data to connected clients via SignalR
    const signalRServiceEndpoint =
      "8WaEZ/ubce13WJQaYsa9v9rO+b3vH53qmNqBcdG8sik=";
    console.log("AzureSignalRConnectionString ---->", signalRServiceEndpoint);

    // Correctly set up the SignalR client
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRServiceEndpoint)
      .build();

    try {
      // Start the connection
      await connection.start();
      console.log("SignalR connection established.");
      // Send message to the "notifications" hub
      await serviceClient.sendToAll("notifications", JSON.stringify(data));
      context.log("Sent notification via SignalR:", data);
    } catch (error) {
      context.log.error("Error sending notification via SignalR:", error);
    }
    return { body: `Hello, ${name} from Webhook added signalR!` };
  },
});
