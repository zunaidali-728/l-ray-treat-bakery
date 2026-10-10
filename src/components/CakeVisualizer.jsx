import React from 'react';

const CakeVisualizer = ({ shape, tiers, frostingColor, decorations, message }) => {
  // SVG representation of a configurable cake
  const layerHeight = 60;
  const baseWidth = 200;

  const renderTier = (tierIndex, width, yPos) => {
    // Generate different SVG paths based on shape
    const rx = shape === 'Square' ? 5 : shape === 'Heart' ? width / 2 : width / 2;
    const ry = shape === 'Square' ? 5 : shape === 'Heart' ? 30 : 20;

    let path = '';
    if (shape === 'Heart') {
        const topY = yPos - layerHeight;
        // Simple heart abstraction for SVG
        path = `M ${width/2 + (100 - width/2)} ${topY + 20} 
                C ${width/2 + (100 - width/2)} ${topY - 10}, ${100 - width} ${topY - 10}, 100 ${topY + 30}
                C ${100 + width} ${topY - 10}, ${width/2 + (100 + width/2)} ${topY - 10}, ${width/2 + (100 + width/2)} ${topY + 20}
                Z`;
    } else if (shape === 'Square') {
        path = `M ${100 - width/2} ${yPos - layerHeight} L ${100 + width/2} ${yPos - layerHeight} L ${100 + width/2} ${yPos} L ${100 - width/2} ${yPos} Z`;
    } else {
        // Round
        path = `
            M ${100 - width/2} ${yPos - layerHeight}
            a ${width/2} ${ry} 0 1 0 ${width} 0
            l 0 ${layerHeight}
            a ${width/2} ${ry} 0 1 1 -${width} 0
            Z
        `;
    }

    const topPath = shape === 'Round' ? `
        M ${100 - width/2} ${yPos - layerHeight}
        a ${width/2} ${ry} 0 1 0 ${width} 0
        a ${width/2} ${ry} 0 1 0 -${width} 0
        Z
    ` : '';

    return (
      <g key={tierIndex} className="transition-all duration-700 ease-in-out">
        <path d={shape !== 'Heart' && shape !== 'Square' ? path : path} fill={frostingColor} className="drop-shadow-lg transition-colors duration-500" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        {topPath && <path d={topPath} fill={frostingColor} opacity="0.8" className="transition-colors duration-500" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />}
        
        {/* Drip Effect Decoration */}
        {decorations?.includes('Drip Effect') && shape === 'Round' && (
             <path d={`M ${100 - width/2 + 10} ${yPos - layerHeight + 10} Q ${100 - width/2 + 15} ${yPos - layerHeight + 30} ${100 - width/2 + 20} ${yPos - layerHeight + 10} Q ${100 - width/2 + 30} ${yPos - layerHeight + 40} ${100 - width/2 + 40} ${yPos - layerHeight + 10}`} fill="rgba(80,40,20,0.6)" className="transition-all duration-500"/>
        )}

        {/* Floral Decoration */}
        {decorations?.includes('Fresh Flowers') && tierIndex === tiers - 1 && (
             <circle cx={100 + width/2 - 20} cy={yPos - layerHeight} r={12} fill="#e18a99" stroke="#fff" strokeWidth="2" className="animate-pulse" />
        )}
        {decorations?.includes('Fresh Flowers') && tierIndex === 0 && (
             <circle cx={100 - width/2 + 10} cy={yPos - layerHeight + 15} r={15} fill="#f4d1d6" stroke="#fff" strokeWidth="2" />
        )}
        
        {/* Macarons */}
        {decorations?.includes('Macarons') && tierIndex === 0 && (
             <ellipse cx="100" cy={yPos - layerHeight - 5} rx="15" ry="8" fill="#d1e8e2" stroke="#fff" strokeWidth="1" transform="rotate(-15 100 80)" />
        )}

        {/* Message */}
        {message && tierIndex === 0 && shape === 'Round' && (
             <text x="100" y={yPos - layerHeight/2 + 5} textAnchor="middle" fill="#3B1F0C" fontSize="12" fontFamily="'Playfair Display', serif" fontStyle="italic" className="drop-shadow-sm font-bold">
                 {message.substring(0, 20)}{message.length > 20 ? '...' : ''}
             </text>
        )}
      </g>
    );
  };

  const drawTiers = () => {
    let elements = [];
    const maxTiers = shape === 'Tier' ? tiers : 1;
    let currentY = 220; // Bottom anchor

    for (let i = 0; i < maxTiers; i++) {
        const currentWidth = baseWidth - (i * 40);
        elements.unshift(renderTier(i, currentWidth, currentY));
        currentY -= layerHeight;
    }

    return elements;
  };

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-stone-50 to-[#FAF3E8] rounded-3xl border border-outline-variant/30 shadow-inner">
      {/* Background cinematic aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C1440E]/10 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Cinematic Reel Topper */}
      {decorations?.includes('Cinema Reel Topper') && (
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-[#3B1F0C] rounded-full flex items-center justify-center opacity-80 z-20 animate-spin-slow">
              <div className="w-full h-1 bg-[#3B1F0C] absolute"></div>
              <div className="w-1 h-full bg-[#3B1F0C] absolute"></div>
          </div>
      )}

      {/* SVG Canvas */}
      <svg viewBox="0 0 200 250" className="w-[80%] max-w-md animate-[float_6s_ease-in-out_infinite] z-10 drop-shadow-2xl">
        {/* Cake Stand */}
        <ellipse cx="100" cy="225" rx="110" ry="15" fill="#e5e5e5" stroke="#d4d4d4" strokeWidth="2" />
        <rect x="90" y="225" width="20" height="20" fill="#d4d4d4" />
        <ellipse cx="100" cy="245" rx="50" ry="5" fill="#e5e5e5" />
        
        {drawTiers()}
      </svg>
      
      <style>{`
        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-15px) scale(1.02); }
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CakeVisualizer;
