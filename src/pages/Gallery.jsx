import React from 'react';
import SmartImage from '../components/SmartImage';

const Gallery = () => {
    return (
        <main className="relative bg-surface">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-3xl">
                        <span className="font-label text-secondary tracking-[0.3em] uppercase text-xs mb-4 block font-bold">Artisan Stills & Frames</span>
                        <h1 className="font-headline text-6xl md:text-8xl text-on-surface -tracking-[0.03em] leading-none mb-6 font-bold">
                            Cinematic <br/><span className="italic font-normal">Soul</span>
                        </h1>
                        <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                            A visual journey through our craft, from the amber glow of the clay ovens to the quiet, noir-inspired corners of our café.
                        </p>
                    </div>
                    {/* Filter Cluster */}
                    <div className="flex flex-wrap gap-4 font-label text-sm uppercase tracking-widest pb-4">
                        <button className="clay-button px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-bold shadow-md">All</button>
                        <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors font-bold shadow-sm">The Space</button>
                        <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors font-bold shadow-sm">The Hearth</button>
                        <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors font-bold shadow-sm">The Selection</button>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {/* Item 1: Interior */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Café interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoMAcNMgMb1jPuDuOrFhLYkpasvsqY88MbodBLt43Ui462YhRIefMw2rrpN7wIX0GsYJ94eEOOSpIwIl5W42lynEtmJjeboEKbN0-mqGKnQH-JL4jKEMst8ys5y7UkwduXE5UrKzbiBLm3YSSgEdvb2Uy_aUsUXm_vql_LWPVzeSwyWw8AeOMn8dsK0F9h3M5ER_Tf_hyHKpstwXiIi23ZC7mBA1xbglpA1j6WRUQOd7-qSevPFXlmlhyQ3NusjUSnz6Gqj6TjOVk4"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                    {/* Item 2: Food */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Artisan bread" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoFL0ITLRx8H3j8W-ndwNIWtmtg-nTfxELo5-KxBEkHaboF71gwT4zeRVZjSnbupnM5BMueco655pchwZug42uSWR2OjJl7hyX5JKCnXipAKAUrKSo39KTHELukjoeGdDQdE7hYRTDSnV9yszkNv9v40oXzGrAsZLc_ZdoHwhhPSOvvvHLI2XYHMB53N2Jcts_OoMhMobMuCsM-l7amBPnmVOGVB-WHKxOmUNvUTFlgeJFFOU3sG44iJFCrrreWlDUQQKjy1QT2stZ"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                    {/* Item 3: Baking */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Baking process" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfhnmnsIiZZJPxE1YAJE3ZLYnto1BgWIPFW-A_mthAxAeqF_PJYoplgIIkHsIVne7UEBil-5WTg33_KPTaXfk2iLd20P-heon66ssU71ifBe9OH269pxb-Ex-0JwmoJCisnS-2tNy9BBO0831O9yZAofluAnA8PvsYYPOA97imPU3Y3OcSqO-8tS5j4h-ivTnaifZv_dZSTWs-PSBxxbGoq0MtBMqRES4U9tPUxwgnVSOlqX6Aqukinld00lui-FPxNqsyaLcbcoeC"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                    {/* Item 4: Detail */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Coffee detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuis5ES6K59o1BgMv13SMIumRHlKyWZ8UqLWrPG8BWbeO8Bh3kYcmDu1pz6Ef0Tif3b_-Fq6asUnWTamCx2-hw1IYMa0KwSUwj_X8SFnWPq8tkeojgqOHdhMsNG7eX3ISG5aKCSnjDaG0GOP9heYLMebetKOrI-njpCTMQjAhukDHzYVGXV3pks5k_2JDz8NpBiCcJVORaPiGFKrbFLv-fsask3rSF3BkcvSYATFSJABd4cyQgN8FvTGpTu3fbPziZ2otRfpYVdTnL"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                    {/* Item 5: Cake */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Custom cake" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Pn2bZnywhjrbAB1T1046TvIjoU7ajAPiklu4BtWGUyfT2WKP1-2Ec-vzpfBcd7VabODmKr942rW6e_RjffvVf8sfsLX7TBXEmGygSRCoaCBHP_0Qf_1RCUECOKM2U7qwcikxAeZBu5Oc5OTxzMdnc0oxZs8NcunZPhW4JvdG2m65UotaZh4AdhVVMdaB_aFHkfgSeBjJ1g_IozEPhxL6mY8sDEnS70HaiSoeEmLCmXPsmW27iYSgSR4bG75IcPqaia6x5u47z1d5"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                    {/* Item 6: Space */}
                    <div className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <SmartImage className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Seating area" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQGbyBIURh_KpV1Ql6bW9FW9UWBFXrW69O1jDOTVcarEjpuHIGEXCvTyOxsHAHlQiuaQjupHlyEr3Oan7Tsb6tBAyu07z8g35tz80gjpiKX4bySzG9LFjiVPcGD1cIsnMNLCN5yUESN6zDdg7RqqQO4a_6fHSzr-biFNCGsUoVc2iyx03vH6tQD9sXgVBQ89-kSpy7QN7eitaUlcl3bc0mXujF0ij-WWbJDzvNyrNVZVWW22TL7ncEAEfbmQ1S52Z4mXkffT-Bl1_I"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instagram Banner */}
            <section className="my-24 px-8 max-w-7xl mx-auto">
                <div className="bg-surface-container-low rounded-[2rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-inner border border-outline-variant/20">
                    <div className="absolute -right-20 -top-20 opacity-5">
                        <span className="material-symbols-outlined text-[300px]">camera</span>
                    </div>
                    <div className="relative z-10 text-center md:text-left">
                        <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-4 font-bold">Follow our Story</h2>
                        <p className="text-on-surface-variant font-body text-lg mb-8 max-w-md font-medium">Get a glimpse behind the curtain. Our daily dough, cinematic inspirations, and neighborhood moments.</p>
                        <button className="clay-button bg-secondary text-on-secondary px-10 py-4 rounded-full font-label font-bold uppercase tracking-[0.2em] flex items-center gap-3 mx-auto md:mx-0 shadow-lg hover:brightness-110 active:scale-95 transition-all">
                            <span className="material-symbols-outlined">photo_camera</span>
                            @lraytreat_stills
                        </button>
                    </div>
                    <div className="mt-12 md:mt-0 flex -space-x-8 relative z-10 hover:space-x-2 transition-all duration-500">
                        <div className="w-28 h-28 rounded-full border-4 border-surface overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <SmartImage className="w-full h-full object-cover" alt="Instagram 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvgK8H9kcHhWLnDwgyti4MezGSRXtPAsYzkLLjK4gtFZ5KF2dcmJtK9IA-jQQJkYm8HstpBAxsG9vNezrpWoKAxPJ-RueNZgavRXD9VPz15bwS8cH-onmTAnW9KFgqkwEo7lOtCaNif9bkWapIh9Z3hKqBHTvxMR1W2sGfQwBx55MzmWH8lr6YOuZJMzJ12HuzyzJ5SbSZRi_FfJk2MxW_6rS4cBYvoIXpvMF1G20Zf1iatbpNeZEjt4Y4RSIFgcj9LiPzabqRaurm"/>
                        </div>
                        <div className="w-28 h-28 rounded-full border-4 border-surface overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <SmartImage className="w-full h-full object-cover" alt="Instagram 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsGcYpuw2oMDgTr_53CrWA-yjl6B2I6J_GhtzroFaMqPjKVTD7LTcU_4qpxUPj_IiWXyRpCK_uvbauE0qgI8Nb_lCSKMctNynIyIXwFw-8c8e2vuYLaqZylZ1MmTrEjWvjwULsXrkSMMtMXbhZ161hB-pFnVsVdllXIlXQxFSehNMTPgfs6syZfVc6JSQDIsCPO2J6wbk8Xx-BY2lalY172yJlVLvcmhlu9dRbDucuqQSFZg-_lOJCR2vLwXpuyKM6ck9mz6yZrckB"/>
                        </div>
                        <div className="w-28 h-28 rounded-full border-4 border-surface overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <SmartImage className="w-full h-full object-cover" alt="Instagram 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Yd2mpI3MN0b4zBkVoQQK5mGlinDrFbQ8GSeZ78LahjAMF5ckDkShyuujW7ljQkY1nvJle0RfzuPtyv7h1CfECKJV0tpBXbDdmIpvQ25MQa32aU6mg4z4iO7hmIIsyu-3x_BtKTCDcxzcyRY6VpPa_2tX8OXlatO6e7EjU7m7wU_YqD5bLEFQJNXpckhwVerMWuGEyFDM4hKQOycl7M5PIuE4LXXPtzVte9vEAhrXOZWFcbsQwchTvYVU9ByUdihIHuJfDP7cxZJN"/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Gallery;
