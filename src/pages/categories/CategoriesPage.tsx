import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import type { CategoryFormData } from '../../types';

const CategoriesPage: React.FC = () => {
  const { categories, statistics, addCategory, updateCategory, deleteCategory } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    color: '#FF6B6B',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, formData);
    } else {
      addCategory(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', color: '#FF6B6B' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Categories" subtitle="Organize your tasks with categories" />

      <div className="p-8">
        <div className="flex justify-end mb-6">
          <Button onClick={() => {resetForm(); setShowModal(true);}} icon={<Plus size={20} />}>
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const taskCount = statistics.byCategory[category.id] || 0;
            return (
              <div key={category.id} className="card card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: category.color }}>
                      <span className="text-white text-2xl font-bold">{category.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm text-secondary">{taskCount} tasks</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormData({ name: category.name, color: category.color });
                        setEditingId(category.id);
                        setShowModal(true);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <Edit2 size={16} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full" style={{ backgroundColor: category.color, width: `${Math.min(taskCount * 10, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => {setShowModal(false); resetForm();}} title={editingId ? 'Edit Category' : 'Add Category'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Category Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="e.g., Work, Personal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Color *</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-primary"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="input flex-1"
                placeholder="#FF6B6B"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">{editingId ? 'Update' : 'Create'}</Button>
            <Button type="button" variant="secondary" onClick={() => {setShowModal(false); resetForm();}}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
