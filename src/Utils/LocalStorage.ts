module GA {
    export module Utils {
        export class LocalStorage {
            public static Available: boolean = false;

            public static CacheKey: string = 'GA:';

            public static getItem(key:string): string {
                if (!LocalStorage.Available) {
                    return;
                }

                return localStorage.getItem(LocalStorage.CacheKey + key);
            }

            public static setItem(key: string, value: string): void {
                if (!LocalStorage.Available) {
                    return;
                }

                localStorage.setItem(LocalStorage.CacheKey + key, value);
            }
        }

        try {
            if (typeof localStorage === 'object') {
                localStorage.setItem('testingLocalStorage', 'yes');
                localStorage.removeItem('testingLocalStorage');
                LocalStorage.Available = true;
            }
        } catch (e) {}
    }
}