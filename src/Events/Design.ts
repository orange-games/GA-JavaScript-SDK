/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        export class Design implements GA.Events.IdEvent
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.design;

            /**
             * A 1-5 part event id.
             */
            public event_id: string;

            /**
             * Optional value.
             */
            public value: number;

            constructor(event_id: string, value?: number)
            {
                //TODO: validation
                this.event_id = event_id;

                if (value !== undefined) {
                    this.value = value;
                }
            }
        }
    }
}

