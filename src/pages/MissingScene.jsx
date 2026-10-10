import React from 'react';
import { Link } from 'react-router-dom';

const MissingScene = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface text-center">
            <span className="material-symbols-outlined text-8xl text-outline-variant/50 mb-6 drop-shadow-md">movie_filter</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface mb-4">Scene <span className="italic text-primary font-normal">Cut.</span></h1>
            <p className="font-body text-xl text-on-surface-variant opacity-80 mb-8 max-w-md mx-auto">This particular frame seems to have been lost on the cutting room floor.</p>
            <Link to="/" className="clay-button bg-primary-container text-on-primary-container font-label uppercase text-sm tracking-widest font-bold px-8 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg">
                Back to Premiere
            </Link>
        </main>
    );
};

export default MissingScene;
