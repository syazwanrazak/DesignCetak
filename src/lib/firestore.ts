import {
  collection, doc, getDocs, setDoc, deleteDoc, writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/types';
import { DEFAULT_PRODUCTS } from '@/constants';

const COL = 'products';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, COL));
    if (snap.empty) return DEFAULT_PRODUCTS as unknown as Product[];
    const docs = snap.docs.map(d => d.data() as Product);
    return docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch {
    return DEFAULT_PRODUCTS as unknown as Product[];
  }
}

/** Seeds DEFAULT_PRODUCTS into Firestore if the collection is empty, then returns all products. */
export async function getOrSeedProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, COL));
    if (!snap.empty) return snap.docs.map(d => d.data() as Product);
    const defaults = DEFAULT_PRODUCTS as unknown as Product[];
    const batch = writeBatch(db);
    defaults.forEach(p => batch.set(doc(db, COL, String(p.id)), p));
    await batch.commit();
    return defaults;
  } catch {
    return DEFAULT_PRODUCTS as unknown as Product[];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find(p => p.id === id) ?? null;
}

export async function saveProduct(product: Product): Promise<void> {
  await setDoc(doc(db, COL, String(product.id)), product);
}

export async function saveAllProducts(products: Product[]): Promise<void> {
  const batch = writeBatch(db);
  products.forEach(p => batch.set(doc(db, COL, String(p.id)), p));
  await batch.commit();
}

export async function deleteProduct(id: number): Promise<void> {
  await deleteDoc(doc(db, COL, String(id)));
}
