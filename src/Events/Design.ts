/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,4}$/;

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
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for DesignEvent');
                }

                this.event_id = event_id;

                if (value !== undefined) {
                    this.value = value;
                }
            }
        }
    }
}

