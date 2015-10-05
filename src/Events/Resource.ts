module GA
{
    export module Events
    {
        var eventIdCheck = /^(Sink|Source):[A-Za-z]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}/;

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
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for ResourceEvent');
                }
                this.event_id = event_id;

                this.amount = amount;
            }
        }
    }
}

