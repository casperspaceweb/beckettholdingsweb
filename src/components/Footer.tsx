import React from 'react';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">Beckett Holdings</span>
            </div>
            <p className="text-gray-400 mb-6">
              Delivering innovative technology solutions that drive business growth and digital transformation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Github className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Hosting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">VPS Hosting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Call Center Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Custom Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">contact@beckettholdings.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">(062) 628 7461</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">28 Essex Terrace<br />Berea West, Westville, 3629</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Beckett Holdings. All rights reserved. | Built with passion for technology excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;