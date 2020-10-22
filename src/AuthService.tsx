import firebase from "./firebase";
export class AuthService {
    emailLogin(email: string, password: string, stayConnect: boolean) {
        if (stayConnect) {
            return new Promise<any>((resolve, reject) => {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(res => {
                        firebase.auth().signInWithEmailAndPassword(email, password).then(r => {
                            resolve(r);
                        }).catch(reason => {
                            reject(reason)
                        });
                    }, err => reject(err));
            });
        } else {
            return new Promise<any>((resolve, reject) => {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
                    .then(res => {
                        firebase.auth().signInWithEmailAndPassword(email, password).then(r => {
                            resolve(r);
                        }).catch(reason => reject(reason));
                    }, err => reject(err));
            });
        }
    }

    getAuth() {
        return firebase.auth();
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email).then(r => {
                console.log(r);
                resolve();
            }).catch(
                reason => {
                    console.log(reason);
                    reject(reason.code);
                }
            );
        });
    }

    logOut() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signOut().then(r => {
                resolve();
            }).catch(
                reason => {
                    console.log(reason);
                    reject();
                }
            );
        });
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return new Promise<any>((resolve, reject) => {
        return firebase.auth().signInWithPopup(provider).then(value => {
            resolve(value)
        }).catch(error => {
            reject(error)
        })
        });
    }
}
