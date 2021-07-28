import { PreventIframe } from "express-msteams-host";
import {
  CardFactory,
  TurnContext,
  MemoryStorage,
  ConversationState,
  InvokeResponse,
  ActivityHandler,
  Attachment,
} from "botbuilder";
import InterviewCandidatesCard from "./dialogs/interviewCandidates";
import Action from "./dialogs/DayAtGlanceAction";
import _remove from 'lodash/remove';
import Complete from "./dialogs/DayAtGlanceComplete";

@PreventIframe("/acPrototypeBot/acProtoBotTab.html")
export class AcPrototypeBot extends ActivityHandler {
  private readonly conversationState: ConversationState;
  private loggedInMemberOIDs: Map<string, object> = new Map();
  /**
   * The constructor
   * @param conversationState
   */
  public constructor(
    memoryStorage: MemoryStorage,
    conversationState: ConversationState
  ) {
    super();
    this.conversationState = conversationState;
    const actionList = [
      {
        id: 1,
        url: "https://www.predicagroup.com/app/uploads/2019/08/AzureDevOpsLogo-300x300.png",
        name: "Task Module - Implementation",
        time: "4 hr, 15 min",
        recommendedGoal: "commited-goals"
      },
      {
        id: 2,
        url: "https://www.c5alliance.com/wp-content/uploads/2020/05/Icon-Teams-TeamsChat@2x.png",
        name: "Chat with intern",
        time: "1 hr, 15 min",
        recommendedGoal: "mentoring"
      },
      {
        id: 3,
        url: "https://logodix.com/logo/1292210.jpg",
        name: "Finalize design UI with the team",
        time: "2hr, 25 min",
        recommendedGoal: "collaboration"
      }
    ]

    // Set up the Activity processing
    this.onInvokeActivity = async (
      context: TurnContext
    ): Promise<InvokeResponse> => {

      const ctx: any = context;     
      let responseBody: any;

      const actionCardResponse: any = {
        tab: {
          type: "continue",
          value: {
            cards: [],
          },
        },
      };

      // const attachment = CardFactory.adaptiveCard(Complete());
      //       const cardJson = {card: attachment.content};
      //       actionCardResponse.tab.value.cards.push(cardJson);
      //       return { status: 200, body: actionCardResponse };

      // actionCardsList.forEach(action => {
      //   const cardJson = {card: action.content};
      //   actionCardResponse.tab.value.cards.push(cardJson)
      // });
      // let actionsList;
      switch (ctx.activity.name) {
        case "tab/submit":
          for (let i = 0; i < actionList.length; i++) {
            if (actionList[i].id === ctx.activity.value.data.id) {
              actionList.splice(i--, 1);
            }
          }
          if (actionList.length == 0) {
            const attachment = CardFactory.adaptiveCard(Complete());
            const cardJson = {card: attachment.content};
            actionCardResponse.tab.value.cards.push(cardJson);
            return { status: 200, body: actionCardResponse };
          }
          break;
        case "tab/fetch":
        default:
          if (actionList.length == 0) {
            const attachment = CardFactory.adaptiveCard(Complete());
            const cardJson = {card: attachment.content};
            actionCardResponse.tab.value.cards.push(cardJson);
            return { status: 200, body: actionCardResponse };
          }
          break;
      }

      actionList.forEach(action => {
        const attachment = CardFactory.adaptiveCard(Action(action));
        const cardJson = {card: attachment.content};
        actionCardResponse.tab.value.cards.push(cardJson);
      });

      responseBody = actionCardResponse;
      return { status: 200, body: responseBody };
    };
  }
}
