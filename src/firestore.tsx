import firebase from "./firebase";

export class FirestoreService {

    getEvents(collectionName: string, limit?: number): Promise<firebase.firestore.QuerySnapshot> {
        if (limit !== undefined) {
            return this.getFirestore().collection(collectionName).limit(limit).get()
        } else {
            return firebase.firestore().collection(collectionName).get()
        }
    }
    setEvents(event: any, collectionName: string): Promise<firebase.firestore.DocumentReference>{
        return this.getFirestore().collection(collectionName).add(event)
    }
    deleteEvent(collectionName: string, documentName: string, event?: any): Promise<void> {
        return firebase.firestore().collection(collectionName).doc(documentName).delete()
    }

    getFirestore() {
        return firebase.firestore();
    }
}
