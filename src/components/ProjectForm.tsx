import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, ProjectSubmission } from '../lib/supabase';

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'sms' | 'both',
    service: '',
    serviceDetails: {} as Record<string, any>
  });

  const services = [
    { id: 'webhosting', name: 'Web Hosting', description: 'Reliable and fast web hosting solutions' },
    { id: 'vps', name: 'VPS Hosting', description: 'Scalable virtual private servers' },
    { id: 'callcenter', name: 'Call Center Solutions', description: 'Advanced dialing and management systems' },
    { id: 'crm', name: 'CRM Development', description: 'Custom customer relationship management' },
    { id: 'pms', name: 'PMS Development', description: 'Property management systems' },
    { id: 'dashboard', name: 'Custom Dashboard', description: 'Business intelligence dashboards' },
    { id: 'api', name: 'API Integration', description: 'Third-party service integrations' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceDetailChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: { ...prev.serviceDetails, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submission: Omit<ProjectSubmission, 'id' | 'created_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        contact: formData.contact,
        preferred_contact: formData.preferredContact,
        service: formData.service,
        service_details: formData.serviceDetails
      };

      const { error } = await supabase
        .from('project_submissions')
        .insert([submission]);

      if (error) throw error;

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderServiceQuestions = () => {
    switch (formData.service) {
      case 'webhosting':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you own a domain?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ownDomain"
                    value="yes"
                    checked={formData.serviceDetails.ownDomain === 'yes'}
                    onChange={(e) => handleServiceDetailChange('ownDomain', e.target.value)}
                    className="mr-2"
                  />
                  Yes, I have a domain
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ownDomain"
                    value="no"
                    checked={formData.serviceDetails.ownDomain === 'no'}
                    onChange={(e) => handleServiceDetailChange('ownDomain', e.target.value)}
                    className="mr-2"
                  />
                  No, I need a domain
                </label>
              </div>
            </div>

            {formData.serviceDetails.ownDomain === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Name</label>
                <input
                  type="text"
                  value={formData.serviceDetails.domainName || ''}
                  onChange={(e) => handleServiceDetailChange('domainName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example.com"
                />
              </div>
            )}

            {formData.serviceDetails.ownDomain === 'no' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Domain Name</label>
                <input
                  type="text"
                  value={formData.serviceDetails.preferredDomain || ''}
                  onChange={(e) => handleServiceDetailChange('preferredDomain', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="mydomain.com"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Traffic</label>
              <select
                value={formData.serviceDetails.traffic || ''}
                onChange={(e) => handleServiceDetailChange('traffic', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select expected traffic</option>
                <option value="low">Low (&lt; 1,000 visitors/month)</option>
                <option value="medium">Medium (1,000 - 10,000 visitors/month)</option>
                <option value="high">High (&gt; 10,000 visitors/month)</option>
              </select>
            </div>
          </div>
        );

      case 'vps':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Server Specifications</label>
              <select
                value={formData.serviceDetails.specs || ''}
                onChange={(e) => handleServiceDetailChange('specs', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select server specs</option>
                <option value="basic">Basic (1 CPU, 1GB RAM, 20GB SSD)</option>
                <option value="standard">Standard (2 CPU, 4GB RAM, 80GB SSD)</option>
                <option value="premium">Premium (4 CPU, 8GB RAM, 160GB SSD)</option>
                <option value="custom">Custom specifications</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
              <select
                value={formData.serviceDetails.os || ''}
                onChange={(e) => handleServiceDetailChange('os', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select OS</option>
                <option value="ubuntu">Ubuntu</option>
                <option value="centos">CentOS</option>
                <option value="debian">Debian</option>
                <option value="windows">Windows Server</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
              <textarea
                value={formData.serviceDetails.useCase || ''}
                onChange={(e) => handleServiceDetailChange('useCase', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what you'll use the VPS for..."
              />
            </div>
          </div>
        );

      case 'callcenter':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Agents</label>
              <select
                value={formData.serviceDetails.agents || ''}
                onChange={(e) => handleServiceDetailChange('agents', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select number of agents</option>
                <option value="1-5">1-5 agents</option>
                <option value="6-20">6-20 agents</option>
                <option value="21-50">21-50 agents</option>
                <option value="50+">50+ agents</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Call Type</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.inbound || false}
                    onChange={(e) => handleServiceDetailChange('inbound', e.target.checked)}
                    className="mr-2"
                  />
                  Inbound calls
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.outbound || false}
                    onChange={(e) => handleServiceDetailChange('outbound', e.target.checked)}
                    className="mr-2"
                  />
                  Outbound calls
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Features</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.recording || false}
                    onChange={(e) => handleServiceDetailChange('recording', e.target.checked)}
                    className="mr-2"
                  />
                  Call recording
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.analytics || false}
                    onChange={(e) => handleServiceDetailChange('analytics', e.target.checked)}
                    className="mr-2"
                  />
                  Analytics & reporting
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.crm || false}
                    onChange={(e) => handleServiceDetailChange('crm', e.target.checked)}
                    className="mr-2"
                  />
                  CRM integration
                </label>
              </div>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                value={formData.serviceDetails.businessType || ''}
                onChange={(e) => handleServiceDetailChange('businessType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Users</label>
              <select
                value={formData.serviceDetails.users || ''}
                onChange={(e) => handleServiceDetailChange('users', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select number of users</option>
                <option value="1-5">1-5 users</option>
                <option value="6-20">6-20 users</option>
                <option value="21-50">21-50 users</option>
                <option value="50+">50+ users</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Features</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.leadManagement || false}
                    onChange={(e) => handleServiceDetailChange('leadManagement', e.target.checked)}
                    className="mr-2"
                  />
                  Lead management
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.salesPipeline || false}
                    onChange={(e) => handleServiceDetailChange('salesPipeline', e.target.checked)}
                    className="mr-2"
                  />
                  Sales pipeline
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.emailIntegration || false}
                    onChange={(e) => handleServiceDetailChange('emailIntegration', e.target.checked)}
                    className="mr-2"
                  />
                  Email integration
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.reporting || false}
                    onChange={(e) => handleServiceDetailChange('reporting', e.target.checked)}
                    className="mr-2"
                  />
                  Advanced reporting
                </label>
              </div>
            </div>
          </div>
        );

      case 'pms':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={formData.serviceDetails.propertyType || ''}
                onChange={(e) => handleServiceDetailChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select property type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed use</option>
                <option value="vacation">Vacation rentals</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Properties</label>
              <select
                value={formData.serviceDetails.propertyCount || ''}
                onChange={(e) => handleServiceDetailChange('propertyCount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select number of properties</option>
                <option value="1-10">1-10 properties</option>
                <option value="11-50">11-50 properties</option>
                <option value="51-100">51-100 properties</option>
                <option value="100+">100+ properties</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Features</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.tenantPortal || false}
                    onChange={(e) => handleServiceDetailChange('tenantPortal', e.target.checked)}
                    className="mr-2"
                  />
                  Tenant portal
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.maintenanceTracking || false}
                    onChange={(e) => handleServiceDetailChange('maintenanceTracking', e.target.checked)}
                    className="mr-2"
                  />
                  Maintenance tracking
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.rentCollection || false}
                    onChange={(e) => handleServiceDetailChange('rentCollection', e.target.checked)}
                    className="mr-2"
                  />
                  Rent collection
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.financialReporting || false}
                    onChange={(e) => handleServiceDetailChange('financialReporting', e.target.checked)}
                    className="mr-2"
                  />
                  Financial reporting
                </label>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Purpose</label>
              <textarea
                value={formData.serviceDetails.purpose || ''}
                onChange={(e) => handleServiceDetailChange('purpose', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what the dashboard should accomplish..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Sources</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.database || false}
                    onChange={(e) => handleServiceDetailChange('database', e.target.checked)}
                    className="mr-2"
                  />
                  Database
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.apis || false}
                    onChange={(e) => handleServiceDetailChange('apis', e.target.checked)}
                    className="mr-2"
                  />
                  External APIs
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.files || false}
                    onChange={(e) => handleServiceDetailChange('files', e.target.checked)}
                    className="mr-2"
                  />
                  File uploads
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Features</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.realTime || false}
                    onChange={(e) => handleServiceDetailChange('realTime', e.target.checked)}
                    className="mr-2"
                  />
                  Real-time updates
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.userRoles || false}
                    onChange={(e) => handleServiceDetailChange('userRoles', e.target.checked)}
                    className="mr-2"
                  />
                  User roles & permissions
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceDetails.exportData || false}
                    onChange={(e) => handleServiceDetailChange('exportData', e.target.checked)}
                    className="mr-2"
                  />
                  Data export
                </label>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Integration Type</label>
              <select
                value={formData.serviceDetails.integrationType || ''}
                onChange={(e) => handleServiceDetailChange('integrationType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select integration type</option>
                <option value="payment">Payment gateway</option>
                <option value="social">Social media</option>
                <option value="email">Email service</option>
                <option value="analytics">Analytics</option>
                <option value="custom">Custom API</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Third-party Services</label>
              <textarea
                value={formData.serviceDetails.services || ''}
                onChange={(e) => handleServiceDetailChange('services', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List the services you want to integrate with..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Volume</label>
              <select
                value={formData.serviceDetails.volume || ''}
                onChange={(e) => handleServiceDetailChange('volume', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select expected volume</option>
                <option value="low">Low (&lt; 1,000 requests/day)</option>
                <option value="medium">Medium (1,000 - 10,000 requests/day)</option>
                <option value="high">High (&gt; 10,000 requests/day)</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            Your project request has been submitted successfully. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">
            There was an error submitting your request. Please try again.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={step > 1 ? () => setStep(step - 1) : onClose}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Start Your Project</h2>
            </div>
            <div className="text-sm text-gray-500">Step {step} of 3</div>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="mr-2"
                    />
                    WhatsApp
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="sms"
                      checked={formData.preferredContact === 'sms'}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="mr-2"
                    />
                    SMS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="both"
                      checked={formData.preferredContact === 'both'}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="mr-2"
                    />
                    Both WhatsApp and SMS
                  </label>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.contact}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Select Service
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Service</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                  <label key={service.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={formData.service === service.id}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg transition-colors ${
                      formData.service === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!formData.service}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Service Details
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h3>
              
              {renderServiceQuestions()}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Submit Project <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;