
import React, { useState, FormEvent } from 'react';
import { FormStatus } from '../../types';
import TiltCard from '../TiltCard';
import { MailIcon, PhoneIcon, SendIcon } from '../icons/Icons';
import StaggeredList from '../StaggeredList';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import { profileData } from '../../constants';

const ContactPage = () => {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setMessage('');

        setTimeout(() => {
            const success = Math.random() > 0.2; 
            if (success) {
                setStatus('success');
                setMessage('Message sent! I will get back to you shortly.');
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setStatus('error');
                setMessage('Failed to send. Please try again.');
            }
             setTimeout(() => setStatus('idle'), 4000);
        }, 1500);
    };

    return (
        <section id="contact" className="min-h-screen lg:h-full snap-start flex flex-col justify-center p-2 section-container">
             <div className="lg:overflow-y-auto overflow-visible py-4 pr-2">
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8 flex-shrink-0 section-title transition-colors duration-500 tracking-tight">
                    Get In Touch
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-1">
                        <StaggeredList>
                            <TiltCard>
                              <div className="bg-white dark:bg-mono-mid p-8 rounded-3xl border border-gray-100 dark:border-white/5 h-full transition-colors duration-500 shadow-lg shadow-gray-100/50 dark:shadow-none">
                                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                      I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                  </p>
                                  <form onSubmit={handleSubmit} className="space-y-5">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                          <FormInput 
                                            label="Name"
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            disabled={status === 'sending'}
                                          />
                                          <FormInput 
                                            label="Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            disabled={status === 'sending'}
                                          />
                                      </div>
                                      <FormTextarea 
                                        label="Message"
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Hello, I'd like to talk about..."
                                        required
                                        disabled={status === 'sending'}
                                      />
                                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                                          <button 
                                              type="submit"
                                              disabled={status === 'sending'}
                                              className="w-full sm:w-auto bg-brand-green text-mono-black font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(160,219,36,0.39)] hover:shadow-[0_6px_20px_rgba(160,219,36,0.23)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                          >
                                              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                              {!status.startsWith('send') && <SendIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                          </button>
                                          
                                          {status !== 'idle' && status !== 'sending' && (
                                            <div className={`text-sm font-medium px-4 py-2 rounded-lg animate-fade-in ${
                                                status === 'success' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                                            }`}>
                                                {message}
                                            </div>
                                          )}
                                      </div>
                                  </form>
                              </div>
                            </TiltCard>
                        </StaggeredList>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <StaggeredList>
                            <TiltCard>
                                <a href={`mailto:${profileData.email}`} className="group block bg-white dark:bg-mono-mid p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center gap-5">
                                        <div className="p-4 bg-brand-green/10 text-brand-green rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-mono-black">
                                            <MailIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white transition-colors">Email Me</h4>
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-brand-green transition-colors font-medium">{profileData.email}</p>
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>
                            <TiltCard>
                                <a href={`tel:${profileData.phone}`} className="group block bg-white dark:bg-mono-mid p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                     <div className="flex items-center gap-5">
                                        <div className="p-4 bg-brand-green/10 text-brand-green rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-mono-black">
                                            <PhoneIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white transition-colors">Call Me</h4>
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-brand-green transition-colors font-medium">{profileData.phone}</p>
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>

                            {/* QR Code Card */}
                            <TiltCard>
                                <div className="group block bg-white dark:bg-mono-mid p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                                     <div className="flex items-center gap-5">
                                        <div className="p-2 bg-white rounded-xl border border-gray-100 shrink-0 transition-transform duration-300 group-hover:scale-105">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileData.website || 'https://www.saifulrafi.com')}`} 
                                                alt="Resume QR Code" 
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white transition-colors">Scan for Resume</h4>
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-brand-green transition-colors font-medium text-sm mt-1">Quick access to digital resume</p>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </StaggeredList>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
