const Complete = () => (
    {
        type: "AdaptiveCard",
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.3",
        body: [
          {
            type: "Image",
            url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e986b389662013.5dfb9e19e0e18.gif",
            size: "Stretch"
          },
          {
            type: "TextBlock",
            text: "No more tasks",
            size: "extralarge",
            color: "good",
            horizontalAlignment: "center",
            weight: "bolder"
          },
          {
            type: "TextBlock",
            text: "[Check out what Cobot recommends!]()",
            size: "large",
            color: "accent",
            horizontalAlignment: "center"
          }
        ]
      }
)

export default Complete;