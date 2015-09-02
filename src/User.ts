/// <reference path="references.ts" />

module GA
{
    export enum Gender {
        male,
        female
    }

    export class User
    {
        public user_id: string = '';

        public facebook_id: string;

        public gender: Gender;

        public birth_year: number;

        public constructor(user_id: string, facebook_id?: string, gender?: Gender, birth_year?: number)
        {
            if(user_id) {
                this.user_id = user_id;
            }

            if (facebook_id && facebook_id.length > 0) {
                this.facebook_id = facebook_id
            }

            if (gender === Gender.female || gender === Gender.male) {
                this.gender = gender;
            }

            if (birth_year && birth_year.toString().match(/^[0-9]{4}$/gi)) {
                this.birth_year = birth_year;
            }
        }

    }
}