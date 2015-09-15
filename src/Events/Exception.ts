/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        export enum ErrorSeverity
        {
            debug,
            info,
            warning,
            error,
            critical
        }

        export class Exception implements GA.Events.Event
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

            /**
             * Create a new Error event
             *
             * @param severity  Error severity, should be of type ErrorSeverity
             * @param message   The emssage of the error, we'd like new Error().stack
             */
            constructor(severity: ErrorSeverity, message?: string)
            {
                this.severity = ErrorSeverity[severity];

                if (message !== undefined) {
                    //Trim it because GameAnalytics doesn't accept bigger message
                    this.message = message.substr(0, 8192);
                }
            }
        }
    }
}

