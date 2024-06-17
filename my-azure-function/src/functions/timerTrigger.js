const { app } = require("@azure/functions");

const eventGridOutput = output.eventGrid({
  topicEndpointUri: process.env.MyEventGridTopicUriSetting,
  topicKeySetting: process.env.MyEventGridTopicKeySetting,
});

app.timer("timerTrigger", {
  schedule: "0 */1 * * * *",
  return: eventGridOutput,
  handler: (myTimer, context) => {
    const timeStamp = new Date().toISOString();
    const eventPayload = {
      id: "message-id",
      subject: "subject-name",
      dataVersion: "1.0",
      eventType: "event-type",
      data: {
        name: "Meng Jia",
      },
      eventTime: timeStamp,
    };

    context.log("Sending event to Event Grid:", eventPayload);

    return eventPayload;
  },
});
