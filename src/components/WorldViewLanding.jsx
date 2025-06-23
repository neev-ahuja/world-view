import React, { useState, useEffect } from 'react';
import { Globe, Search, Eye, BarChart3, Users, Zap, ArrowRight, Play, CheckCircle, Star, TrendingUp, Shield, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function WorldViewLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global News Scraping",
      description: "Access thousands of sources worldwide for comprehensive coverage"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced sentiment analysis and bias detection algorithms"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Visual Insights",
      description: "Intuitive dashboards that make complex data accessible"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ef4444 0%, transparent 50%)`
        }}
      />

      {/* Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                WorldView
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-red-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-red-600 transition-colors">How It Works</a>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={() => navigate('/search')}>
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
                  See Beyond
                </span>
                <br />
                <span className="text-red-600">The Headlines</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                WorldView analyzes global news sources with AI to reveal bias, sentiment, and factual differences—
                empowering journalists, researchers, and critical thinkers to understand the complete story.
              </p>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="group bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2" onClick={() => navigate('/search')}>
                  <Play className="w-5 h-5" />
                  <span>Start Analyzing</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group p-6 bg-white rounded-2xl shadow-lg border border-red-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-red-300 ${
                      activeFeature === index ? 'ring-2 ring-red-500 shadow-2xl scale-105' : ''
                    }`}
                    style={{
                      animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-50" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ef444410 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #ef444410 0%, transparent 50%)`
          }} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Global Sources" },
              { number: "500K+", label: "Articles Analyzed" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "50+", label: "Countries Covered" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How WorldView Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to uncover the complete story behind any news topic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Search & Scrape",
                description: "Enter any topic and we'll instantly gather articles from thousands of global news sources",
                icon: <Search className="w-12 h-12" />
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our advanced AI analyzes tone, sentiment, and factual differences across sources",
                icon: <Brain className="w-12 h-12" />
              },
              {
                step: "03",
                title: "Visual Insights",
                description: "Get clear, interactive visualizations showing bias patterns and perspective gaps",
                icon: <BarChart3 className="w-12 h-12" />
              }
            ].map((step, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <div className="text-white">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-red-200">
                    <span className="text-red-600 font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-white" id='features'>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features for Every Use Case</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From real-time monitoring to deep analytical insights, WorldView provides the tools you need to understand global narratives
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Feature List */}
            <div className="space-y-8">
              {[
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Real-Time Monitoring",
                  description: "Track breaking news as it develops across multiple sources with instant notifications and trend analysis."
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Bias Detection",
                  description: "Advanced algorithms identify political leaning, emotional tone, and editorial stance across different publications."
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Sentiment Analysis",
                  description: "Understand the emotional context behind news coverage with detailed sentiment scoring and trend tracking."
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Global Coverage",
                  description: "Access news from over 50 countries in multiple languages with automatic translation and cultural context."
                },
                {
                  icon: <Eye className="w-6 h-6" />,
                  title: "Fact Verification",
                  description: "Cross-reference claims across sources to identify inconsistencies and verify factual accuracy."
                }
              ].map((feature, index) => (
                <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-red-50 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-red-100">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Live Analysis: "Climate Change"</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Live</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Sources Analyzed</span>
                      <span className="font-semibold text-gray-900">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Sentiment Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-14 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Concerned</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Bias Distribution</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">BBC News</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Neutral</span>
                    </div>
                    <p className="text-sm text-gray-600">Factual reporting with balanced perspective...</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">The Guardian</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Pro-Action</span>
                    </div>
                    <p className="text-sm text-gray-600">Urgent call for immediate climate action...</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Wall Street Journal</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Economic Focus</span>
                    </div>
                    <p className="text-sm text-gray-600">Analysis of economic implications...</p>
                  </div>
                </div>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-600 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to See the Bigger Picture?</h2>
          <p className="text-xl mb-12 text-red-100">
            Join thousands of professionals who rely on WorldView for unbiased news analysis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}