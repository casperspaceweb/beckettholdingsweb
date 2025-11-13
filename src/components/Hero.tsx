import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Technology Solutions That 
              <span className="text-blue-600"> Scale Your Business</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From robust hosting infrastructure to custom applications, we deliver comprehensive 
              technology solutions that drive growth and efficiency for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={onStartProject}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                View Our Work
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">Custom Solutions</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern office with technology setup"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Server Uptime</span>
                  <span className="text-sm font-bold text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Response Time</span>
                  <span className="text-sm font-bold text-blue-600">{"< 200ms"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Hero;