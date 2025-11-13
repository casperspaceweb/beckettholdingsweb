import React from 'react';
import { ExternalLink, Code, BarChart3, Users, ShoppingCart } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Dashboard',
      description: 'Comprehensive analytics and management dashboard for online retail businesses',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      icon: ShoppingCart
    },
    {
      title: 'CRM Platform',
      description: 'Custom customer relationship management system with advanced reporting',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      icon: Users
    },
    {
      title: 'Analytics Suite',
      description: 'Real-time data visualization and business intelligence platform',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      icon: BarChart3
    },
    {
      title: 'PMS System',
      description: 'Property management system with booking, billing, and maintenance tracking',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS'],
      icon: Code
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent projects and custom applications we've built for our clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <project.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;