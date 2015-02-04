/// <reference path="../references.ts" />

/**
 * Design event
 * use this to do regular gameplay shizzle
 */
class DesignEvent extends GameAnalyticsEvent
{
    constructor(eventId:string, value?:number, area?: string, x?:number, y?:number, z?:number)
    {
        super(GameAnalyticsEvent.DESIGN_EVENT, eventId, value, area, x, y, z);
    }
}
