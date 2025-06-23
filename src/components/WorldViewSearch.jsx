import React, { useState, useEffect } from 'react';
import { Search, Globe, TrendingUp, Eye, Filter, Clock, MapPin, BarChart3, Zap, X, Play, ArrowRight, AlertCircle, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WorldViewSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    timeRange: '24h',
    regions: [],
    sources: [],
    sentiment: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Climate Change', 'AI Technology', 'Global Economy', 'Space Exploration'
  ]);

  const trendingTopics = [
    { topic: 'Artificial Intelligence', articles: 1247, trend: '+15%' },
    { topic: 'Climate Summit', articles: 892, trend: '+8%' },
    { topic: 'Cryptocurrency', articles: 743, trend: '-3%' },
    { topic: 'Space Mission', articles: 654, trend: '+22%' },
    { topic: 'Global Trade', articles: 589, trend: '+5%' }
  ];

  const regions = ['North America', 'Europe', 'Asia Pacific', 'Middle East', 'Africa', 'South America'];
  const sources = ['Reuters', 'BBC', 'CNN', 'Al Jazeera', 'The Guardian', 'Wall Street Journal'];

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 3)]);
    }
    
    const response = await axios.post('https://worldview-backend-f07g.onrender.com/api/query/' , {query : searchQuery , country : 'in'});
    
    const data = response.data.content[0];

    console.log(data);

    setSearchResults({
      query,
      totalArticles: data.NoOfArticles,
      summary : data.summary,
      sources: data.sources,
      sentimentScore: data.sentiment_score,
      biasDistribution: {
        left: Math.random() * 40 + 10,
        center: Math.random() * 40 + 20,
        right: Math.random() * 40 + 10
      },
      neutralCoverage : data.neutral_converage,
      topSources: data.top_source
    });
    
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const getSentimentColor = (score) => {
    if (score > 0.2) return 'text-green-600 bg-green-100';
    if (score < -0.2) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getBiasColor = (bias) => {
    switch(bias) {
      case 'left': return 'bg-blue-500';
      case 'center-left': return 'bg-blue-300';
      case 'center': return 'bg-gray-400';
      case 'center-right': return 'bg-red-300';
      case 'right': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                WorldView
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Globe className="w-5 h-5 text-gray-600" />
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" onClick={() => navigate('/')}>
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Global News Perspectives
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter any topic to see how different sources around the world are covering it
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter a topic to analyze (e.g., Climate Change, AI Technology)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-20 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleSearch()}
                disabled={!searchQuery.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Analyze</span>
              </button>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Time Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select 
                  value={filters.timeRange}
                  onChange={(e) => setFilters(prev => ({...prev, timeRange: e.target.value}))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last Week</option>
                  <option value="30d">Last Month</option>
                </select>
              </div>

              {/* Regions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {regions.map(region => (
                    <label key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(region)}
                        onChange={() => toggleFilter('regions', region)}
                        className="mr-2 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sources</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {sources.map(source => (
                    <label key={source} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.sources.includes(source)}
                        onChange={() => toggleFilter('sources', source)}
                        className="mr-2 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sentiment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment</label>
                <select 
                  value={filters.sentiment}
                  onChange={(e) => setFilters(prev => ({...prev, sentiment: e.target.value}))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Recent Searches & Trending */}
        {!searchResults && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Recent Searches */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-red-600 mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-gray-700">{search}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(topic.topic)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-900 font-medium">{topic.topic}</div>
                        <div className="text-sm text-gray-500">{topic.articles} articles</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        topic.trend.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {topic.trend}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Global Coverage</h3>
            <p className="text-gray-600">Gathering articles from sources worldwide...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults && !isSearching && (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Analysis Results: "{searchResults.query}"
                </h2>
                <button
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{searchResults.totalArticles}</div>
                  <div className="text-gray-600">Articles Found</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{searchResults.sources}</div>
                  <div className="text-gray-600">Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {searchResults.sentimentScore ? searchResults.sentimentScore.toFixed(1) : '54'}%
                  </div>
                  <div className="text-gray-600">Sentiment Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {Math.round(searchResults.biasDistribution.center)}%
                  </div>
                  <div className="text-gray-600">Neutral Coverage</div>
                </div>
              </div>

              {/* Bias Distribution */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Bias Distribution</h4>
                <div className="flex rounded-lg overflow-hidden h-4">
                  <div 
                    className="bg-blue-500"
                    style={{width: `${searchResults.biasDistribution.left}%`}}
                  ></div>
                  <div 
                    className="bg-gray-400"
                    style={{width: `${searchResults.biasDistribution.center}%`}}
                  ></div>
                  <div 
                    className="bg-red-500"
                    style={{width: `${searchResults.biasDistribution.right}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Left ({searchResults.biasDistribution.left.toFixed(0)}%)</span>
                  <span>Center ({searchResults.biasDistribution.center.toFixed(0)}%)</span>
                  <span>Right ({searchResults.biasDistribution.right.toFixed(0)}%)</span>
                </div>
              </div>
            </div>

            <div className='p-4 bg-white shadow-2xl rounded-3xl py-6'>Summary :- <br />{searchResults.summary}</div>

            {/* Top Sources */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Sources</h3>
              <div className="space-y-4">
                {searchResults.topSources && searchResults.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {source.source.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{source.source}</div>
                        <div className="text-sm text-gray-600">{source.articles} articles</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(source.sentiment)}`}>
                        {source.sentiment > 0 ? 'Positive' : source.sentiment < 0 ? 'Negative' : 'Neutral'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${source.isPositiveAboutTheTopic && 'red'}`}></div>
                        <span className="text-sm text-gray-600 capitalize">{source.isPositiveAboutTheTopic}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}