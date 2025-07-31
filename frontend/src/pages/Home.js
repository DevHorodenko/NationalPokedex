import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Users, 
  Zap, 
  Shield, 
  Heart,
  ArrowRight,
  Star
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Complete Pokédex',
      description: 'Browse through hundreds of Pokémon with detailed information, stats, and abilities.'
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find Pokémon by name, type, or number range with our powerful search functionality.'
    },
    {
      icon: Plus,
      title: 'Personal Collection',
      description: 'Create and manage your own Pokémon collection with custom notes and favorites.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other trainers and share your Pokémon discoveries.'
    }
  ];

  const stats = [
    { icon: Zap, label: 'Total Pokémon', value: '150+' },
    { icon: Shield, label: 'Types', value: '18' },
    { icon: Heart, label: 'Active Users', value: '1,000+' },
    { icon: Star, label: 'Collections', value: '500+' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              National Pokédex
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for exploring the world of Pokémon. Discover, collect, and learn about every Pokémon in the National Pokédex.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/pokemon"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Pokédex
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/my-pokemon"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  My Collection
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center gap-2"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Welcome Message for Authenticated Users */}
      {isAuthenticated && (
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.firstName || user?.username}! 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to continue your Pokémon journey? Check out your collection or discover new Pokémon.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/my-pokemon"
                className="btn-primary flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                View My Collection
              </Link>
              <Link
                to="/pokemon/add"
                className="btn-secondary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Pokémon
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to become a Pokémon Master
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and information you need to explore the Pokémon universe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <feature.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start your Pokémon adventure?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of trainers who are already exploring the National Pokédex.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Account
            </Link>
          )}
          <Link
            to="/pokemon"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Explore Pokédex
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 