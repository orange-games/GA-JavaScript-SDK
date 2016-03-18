module GA
{
    export class User
    {
        public user_id: string = '';

        public facebook_id: string;

        public gender: Gender;

        public birth_year: number;

        public constructor(user_id?: string, facebook_id?: string, gender?: Gender, birth_year?: number)
        {
            if(user_id) {
                this.user_id = user_id;
            } else {
                //let's first check if there is a userid in the cache
                var user: string = Utils.LocalStorage.getItem('user');
                this.user_id = user || Utils.createUniqueUserId();
            }

            if (facebook_id && facebook_id.length > 0) {
                this.facebook_id = facebook_id;

                //https://github.com/GameAnalytics/GA-SDK-UNREAL/wiki/Set-Facebook-Id
                //User Id must be set to the player's Facebook Id.
                this.user_id = facebook_id;
            }

            //Save the userId to the user's cache, this is used to increment the session amount
            Utils.LocalStorage.setItem('user', this.user_id);

            if (gender === Gender.female || gender === Gender.male) {
                this.gender = gender;
            }

            if (birth_year && birth_year.toString().match(/^[0-9]{4}$/gi)) {
                this.birth_year = birth_year;
            }
        }

    }
}