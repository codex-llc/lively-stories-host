import React from 'react';
import { Star, Heart, PenTool, BookOpen, Users, Mail, Twitter, Instagram, Github } from 'lucide-react';

const LivelyFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-20 opacity-20">
        <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
      </div>
      <div className="absolute top-32 right-32 opacity-20">
        <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-10">
        <PenTool className="w-8 h-8 text-cyan-400" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-2 rounded-lg mr-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Lively
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A vibrant creative community where stories come alive, poems touch hearts, and creativity knows no bounds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-purple-600 transition-colors duration-300 p-2 rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 transition-colors duration-300 p-2 rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-600 transition-colors duration-300 p-2 rounded-full">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-300">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Articles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Buy Articles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Hire Writers</a></li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-300">Community</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Featured Creators</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Writing Contests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Poetry Corner</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">Creator Resources</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-300">Stay Connected</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get weekly inspiration and updates from our creative community.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 px-4 py-2 rounded-r-lg transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Lively. All rights reserved. Made with{" "}
              <Heart className="inline w-4 h-4 text-pink-500 mx-1" />
              for creators worldwide.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default LivelyFooter;