import React from 'react';
import { Activity, Users, Globe, ArrowRight } from 'lucide-react';

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="font-semibold text-lg">{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-2">{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const HomePage = () => {
  const features = [
    {
      title: "Product Analytics",
      description: "Track key product metrics and performance indicators to drive growth.",
      icon: <Activity className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Product Management",
      description: "Manage your product catalog, updates, and inventory with ease.",
      icon: <Users className="h-6 w-6 text-green-500" />
    },
    {
      title: "Global Access",
      description: "Access your product data and updates from anywhere in the world.",
      icon: <Globe className="h-6 w-6 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        Welcome Back! Access Your Dashboard to Get Started
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        Your all-in-one solution for streamlining product management
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto text-center">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
          <CardContent className="py-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Ready to get started?
            </h2>
            <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;