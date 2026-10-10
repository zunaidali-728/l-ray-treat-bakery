import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';

const ReviewCard = ({ orderId, onSubmitted }) => {
    const { user, isAuthenticated } = useAuthStore();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        food_quality: 5,
        presentation: 5,
        value_for_money: 5,
        packaging: 5,
        review_text: ''
    });

    const isComplete = formData.food_quality && formData.presentation && formData.value_for_money && formData.packaging;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        setSubmitting(true);

        const overall_rating = ((formData.food_quality + formData.presentation + formData.value_for_money + formData.packaging) / 4).toFixed(1);

        try {
            const { error } = await supabase.from('reviews').insert({
                user_id: user.id,
                order_id: orderId,
                user_name: user?.user_metadata?.full_name || 'Verified Connoisseur',
                food_quality: formData.food_quality,
                presentation: formData.presentation,
                value_for_money: formData.value_for_money,
                packaging: formData.packaging,
                overall_rating: parseFloat(overall_rating),
                review_text: formData.review_text
            });

            if (error) throw error;
            setSubmitted(true);
            if (onSubmitted) onSubmitted();
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        } finally {
            setSubmitting(false);
        }
    };

    const StarRater = ({ label, field }) => (
        <div className="flex justify-between items-center bg-stone-50 p-2 rounded-lg border border-stone-200/50">
            <span className="text-xs font-label uppercase tracking-widest text-[#3B1F0C] font-bold">{label}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <span 
                        key={star} 
                        onClick={() => setFormData(prev => ({ ...prev, [field]: star }))}
                        className={`material-symbols-outlined text-[18px] cursor-pointer transition-transform hover:scale-125 ${star <= formData[field] ? 'text-[#D4A017]' : 'text-stone-300'}`}
                        style={star <= formData[field] ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        star
                    </span>
                ))}
            </div>
        </div>
    );

    if (submitted) {
        return (
            <div className="clay-card p-8 bg-[#FAF3E8] border border-[#D4A017]/30 rounded-xl shadow-lg relative overflow-hidden animate-in fade-in zoom-in-95 text-center">
                <span className="material-symbols-outlined text-4xl text-[#C1440E] mb-3">volunteer_activism</span>
                <h3 className="font-headline text-2xl font-bold text-[#3B1F0C] mb-2">Review Captured</h3>
                <p className="text-sm font-body text-stone-600">Your critique has been archived. Thank you for helping us maintain our cinematic standards.</p>
            </div>
        );
    }

    return (
        <div className="clay-card p-6 md:p-8 bg-white border-t-4 border-[#3B1F0C] rounded-xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-8">
            <div className="absolute top-0 right-8 w-16 h-1 bg-[#C1440E]"></div>
            
            <header className="mb-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF3E8] flex items-center justify-center border border-[#3B1F0C]/10 shrink-0">
                    <span className="material-symbols-outlined text-[#C1440E]">rate_review</span>
                </div>
                <div>
                    <h3 className="font-headline text-2xl font-bold text-[#3B1F0C] tracking-tight">The Director's Cut</h3>
                    <p className="text-[10px] uppercase font-label tracking-widest text-stone-400">Share your culinary experience</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <StarRater label="Food Quality" field="food_quality" />
                    <StarRater label="Presentation" field="presentation" />
                    <StarRater label="Value for Money" field="value_for_money" />
                    <StarRater label="Packaging" field="packaging" />
                </div>

                <div className="relative">
                    <textarea 
                        required
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 focus:border-[#C1440E] focus:ring-0 text-sm font-body text-[#3B1F0C] resize-none h-24"
                        placeholder="The cinematography was perfect. The cardamom knot had excellent character development..."
                        value={formData.review_text}
                        onChange={e => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
                    ></textarea>
                </div>

                <button 
                    disabled={!isComplete || submitting}
                    type="submit" 
                    className="w-full bg-[#3B1F0C] text-[#FAF3E8] py-4 rounded-xl font-label text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#C1440E] transition-all disabled:opacity-50 disabled:hover:bg-[#3B1F0C]">
                    {submitting ? <span className="material-symbols-outlined animate-spin text-[16px]">refresh</span> : 'Publish Critique'}
                    {!submitting && <span className="material-symbols-outlined text-[16px]">send</span>}
                </button>
            </form>
        </div>
    );
};

export default ReviewCard;
