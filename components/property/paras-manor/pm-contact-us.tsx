//@ts-nocheck

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000); // Hide alert after 5 seconds
  };

  return (
    <Card className="w-full h-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted && (
          <Alert className="mb-4 transition-opacity duration-500 ease-in-out animate-fade-in bg-green-100 border-green-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Message sent successfully!
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sm:flex sm:space-x-4 sm:space-y-0 space-y-4">
            <div className="sm:w-1/2">
              <Input 
                placeholder="Name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full" 
                required 
              />
            </div>
            <div className="sm:w-1/2">
              <Input 
                type="tel" 
                placeholder="Phone Number" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full" 
                required 
              />
            </div>
          </div>
          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full" 
              required 
            />
          </div>
          <div>
            <Textarea 
              placeholder="Your message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-28 max-h-32" 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;