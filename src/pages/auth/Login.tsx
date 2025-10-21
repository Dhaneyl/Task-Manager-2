import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, CheckSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'john.doe@example.com', // Pre-filled for demo
    password: 'Password123',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, formData.rememberMe);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-coral-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center">
                <CheckSquare size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back!</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Enter your credentials to access your account
            </p>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input pl-11"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input pl-11"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-coral-500 border-gray-300 rounded focus:ring-coral-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-coral-500 hover:text-coral-600 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Sign In
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-coral-500 hover:text-coral-600 font-medium">
                Sign up
              </Link>
            </p>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-coral-50 dark:bg-coral-900/20 rounded-lg border border-coral-200 dark:border-coral-800">
              <p className="text-sm font-medium text-coral-800 dark:text-coral-200 mb-2">Demo Credentials:</p>
              <p className="text-xs text-coral-600 dark:text-coral-400">Email: john.doe@example.com</p>
              <p className="text-xs text-coral-600 dark:text-coral-400">Password: Password123</p>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:flex bg-gradient-to-br from-coral-500 to-coral-600 p-12 items-center justify-center">
          <div className="text-center text-white">
            <CheckSquare size={120} className="mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Stay Organized</h3>
            <p className="text-coral-100 text-lg max-w-md">
              Manage your tasks efficiently with our beautiful and intuitive task management system.
            </p>
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  ✓
                </div>
                <span className="text-left">Track all your tasks in one place</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  ✓
                </div>
                <span className="text-left">Organize with categories and priorities</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  ✓
                </div>
                <span className="text-left">Never miss a deadline again</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
