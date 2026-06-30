import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// 1. Add a new task
export const addTask = async (userId, taskData) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const docRef = await addDoc(tasksRef, {
    title: taskData.title,
    description: taskData.description || '',
    dueDate: taskData.dueDate,
    priority: taskData.priority || 'Medium',
    completed: false,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// 2. Listen to tasks in real-time
export const getTasksRealtime = (userId, callback) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const q = query(tasksRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(tasks);
  }, (error) => {
    console.error("Error listening to tasks: ", error);
  });
};

// 3. Update an existing task
export const updateTask = async (userId, taskId, updatedData) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskRef, updatedData);
};

// 4. Delete a task
export const deleteTask = async (userId, taskId) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskRef);
};