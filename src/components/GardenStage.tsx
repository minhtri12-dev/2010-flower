import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GardenStage as StageEnum, type BloomPhase, type EchoCardData } from '../types/garden';
import { EchoCard } from './EchoCard';
import { WhiteLilySvg } from './WhiteLilySvg';

interface GardenStageProps {
  stage: StageEnum;
  onStageChange: (nextStage: StageEnum) => void;
}

const ECHO_CARDS: EchoCardData[] = [
  {
    id: 'gratitude',
    label: 'GRATITUDE',
    title: 'Những ngày tháng đã qua',
    content:
      'Cảm ơn vì đã có những ngày tháng mà cả hai từng chân thành dành cho nhau. Những cuộc trò chuyện, những buổi đi chơi và những khoảnh khắc giản dị ấy vẫn là một phần đáng quý của quãng đường đã qua.',
    iconType: 'gratitude',
  },
  {
    id: 'impermanence',
    label: 'IMPERMANENCE',
    title: 'Không phải điều đẹp đẽ nào cũng ở lại',
    content:
      'Có những điều không đi đến cuối cùng, nhưng vẫn xứng đáng được trân trọng. Đôi khi, chỉ cần biết rằng một khoảng thời gian đã từng khiến mình vui và từng khiến mình chân thành, như thế cũng đủ để nhớ về nó bằng một nụ cười.',
    iconType: 'impermanence',
  },
  {
    id: 'acceptance',
    label: 'ACCEPTANCE',
    title: 'Để mọi điều được bình yên',
    content:
      'Không phải cứ còn quý mến là phải tiếp tục đi cùng nhau. Có những lựa chọn cần được tôn trọng, có những con đường cần được để người kia tự bước tiếp. Và có những kỷ niệm, chỉ cần giữ chúng ở một nơi bình yên trong lòng.',
    iconType: 'acceptance',
  },
];

export const GardenStage: React.FC<GardenStageProps> = ({
  stage,
  onStageChange,
}) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isTransitioningToBloom, setIsTransitioningToBloom] = useState(false);
  const [bloomPhase, setBloomPhase] = useState<BloomPhase>('BUD');
  const [showPrimaryMessage, setShowPrimaryMessage] = useState(false);
  const [showFinalWish, setShowFinalWish] = useState(false);

  useEffect(() => {
    if (stage !== StageEnum.THE_BLOOM) return;

    setBloomPhase('BUD');
    setShowPrimaryMessage(false);
    setShowFinalWish(false);

    const t1 = setTimeout(() => setBloomPhase('FIRST_LIGHT'), 1200);
    const t2 = setTimeout(() => setBloomPhase('BLOOM'), 2900);
    const t3 = setTimeout(() => setBloomPhase('QUIET_GLOW'), 4800);
    const t4 = setTimeout(() => setShowPrimaryMessage(true), 5600);
    const t5 = setTimeout(() => setShowFinalWish(true), 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [stage]);

  const handleNextCard = () => {
    if (cardIndex < ECHO_CARDS.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else {
      setIsTransitioningToBloom(true);
      setTimeout(() => {
        setIsTransitioningToBloom(false);
        onStageChange(StageEnum.THE_BLOOM);
      }, 1400);
    }
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-8">
      <AnimatePresence mode="wait">
        {stage === StageEnum.THRESHOLD && (
          <motion.section
            key="stage-threshold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="max-w-xl w-full flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="mb-2"
            >
              <WhiteLilySvg phase="BUD" size="small" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 0.75, letterSpacing: '0.32em' }}
              transition={{ duration: 1.4, delay: 1.0 }}
              className="text-xs sm:text-sm uppercase text-[#FDE68A] font-sans-clean mb-5"
            >
              THE QUIET GARDEN OF GRATITUDE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 1.6 }}
              className="font-serif-art italic text-2xl sm:text-4xl text-[#F8FAFC] font-normal leading-relaxed mb-10 px-2"
            >
              “Có những đoạn đường không đi đến cuối, nhưng vẫn xứng đáng được nhớ bằng sự dịu dàng.”
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.4 }}
            >
              <button
                onClick={() => onStageChange(StageEnum.ECHOES)}
                className="px-8 py-3 rounded-full font-sans-clean text-sm tracking-wider text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 hover:border-[#FDE68A]/50 shadow-[0_0_30px_rgba(253,230,138,0.08)] hover:shadow-[0_0_35px_rgba(253,230,138,0.2)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/40"
              >
                Bước vào khu vườn
              </button>
            </motion.div>
          </motion.section>
        )}

        {stage === StageEnum.ECHOES && (
          <motion.section
            key="stage-echoes"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioningToBloom ? 0 : 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="mb-6 text-center">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#CBD5E1]/50 font-sans-clean">
                THE ECHOES
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!isTransitioningToBloom && (
                <EchoCard
                  key={ECHO_CARDS[cardIndex].id}
                  card={ECHO_CARDS[cardIndex]}
                  currentIndex={cardIndex}
                  total={ECHO_CARDS.length}
                  onNext={handleNextCard}
                />
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {stage === StageEnum.THE_BLOOM && (
          <motion.section
            key="stage-the-bloom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="max-w-2xl w-full flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="text-[11px] tracking-[0.35em] uppercase text-[#FDE68A] font-sans-clean mb-2"
            >
              THE 20TH BLOOM
            </motion.span>

            <div className="my-1">
              <WhiteLilySvg phase={bloomPhase} size="large" />
            </div>

            <div className="min-h-[150px] flex flex-col items-center justify-start px-3 mt-2">
              <AnimatePresence>
                {showPrimaryMessage && (
                  <motion.p
                    key="primary-msg"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="font-serif-art text-2xl sm:text-3xl text-[#F8FAFC] font-normal leading-relaxed mb-5"
                  >
                    “Trân trọng những gì đã có, và bình yên với những gì không thể tiếp tục.”
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showFinalWish && (
                  <motion.div
                    key="final-wish"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className="flex flex-col items-center space-y-6"
                  >
                    <p className="font-sans-clean text-sm sm:text-base text-[#CBD5E1]/85 font-light max-w-md leading-relaxed">
                      Có những điều từ nay sẽ chỉ còn là kỷ niệm, nhưng mình vẫn mong những năm tháng phía trước sẽ dịu dàng với bạn.
                    </p>

                    <span className="font-serif-art italic text-base sm:text-lg text-[#FDE68A]/80 tracking-wide pt-2">
                      May life be gentle with you.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};