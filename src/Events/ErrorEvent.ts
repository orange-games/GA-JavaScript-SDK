/// <reference path="../references.ts" />

/**
 * Error event
 * Used this to send any errors to GA
 */
class GaErrorEvent extends GeneralEvent
{
    constructor(eventId:string, value?:number, area?: string, x?:number, y?:number, z?:number)
    {
        super(GameAnalyticsEvent.ERROR_EVENT, eventId, value, area, x, y, z);
    }
}
