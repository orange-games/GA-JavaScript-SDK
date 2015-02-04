/// <reference path="../references.ts" />

/**
 * Business event
 */
class BusinessEvent extends GameAnalyticsEvent
{
    constructor(eventId:string, value?:number, area?: string, x?:number, y?:number, z?:number)
    {
        super(GameAnalyticsEvent.BUSINESS_EVENT, eventId, value, area, x, y, z);
    }
}
