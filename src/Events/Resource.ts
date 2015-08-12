/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        export class Resource implements GA.Events.IdEvent
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.resource;

            /**
             * A 4 part event id. FlowType:InGameCurrency:ItemType:ItemId
             */
            public event_id: string;

            /**
             * The amount of the in game currency (float)
             */
            public amount: number;

            constructor(event_id: string, amount: number)
            {
                //TODO: validation
                this.event_id = event_id;
                this.amount = amount;
            }
        }
    }
}

