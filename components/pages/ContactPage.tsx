import React, { useState, FormEvent } from 'react';
import { FormStatus } from '../../types';
import TiltCard from '../TiltCard';
import { MailIcon, PhoneIcon } from '../icons/Icons';
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
                setMessage('Your message has been sent successfully! Thank you.');
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setStatus('error');
                setMessage('Something went wrong. Please try again later.');
            }
             setTimeout(() => setStatus('idle'), 4000);
        }, 1500);
    };

    return (
        <section id="contact" className="h-full snap-start flex flex-col justify-center p-2 section-container">
             <div className="overflow-y-auto py-4 pr-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 section-title transition-colors duration-500">Get In Touch</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <TiltCard>
                          <div className="bg-white dark:bg-mono-dark p-8 rounded-2xl border border-gray-200 dark:border-mono-mid h-full transition-colors duration-500">
                              <p className="text-gray-600 dark:text-mono-light mb-6 transition-colors duration-500">
                                  I'm currently open to new opportunities and collaborations. Feel free to reach out using the form below, and I'll get back to you as soon as possible.
                              </p>
                              <form onSubmit={handleSubmit}>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                      <div>
                                          <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-mono-light mb-2 transition-colors duration-500">Your Name</label>
                                          <input type="text" id="name" name="name" className="w-full bg-gray-100 dark:bg-mono-black border border-gray-200 dark:border-mono-mid rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-400/80 dark:focus:ring-mono-white/80 focus:border-gray-400/10 dark:focus:border-mono-white/10 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-[0_0_15px_rgba(107,114,128,0.2)] dark:focus:shadow-[0_0_15px_rgba(224,224,224,0.2)]" required disabled={status === 'sending'} />
                                      </div>
                                      <div>
                                          <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-mono-light mb-2 transition-colors duration-500">Your Email</label>
                                          <input type="email" id="email" name="email" className="w-full bg-gray-100 dark:bg-mono-black border border-gray-200 dark:border-mono-mid rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-400/80 dark:focus:ring-mono-white/80 focus:border-gray-400/10 dark:focus:border-mono-white/10 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-[0_0_15px_rgba(107,114,128,0.2)] dark:focus:shadow-[0_0_15px_rgba(224,224,224,0.2)]" required disabled={status === 'sending'}/>
                                      </div>
                                  </div>
                                  <div className="mb-6">
                                      <label htmlFor="message" className="block text-sm font-medium text-gray-500 dark:text-mono-light mb-2 transition-colors duration-500">Message</label>
                                      <textarea id="message" name="message" rows={5} className="w-full bg-gray-100 dark:bg-mono-black border border-gray-200 dark:border-mono-mid rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-400/80 dark:focus:ring-mono-white/80 focus:border-gray-400/10 dark:focus:border-mono-white/10 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-[0_0_15px_rgba(107,114,128,0.2)] dark:focus:shadow-[0_0_15px_rgba(224,224,224,0.2)]" required disabled={status === 'sending'}></textarea>
                                  </div>
                                  <div className="flex flex-col sm:flex-row items-center gap-4">
                                      <button 
                                          type="submit"
                                          disabled={status === 'sending'}
                                          className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900 dark:from-mono-light dark:to-mono-white text-white dark:text-mono-black font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-[0_5px_20px_rgba(107,114,128,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(55,65,81,0.2)] dark:shadow-[0_5px_20px_rgba(160,160,160,0.2)] dark:hover:shadow-[0_8px_30px_rgba(224,224,224,0.2)] group"
                                      >
                                          <span className="absolute inset-0 bg-white/20 animate-shimmer bg-[length:200%_100%]"></span>
                                          <span className="relative">{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                      </button>
                                      {status !== 'idle' && status !== 'sending' && (
                                          <div className={`text-sm p-2 rounded-md animate-fade-in ${
                                              status === 'success' ? 'text-status-green bg-status-green/10' : 'text-status-red bg-status-red/10'
                                          }`}>{message}</div>
                                      )}
                                  </div>
                              </form>
                          </div>
                        </TiltCard>
                    </div>

                    <div className="lg:col-span-2">
                        <StaggeredList>
                            <TiltCard>
                                <a href="mailto:saiful.alam.rafi@example.com" className="block bg-white dark:bg-mono-dark p-6 rounded-2xl border border-gray-200 dark:border-mono-mid hover:border-gray-300 dark:hover:border-mono-light/30 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 dark:bg-mono-mid rounded-lg text-gray-800 dark:text-mono-white transition-colors duration-500">
                                            <MailIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-500">Email</h4>
                                            <p className="text-sm text-gray-600 dark:text-mono-light hover:underline transition-colors duration-500">saiful.alam.rafi@example.com</p>
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>
                            <TiltCard>
                                <a href="tel:+1234567890" className="block bg-white dark:bg-mono-dark p-6 rounded-2xl border border-gray-200 dark:border-mono-mid hover:border-gray-300 dark:hover:border-mono-light/30 transition-all duration-300">
                                     <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 dark:bg-mono-mid rounded-lg text-gray-800 dark:text-mono-white transition-colors duration-500">
                                            <PhoneIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-500">Phone</h4>
                                            <p className="text-sm text-gray-600 dark:text-mono-light hover:underline transition-colors duration-500">+1 (234) 567-890</p>
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