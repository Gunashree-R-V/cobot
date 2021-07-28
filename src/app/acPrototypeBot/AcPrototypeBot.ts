import { PreventIframe } from "express-msteams-host";
import {
  CardFactory,
  TurnContext,
  MemoryStorage,
  ConversationState,
  InvokeResponse,
  ActivityHandler,
} from "botbuilder";
import InterviewCandidatesCard from "./dialogs/interviewCandidates";

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

    // Set up the Activity processing
    this.onInvokeActivity = async (
      context: TurnContext
    ): Promise<InvokeResponse> => {
      const ctx: any = context;      
      // const managerCard = CardFactory.adaptiveCard(
      //   ManagerDashboardCard(profile)
      // );
      const interviewCard = CardFactory.adaptiveCard(InterviewCandidatesCard);
      let responseBody: any;

      const secondaryTabResponse: any = {
        tab: {
          type: "continue",
          value: {
            cards: [
              // { card: welcomeCard.content },
              { card: interviewCard.content },
              // { card: videoPlayerCard.content },
            ],
          },
        },
      };

      switch (ctx.activity.name) {
        case "tab/submit":
          break;
        case "tab/fetch":
        default:
          responseBody = secondaryTabResponse;
          break;
      }
      return { status: 200, body: responseBody };
    };
  }
}
