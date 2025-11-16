import React from 'react';
import TiltCard from '../TiltCard';
import LiveTrackingMap from '../LiveTrackingMap';

const TrackingPage = () => {
    return (
        <section id="tracking" className="h-full snap-start flex flex-col justify-center p-2 section-container">
            <div className="overflow-y-auto py-4 pr-2">
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8 section-title transition-colors duration-500">Live Asset Tracking</h2>
                <TiltCard>
                    <LiveTrackingMap />
                </TiltCard>
            </div>
        </section>
    );
};

export default TrackingPage;