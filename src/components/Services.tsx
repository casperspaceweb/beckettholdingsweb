import React from 'react';
import { Server, Cloud, Phone, Code, Database, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Server,
      title: 'Web Hosting',
      description: 'Reliable, fast, and secure web hosting solutions with 99.9% uptime guarantee.',
      features: ['SSL Certificates', 'Daily Backups', 'CDN Integration', '24/7 Monitoring']
    },
    {
      icon: Cloud,
      title: 'VPS Hosting',
      description: 'Scalable virtual private servers with root access and full control.',
      features: ['SSD Storage', 'Dedicated Resources', 'Custom OS', 'API Management']
    },
    {
      icon: Phone,
      title: 'Call Center Solutions',
      description: 'Advanced dialing systems and call center management platforms.',
      features: ['Auto Dialing', 'Call Recording', 'Analytics', 'CRM Integration']
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Tailored CRM, PMS, and dashboard solutions built for your business needs.',
      features: ['CRM Systems', 'PMS Platforms', 'Custom Dashboards', 'Mobile Apps']
    },
    {
      icon: Database,
      title: 'API Integration',
      description: 'Seamless integration of third-party services and custom API development.',
      features: ['REST APIs', 'GraphQL', 'Webhooks', 'Data Sync']
    },
    {
      icon: Settings,
      title: 'Consulting',
      description: 'Expert technology consulting to optimize your digital infrastructure.',
      features: ['Architecture Review', 'Performance Optimization', 'Security Audit', 'Migration Planning']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to scale with your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;