const Action = (action) => ({
    type: "AdaptiveCard",
    body: [
      {
        type: "ColumnSet",
        columns: [
          {
            type: "Column",
            items: [
              {
                type: "Image",
                url: action.url || "https://www.predicagroup.com/app/uploads/2019/08/AzureDevOpsLogo-300x300.png" , //https://www.predicagroup.com/app/uploads/2019/08/AzureDevOpsLogo-300x300.png
                size: "Small"
              }
            ],
            width: "auto"
          },
          {
            type: "Column",
            items: [
              {
                type: "TextBlock",
                weight: "Bolder",
                text: action.name || "Action name placeholder", //"Task Module - Implementation",
                wrap: true
              },
              {
                type: "TextBlock",
                spacing: "None",
                text: "Contribution time: " + action.time, // "Contribution time: 4 hr, 15 min",
                isSubtle: true,
                wrap: true,
                fontType: "Default",
                weight: "Lighter"
              }
            ],
            width: "stretch",
            height: "stretch"
          }
        ],
        separator: true,
        spacing: "Small"
      },
      {
        type: "ActionSet",
        actions: [
          {
            type: "Action.ShowCard",
            title: "Set goal",
            card: {
              type: "AdaptiveCard",
              body: [
                {
                  type: "Input.ChoiceSet",
                  id: "goal",
                  style: "expanded",
                  choices: [
                    {
                      title: "Commited goals 🏆 " + (action.recommendedGoal === "commited-goals" ?  " (💡) " : ""),  
                      value: "commited-goals"
                    },
                    {
                      title: " Collaboration 🤝 " + (action.recommendedGoal === "collaboration" ?  " (💡) " : ""),
                      value: "collaboration"
                    },
                    {
                      title: "Mentoring 🧑‍🏫 " + (action.recommendedGoal === "mentoring" ?  " (💡) " : ""),
                      value: "mentoring"
                    }
                  ],
                  label: "Choose the right goal for the action:",
                  isRequired: true
                }
              ],
              actions: [
                {
                  type: "Action.Submit",
                  title: "OK",
                  data: {
                    id: action.id
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3"
  })

  export default Action;