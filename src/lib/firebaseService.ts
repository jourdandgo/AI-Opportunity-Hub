import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  getDocs,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Opportunity } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const COLLECTION_NAME = 'opportunities';

export const firebaseService = {
  subscribeToOpportunities: (callback: (opps: Opportunity[]) => void) => {
    if (!auth.currentUser) return () => {};

    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const opps = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Opportunity[];
      callback(opps);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    });
  },

  addOpportunity: async (opp: Omit<Opportunity, 'id'>) => {
    if (!auth.currentUser) throw new Error("User must be authenticated");
    
    const payload = {
      ...opp,
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString() // Use server timestamp logic in rules, but send ISO string for client consistency if needed, or better use serverTimestamp()
      // Let's use ISO string as in types, but rules will validate.
    };

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    }
  },

  updateOpportunity: async (id: string, updates: Partial<Opportunity>) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
  },

  deleteOpportunity: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  },

  // Bulk add for seeding
  bulkAddOpportunities: async (opps: Omit<Opportunity, 'id'>[]) => {
    if (!auth.currentUser) return;
    for (const opp of opps) {
      await firebaseService.addOpportunity(opp);
    }
  }
};
