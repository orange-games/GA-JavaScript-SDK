/// <reference path="../references.ts" />

/**
 * Business event
 */
class UserEvent extends GameAnalyticsEvent
{
    private userData: any;

    constructor(userData)
    {
        super(GameAnalyticsEvent.USER_EVENT);

        this.userData = userData;
    }

    public getData():any
    {
        return this.userData;
    }
}
