import Category from '../models/Category';
import Priority from '../models/Priority';

export const seedDefaultCategories = async (userId: string) => {
  const existingCategories = await Category.find({ userId });

  if (existingCategories.length === 0) {
    const defaultCategories = [
      { name: 'Work', color: '#3B82F6', userId },
      { name: 'Personal', color: '#10B981', userId },
      { name: 'Shopping', color: '#F59E0B', userId },
      { name: 'Health', color: '#EF4444', userId },
      { name: 'Learning', color: '#8B5CF6', userId },
    ];

    await Category.insertMany(defaultCategories);
    console.log(`Created ${defaultCategories.length} default categories for user ${userId}`);
  }
};

export const seedDefaultPriorities = async (userId: string) => {
  const existingPriorities = await Priority.find({ userId });

  if (existingPriorities.length === 0) {
    const defaultPriorities = [
      { name: 'Low', level: 'low' as const, color: '#10B981', userId },
      { name: 'Medium', level: 'medium' as const, color: '#F59E0B', userId },
      { name: 'High', level: 'high' as const, color: '#EF4444', userId },
    ];

    await Priority.insertMany(defaultPriorities);
    console.log(`Created ${defaultPriorities.length} default priorities for user ${userId}`);
  }
};

export const seedUserDefaults = async (userId: string) => {
  await Promise.all([
    seedDefaultCategories(userId),
    seedDefaultPriorities(userId),
  ]);
};
