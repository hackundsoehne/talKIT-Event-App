import { Storage } from '@ionic/storage';

export class StorageService {
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

    constructor(
        public storage: Storage
    ) {
    }

    getUsername(): Promise<string> {
        return this.storage.get('username').then((value) => {
          return value;
        });
      };

    getToken(): Promise<string> {
        return this.storage.get('token').then((value) => {
            return value;
        });
    };

    hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    };

    checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
        return value;
    });
    };

    // public user: User = null;

    // public get isLoggedIn(): boolean {
    //     return this.user != null;
    // }
}