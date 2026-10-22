import React from 'react';
import { motion } from 'framer-motion';
import type { EchoCardData } from '../types/garden';

interface EchoCardProps {
  card: EchoCardData;
  currentIndex: number;
  total: number;
  onNext: () => void;
}

const BotanicalIcon: React.FC<{ type: EchoCardData['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'gratitude':
      return (
        <svg className="w-7 h-7 text-[#FDE68A]/80" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4C16 11 21 16 28 16C21 16 16 21 16 28C16 21 11 16 4 16C11 16 16 11 16 4Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
      );
    case 'impermanence':
      return (
        <svg className="w-7 h-7 text-[#CBD5E1]/80" viewBox="0 0 32 32" fill="none">
          <path
            d="M21.5 6.5C16.5 8 13 13 13 18.5C13 21.5 14.2 24.2 16 26C10.5 25.2 6.5 20.5 6.5 14.8C6.5 9.5 10.8 5 16.5 4.5C18.3 4.3 20 5.1 21.5 6.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M24 19C22.5 20.5 20 21.5 17.5 21"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );
    case 'acceptance':
      return (
        <svg className="w-7 h-7 text-[#F8FAFC]/80" viewBox="0 0 32 32" fill="none">
          <path
            d="M8 25C11 18 16 12 25 7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M14 17C14 12 18 8 25 7C24 14 20 18 14 17Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M10 21C10 17.5 12.5 15 16 14.5"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );
  }
};

export const EchoCard: React.FC<EchoCardProps> = ({
  card,
  currentIndex,
  total,
  onNext,
}) => {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto px-6 py-10 sm:px-10 sm:py-12 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex flex-col items-center text-center"
    >
      {/* Nhãn nghệ thuật tiếng Anh */}
      <div className="flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-[#CBD5E1]/60 font-sans-clean mb-6">
        <span>0{currentIndex + 1}</span>
        <span className="w-4 h-[1px] bg-white/20" />
        <span>{card.label}</span>
      </div>

      {/* Icon Line-Art */}
      <div className="mb-6 p-3 rounded-full bg-white/[0.02] border border-white/[0.06]">
        <BotanicalIcon type={card.iconType} />
      </div>

      {/* Tiêu đề tiếng Việt */}
      <h2 className="font-serif-art text-2xl sm:text-3xl font-normal text-[#F8FAFC] tracking-wide mb-5 leading-snug">
        {card.title}
      </h2>

      {/* Nội dung chiêm nghiệm */}
      <p className="font-sans-clean text-sm sm:text-base text-[#CBD5E1]/90 leading-relaxed font-light mb-10 max-w-md">
        {card.content}
      </p>

      {/* Thanh tiến trình nhỏ & Nút điều hướng */}
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? 'w-6 bg-[#FDE68A]/80'
                  : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-7 py-2.5 rounded-full text-sm font-sans-clean font-normal text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#FDE68A]/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/40"
        >
          <span>Tiếp tục</span>
          <span className="text-[#FDE68A]/80 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
};