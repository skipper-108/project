import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Search, 
  Edit, 
  Package, 
  Filter,
  X,
  Save,
  Loader
} from 'lucide-react';
import { productsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({ limit: 100 });
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        // For editing, we only support quantity updates based on backend API
        if (editingProduct.quantity !== parseInt(data.quantity)) {
          await productsAPI.updateQuantity(editingProduct.id, parseInt(data.quantity));
          toast.success('Product quantity updated successfully');
        }
      } else {
        // Add new product
        await productsAPI.create({
          ...data,
          quantity: parseInt(data.quantity),
          price: parseFloat(data.price),
        });
        toast.success('Product added successfully');
      }
      
      await fetchProducts();
      handleCancel();
    } catch (error) {
      console.error('Error saving product:', error);
      const message = error.response?.data?.message || 'Failed to save product';
      toast.error(message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('type', product.type);
    setValue('sku', product.sku);
    setValue('imageUrl', product.imageUrl || '');
    setValue('description', product.description || '');
    setValue('quantity', product.quantity);
    setValue('price', product.price);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    reset();
  };

  const handleQuantityUpdate = async (productId, newQuantity) => {
    try {
      await productsAPI.updateQuantity(productId, parseInt(newQuantity));
      toast.success('Quantity updated successfully');
      await fetchProducts();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !typeFilter || product.type === typeFilter;
    
    const matchesStock = !stockFilter || 
                        (stockFilter === 'in-stock' && product.quantity > 10) ||
                        (stockFilter === 'low-stock' && product.quantity > 0 && product.quantity <= 10) ||
                        (stockFilter === 'out-of-stock' && product.quantity === 0);
    
    return matchesSearch && matchesType && matchesStock;
  });

  // Get unique product types for filter
  const productTypes = [...new Set(products.map(product => product.type))];

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your inventory items</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <select
            className="input-field"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            className="input-field"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock Levels</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          {/* Clear Filters */}
          {(searchTerm || typeFilter || stockFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('');
                setStockFilter('');
              }}
              className="btn-outline flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={handleCancel}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="input-field"
                    disabled={!!editingProduct}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                {/* Type */}
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    className="input-field"
                    disabled={!!editingProduct}
                    {...register('type', { required: 'Type is required' })}
                  />
                  {errors.type && <p className="form-error">{errors.type.message}</p>}
                </div>

                {/* SKU */}
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    type="text"
                    className="input-field"
                    disabled={!!editingProduct}
                    {...register('sku', { required: 'SKU is required' })}
                  />
                  {errors.sku && <p className="form-error">{errors.sku.message}</p>}
                </div>

                {/* Image URL */}
                <div className="form-group">
                  <label className="form-label">Image URL (Optional)</label>
                  <input
                    type="url"
                    className="input-field"
                    disabled={!!editingProduct}
                    {...register('imageUrl')}
                  />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    disabled={!!editingProduct}
                    {...register('description')}
                  />
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="0"
                    className="input-field"
                    {...register('quantity', { 
                      required: 'Quantity is required',
                      min: { value: 0, message: 'Quantity must be 0 or greater' }
                    })}
                  />
                  {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
                </div>

                {/* Price */}
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="input-field"
                    disabled={!!editingProduct}
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be 0 or greater' }
                    })}
                  />
                  {errors.price && <p className="form-error">{errors.price.message}</p>}
                </div>

                {editingProduct && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      Note: Only quantity can be updated for existing products.
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="card overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onQuantityUpdate={handleQuantityUpdate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {products.length === 0 ? 'No products found' : 'No products match your filters'}
            </p>
            {products.length === 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Add your first product</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Product Row Component
const ProductRow = ({ product, onEdit, onQuantityUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quantity);

  const handleQuantitySubmit = async (e) => {
    e.preventDefault();
    if (newQuantity !== product.quantity) {
      await onQuantityUpdate(product.id, newQuantity);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewQuantity(product.quantity);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {product.imageUrl && (
            <img 
              className="h-10 w-10 rounded-lg object-cover mr-3" 
              src={product.imageUrl} 
              alt={product.name}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <form onSubmit={handleQuantitySubmit} className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              autoFocus
            />
            <button type="submit" className="text-green-600 hover:text-green-700">
              <Save className="h-4 w-4" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-gray-500">
              <X className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div 
            className="text-sm text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => setIsEditing(true)}
          >
            {product.quantity}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price?.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            product.quantity === 0
              ? 'bg-red-100 text-red-800'
              : product.quantity <= 10
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {product.quantity === 0
            ? 'Out of Stock'
            : product.quantity <= 10
            ? 'Low Stock'
            : 'In Stock'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onEdit(product)}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>
      </td>
    </tr>
  );
};

export default Products; 