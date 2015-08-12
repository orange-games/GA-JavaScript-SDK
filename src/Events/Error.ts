/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        export class Error implements GA.Events.Event
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.error;

            /**
             * The type of error severity.
             */
            public severity: string;

            /**
             * Stack trace or other information detailing the error. Can be an empty string.
             */
            public message: string = '';

            constructor(severity: string, message?: string)
            {
                //TODO: validation
                this.severity = severity;

                if (message !== undefined) {
                    this.message = message;
                }
            }
        }
    }
}

