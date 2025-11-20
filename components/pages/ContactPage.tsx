
import React, { useState, FormEvent } from 'react';
import { FormStatus } from '../../types';
import TiltCard from '../TiltCard';
import { MailIcon, PhoneIcon, SendIcon } from '../icons/Icons';
import StaggeredList from '../StaggeredList';

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
                                          <div className="space-y-2">
                                              <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                              <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20" 
                                                placeholder="John Doe"
                                                required 
                                                disabled={status === 'sending'} 
                                              />
                                          </div>
                                          <div className="space-y-2">
                                              <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email</label>
                                              <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20" 
                                                placeholder="john@example.com"
                                                required 
                                                disabled={status === 'sending'}
                                              />
                                          </div>
                                      </div>
                                      <div className="space-y-2">
                                          <label htmlFor="message" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Message</label>
                                          <textarea 
                                            id="message" 
                                            name="message" 
                                            rows={5} 
                                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 resize-none" 
                                            placeholder="Hello, I'd like to talk about..."
                                            required 
                                            disabled={status === 'sending'}
                                          ></textarea>
                                      </div>
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
                                <a href="mailto:portfolio.sar@gmail.com" className="group block bg-white dark:bg-mono-mid p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center gap-5">
                                        <div className="p-4 bg-brand-green/10 text-brand-green rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-mono-black">
                                            <MailIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white transition-colors">Email Me</h4>
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-brand-green transition-colors font-medium">portfolio.sar@gmail.com</p>
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>
                            <TiltCard>
                                <a href="tel:+8801681821004" className="group block bg-white dark:bg-mono-mid p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                     <div className="flex items-center gap-5">
                                        <div className="p-4 bg-brand-green/10 text-brand-green rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-mono-black">
                                            <PhoneIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white transition-colors">Call Me</h4>
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-brand-green transition-colors font-medium">+88 01681821004</p>
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>
                        </StaggeredList>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
