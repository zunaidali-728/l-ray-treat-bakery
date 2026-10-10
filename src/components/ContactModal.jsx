import React, { useState, useEffect, useRef } from 'react';

/**
 * Real Email Pipeline via Web3Forms (Free, No Backend Required)
 */
const simulateEmailProvider = async (payload) => {
    // Active Web3Forms API Key
    const ACCESS_KEY = "07d858e5-bcef-4b86-9134-fc44f70b4e4c";



    // Real API Transmission Setup
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: ACCESS_KEY,
            subject: "New Inquiry from L'RAY Treat",
            from_name: payload.name || "Customer",
            email: payload.email, // Customer's email
            phone: payload.phone || "Not Provided",
            message: payload.message,
        }),
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Failed to deliver email.");
    }

    return result;
};

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});

    // idle -> loading -> success
    const [status, setStatus] = useState('idle');

    const modalRef = useRef(null);

    // Global listener toggle
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setIsClosing(false);
            setStatus('idle');
            setErrors({});
            setFormData({ name: '', email: '', phone: '', message: '' });
        };
        window.addEventListener('open-contact', handleOpen);
        return () => window.removeEventListener('open-contact', handleOpen);
    }, []);

    // Accessibility Focus constraints + Background Locking
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && status !== 'loading') handleClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                const firstInput = modalRef.current?.querySelector('input');
                if (firstInput && status === 'idle') firstInput.focus();
            }, 100);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, status]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 400);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "A valid email format is required";
        }
        
        // Exact 10 digit constraint
        if (formData.phone && formData.phone.length !== 10) {
            newErrors.phone = "Mobile number must be exactly 10 digits";
        }
        
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate() || status !== 'idle') return;

        setStatus('loading');

        try {
            await simulateEmailProvider(formData);
            setStatus('success');

            // Auto dissolve after cinematic view expires (Extended to 4s for readability)
            setTimeout(() => {
                handleClose();
            }, 4000); 

        } catch (error) {
            console.error("Transmission Error:", error);
            setStatus('idle');
            setErrors({ submit: "Failed to send message. Please try again." });
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Cinematic Backdrop & Success Vignette Overlay */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-700 ease-out 
                    ${isClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100'} 
                    ${status === 'success' ? 'bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.4)_0%,_rgba(42,23,15,0.85)_100%)]' : ''}
                `}
                onClick={status !== 'loading' ? handleClose : undefined}
                aria-hidden="true"
            />

            {/* Modal Dialog Container */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Connect With Us Form"
                className={`w-full max-w-lg bg-[#fff8f6] dark:bg-[#1f1a18] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-outline-variant/10 relative z-10 flex flex-col md:h-auto min-h-[400px] md:min-h-[500px] h-full overflow-hidden ${isClosing ? 'cinematic-exit' : 'cinematic-enter'}`}
            >
                {status !== 'success' && (
                    <button
                        onClick={handleClose}
                        disabled={status === 'loading'}
                        aria-label="Close Contact Form"
                        className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors cursor-pointer cinematic-hover bg-transparent border-0 z-20"
                    >
                        <span className="material-symbols-outlined text-2xl drop-shadow-sm">close</span>
                    </button>
                )}

                {/* Form Wrapper with Fade Out translation */}
                <div className={`p-8 w-full max-h-[90vh] overflow-y-auto custom-scrollbar transition-all duration-500 ${status === 'success' ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100 relative'}`}>
                    <h2 className="font-headline text-3xl font-bold mb-2 text-on-surface">Connect With Us</h2>
                    <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">Ensure a grand entrance for your next cinematic event. Drop us a script.</p>

                    {errors.submit && <div className="p-3 mb-4 rounded-lg bg-red-100 text-red-800 text-sm font-bold border border-red-200">{errors.submit}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="space-y-1">
                            <label htmlFor="contact-name" className="font-label text-[10px] uppercase tracking-widest text-secondary">Name *</label>
                            <input
                                id="contact-name"
                                type="text"
                                disabled={status !== 'idle'}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full bg-white/50 dark:bg-black/20 border ${errors.name ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8922a] text-sm transition-all focus:bg-white text-on-surface disabled:opacity-50`}
                                placeholder="Satyajit Ray"
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && <p className="text-error text-xs font-medium animate-in fade-in">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label htmlFor="contact-email" className="font-label text-[10px] uppercase tracking-widest text-secondary">Email *</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    disabled={status !== 'idle'}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full bg-white/50 dark:bg-black/20 border ${errors.email ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8922a] text-sm transition-all focus:bg-white text-on-surface disabled:opacity-50`}
                                    placeholder="director@studio.com"
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <p className="text-error text-xs font-medium animate-in fade-in">{errors.email}</p>}
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="contact-phone" className="font-label text-[10px] uppercase tracking-widest text-secondary">Phone (Optional)</label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    maxLength="10"
                                    disabled={status !== 'idle'}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const cleanVal = e.target.value.replace(/\D/g, ''); // Explicitly isolate numbers
                                        if (cleanVal.length <= 10) {
                                            setFormData({ ...formData, phone: cleanVal });
                                            // Actively clear error state when strictly valid
                                            if (errors.phone && cleanVal.length === 10) {
                                                setErrors({ ...errors, phone: null });
                                            }
                                        }
                                    }}
                                    className={`w-full bg-white/50 dark:bg-black/20 border ${errors.phone ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8922a] text-sm transition-all focus:bg-white text-on-surface disabled:opacity-50`}
                                    placeholder="9830000000"
                                />
                                {errors.phone && <p className="text-error text-xs font-medium animate-in fade-in mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="contact-message" className="font-label text-[10px] uppercase tracking-widest text-secondary">Message *</label>
                            <textarea
                                id="contact-message"
                                disabled={status !== 'idle'}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className={`w-full bg-white/50 dark:bg-black/20 border ${errors.message ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8922a] text-sm transition-all resize-none focus:bg-white text-on-surface disabled:opacity-50`}
                                placeholder="Your inquiry details..."
                                aria-invalid={!!errors.message}
                            />
                            {errors.message && <p className="text-error text-xs font-medium animate-in fade-in">{errors.message}</p>}
                        </div>

                        <div className="pt-4 pb-2">
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                aria-label="Submit Contact Document"
                                className={`w-full relative h-[56px] rounded-full font-headline font-bold text-lg text-white transition-all duration-300 ease-out overflow-hidden border-none ${status === 'loading'
                                        ? 'bg-[#c8922a] brightness-125 shadow-[0_0_20px_rgba(200,146,42,0.4)] cursor-wait'
                                        : 'clay-button hover:brightness-110 cinematic-hover shadow-[0_10px_20px_rgba(126,87,0,0.2)]'
                                    }`}
                            >
                                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${status === 'idle' ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                                    Send Message
                                </span>
                                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${status === 'loading' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <span className="material-symbols-outlined animate-spin text-[26px] opacity-90 drop-shadow-sm">progress_activity</span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Localized Cinematic Success View Mapping */}
                <div
                    aria-live="polite"
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 delay-100 
                        ${status === 'success' ? 'opacity-100 z-10 scale-100' : 'opacity-0 -z-10 scale-95'}`
                    }
                >
                    <div className={`w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-transform duration-700 delay-300 ${status === 'success' ? 'scale-100' : 'scale-0'}`}>
                        <span className="material-symbols-outlined text-white text-[42px]" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-3 tracking-tight">Message Received.</h3>
                    <p className="font-body text-on-surface-variant max-w-sm text-lg">We'll reach out to you very soon.</p>
                    <p className="font-body text-stone-500 mt-2 italic text-sm">Until then, keep exploring our cinematic treats.</p>
                </div>
            </div>
        </div>
    );
}
