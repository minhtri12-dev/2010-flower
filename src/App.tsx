import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StageType = 'THRESHOLD' | 'ECHOES' | 'THE_BLOOM';
type BloomPhase = 'BUD' | 'FIRST_LIGHT' | 'BLOOM' | 'QUIET_GLOW';

interface EchoCardData {
  id: string;
  label: string;
  title: string;
  content: string;
}

const ECHO_CARDS: EchoCardData[] = [
  {
    id: 'gratitude',
    title: 'Gặp gỡ',
    content:
      'Quen biết Ly thông qua em Đông, vô tình 2 anh em trò chuyện vui vẻ trên Facebook thì có nhắc đến Ly, em Đông cứ kêu " anh thử làm quen xem, chị Ly hiền lắm. Lâu rồi chưa có ai kề cạnh chị ấy "  và vẫn nhớ như in cái ngày 26 tháng 5, ngày mà cả 2 bắt đầu trò chuyện và tìm hiểu. Từ kết bạn Facebook, Instagram, Locket thì đều được Ly chấp nhận rất nhanh. Sau đó 2 mình cũng trò chuyện và cũng chia sẻ những câu chuyện thường ngày cho nhau nghe. Khoảng thời gian đó thì Trí cũng rất muốn đi chơi với Ly nhưng do kẹt học Toeic nên Ly bảo là khi nào Trí học xong thì chúng ta gặp, cảm ơn Ly vì đã đợi Trí trong khoảng thời gian đó. Khoảnh khắc lần đầu gặp Ly thì Trí đã rung động rồi, tuy hơi nhỏ con nhưng Ly rất xinh và dịu dàng. Đó là lần đầu Trí có cảm giác rung động từ 1 người ngay lúc mới gặp. Cảm ơn Ly rất nhiều vì đã cho Trí biết được cảm giác như thế nó đẹp đẽ nhường nào.',
  },
  {
    id: 'admiration',
    title: 'Điều Trí nói với mọi người về Ly',
    content:
      'Trước mặt mọi người, Trí chưa từng giấu việc mình đang làm quen với Ly — một cô gái xinh đẹp và dịu dàng nhất mà Trí biết. Từ những người bạn đại học, những người bạn ở quê, cho đến những người bạn đá bóng và cả mẹ nữa, Trí chả giấu ai cả. Mẹ Trí và mẹ Ly thì cũng biết nhau, nên là khi Trí nhắc đến Ly thì mẹ cũng thích lắm vì nhà Ly thường hay đi chùa và Ly cũng vậy, như cách mẹ Trí thường làm để cầu nguyện cho gia đình. Trong lòng Trí, ước mong được sớm làm bạn trai của Ly, được khoe với tất cả mọi người, được chăm sóc và đi cạnh Ly chưa từng là một bí mật hay điều gì phải giấu giếm cả.',
  },
   {
    id: 'gift',
    title: 'Những món quà của cả 2',
    content:
      'Cảm ơn Ly đã tặng cho Trí một áo sơ mi rất đẹp và một khung hình với tấm ảnh mà Trí rất thích của Messi. Trí biết những món quà này không phải lựa nhanh cho xong, đó là sự tìm hiểu và tỉ mỉ cả và Trí rất biết ơn về điều đó. Hộp nến thơm Ly tặng cho Trí, đến giờ Trí vẫn chưa dám dùng, Trí gói lại và đặt trên bàn để mùi hương không bay đi. Dù gì, thì Trí sẽ không dùng món quà này tại vì những kỉ niệm mà Ly tặng Trí luôn giữ bên mình, không bao giờ để nó mất hay trầy xước đâu. Cảm ơn Ly đã mua bánh cho Trí lúc Trí ở quê nha, những món quà và sự chăm chút nhỏ của Ly Trí đều không quen đâu hehe. Mấy món quà Trí tặng Ly, Trí đều tìm hiểu rất kĩ đó nha, cái áo màu hồng đó phù hợp với Ly lắm, không cần phải lộng lẫy nhưng vẫn toát ra vibe công chúa ˆˆ, cả vòng tay mà Trí tặng cho Ly nữa, dù chúng ta không còn liên lạc nhưng Ly nhớ hãy mang những thứ ấy thường xuyên nhá, vì Trí đã lựa sẽ rất hợp với Ly lắm đó. ',
  },
  {
    id: 'acceptance',
    title: 'Chúc mọi thứ tốt đẹp đến với Ly',
    content:
      'Nhưng tình yêu mà, nó phải đến từ 2 phía chứ, đúng không? Thời gian vừa qua, Trí đã cố gắng làm những gì có thể để ghi điểm trong mắt Ly. Ly không nói hôm nay đi làm mệt nhưng Trí luôn biết cảm giác khối lượng công việc mà Ly làm hằng ngày. Thế nên Trí đã ngỏ ý để đặt trà sữa hoặc thức uống khác cho Ly, để Ly có năng lượng hơn trong lúc làm việc. Món quà tuy nhỏ nhưng có thể giúp ít cho Ly để Ly làm việc hiệu quả hơn. Trí rất muốn hỏi thăm và chăm sóc Ly tận tình hơn, nhưng không biết Ly có nhìn lại mỗi khi Ly nhắn tin cọc không? Trí nhận được những câu đó thì có cảm giác đượm buồn lắm và Trí cũng biết là tính cách của Ly đó giờ vậy, hơi " nhạt " nhưng ở ngoài thì nói chuyện khá vui và dễ gần, vì vậy Trí cũng hiểu. Nhưng sau cái ngày 3/9 ấy, mọi thứ có lẽ vẫn không thay đổi, bản thân Trí cũng đã biết sẽ có ngày hôm nay. Lần này có thể Trí ít buồn hơn, nhưng những kỉ niệm thì sẽ còn rất lâu để quên được đó, Ly biết không? Lần này chắc sẽ không còn cơ hội để quay lại nữa rồi, vì cảm xúc của Ly có lẽ cũng đã đến giới hạn. Cảm ơn Ly đã chịu nói ra những lời thật lòng này, để Trí không còn phải mong đợi, hi vọng rồi lại thất vọng. Chúc cho Ly sau này tìm được một người thật sự tốt, quan tâm Ly, thương Ly, yêu chiều Ly hơn cách mà Trí từng làm.',
  },
];

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start(): void {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      const freqs = [87.31, 130.81, 164.81, 220.0];
      freqs.forEach((f, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f + i * 0.1, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);

        g.gain.setValueAtTime(0.2 / freqs.length, this.ctx.currentTime);
        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);
        osc.start();
        this.oscillators.push(osc);
      });
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    setTimeout(() => this.cleanup(), 1100);
    this.isPlaying = false;
  }

  public cleanup(): void {
    this.oscillators.forEach((o) => {
      try { o.stop(); o.disconnect(); } catch {}
    });
    this.oscillators = [];
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
    }
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
  }
}

const ambientAudio = new AmbientSoundEngine();

const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = w < 768 ? 100 : 100;
    const colors = ['#FDE68A', '#FEE2E2', '#CBD5E1'];
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.2 - 0.04,
      alpha: Math.random() * 0.45 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.003,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      const bgGrad = ctx.createRadialGradient(w / 2, h * 0.4, 20, w / 2, h / 2, Math.max(w, h) * 0.8);
    bgGrad.addColorStop(0, '#16142a');    // Ánh tím than huyền bí ngay quanh bông hoa
    bgGrad.addColorStop(0.5, '#0d0d18');  // Chuyển dần sang xanh đen
    bgGrad.addColorStop(1, '#05050a');    // Đen thẳm ở 4 góc ngoài
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
      particles.forEach((p) => {
        p.phase += p.speed;
        p.x += p.vx + Math.sin(p.phase) * 0.1;
        p.y += p.vy;

        if (p.y < -20) p.y = h + 20;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        const curAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = curAlpha;
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

const SoftRoseLilySvg: React.FC<{ phase: BloomPhase; size?: 'small' | 'large' }> = ({
  phase,
  size = 'large',
}) => {
  const isBud = phase === 'BUD';
  const isFirstLight = phase === 'FIRST_LIGHT';
  const isBloom = phase === 'BLOOM' || phase === 'QUIET_GLOW';
  const isGlow = phase === 'QUIET_GLOW';

  const outerAngles = [-38, 0, 38];
  const innerAngles = [-68, -18, 18, 68];
  const goldenMotes = [
    { dx: -40, dy: -55, delay: 0.1 },
    { dx: 45, dy: -50, delay: 0.25 },
    { dx: -60, dy: -20, delay: 0.4 },
    { dx: 58, dy: -18, delay: 0.15 },
    { dx: -20, dy: -75, delay: 0.35 },
    { dx: 25, dy: -70, delay: 0.5 },
  ];

  const dimension = size === 'small' ? { w: '140px', h: '190px' } : { w: '260px', h: '330px' };

  return (
    <motion.div
      animate={{ rotate: [0, 0.6, 0, -0.6, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        transformOrigin: 'bottom center',
        width: dimension.w,
        height: dimension.h,
        margin: '0 auto',
      }}
    >
      <svg viewBox="0 0 300 380" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="roseLilyOuter" x1="150" y1="70" x2="150" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="60%" stopColor="#FECDD3" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>
          <linearGradient id="roseLilyInner" x1="150" y1="60" x2="150" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FECDD3" />
          </linearGradient>
          <linearGradient id="botanicalStem" x1="150" y1="200" x2="150" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A6B5B" />
            <stop offset="50%" stopColor="#33483D" />
            <stop offset="100%" stopColor="#17231D" />
          </linearGradient>
          <radialGradient id="moonlightHalo" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#FECDD3" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="150"
          cy="155"
          r={isGlow ? 115 : isBloom ? 95 : 65}
          fill="url(#moonlightHalo)"
          animate={{ opacity: isGlow ? 0.85 : isBloom ? 0.6 : 0.25 }}
          transition={{ duration: 2 }}
        />

        <path d="M150 205 C149 255, 152 310, 148 368" stroke="url(#botanicalStem)" strokeWidth="3" strokeLinecap="round" />
        <path d="M149 310 C120 295, 88 265, 76 232 C98 250, 128 275, 149 294 Z" fill="url(#botanicalStem)" />
        <path d="M151 285 C180 268, 212 240, 224 205 C202 225, 174 252, 151 270 Z" fill="url(#botanicalStem)" />
        <path d="M144 202 C146 210, 154 210, 156 202 L153 196 L147 196 Z" fill="#33483D" />

        {outerAngles.map((angle, idx) => (
          <motion.g
            key={`outer-${idx}`}
            style={{ transformOrigin: '150px 200px' }}
            animate={{
              rotate: isBud ? angle * 0.12 : isFirstLight ? angle * 0.45 : angle,
              scaleX: isBud ? 0.55 : isFirstLight ? 0.78 : 1,
              scaleY: isBud ? 0.78 : isFirstLight ? 0.9 : 1,
            }}
            transition={{ duration: 1.8, delay: idx * 0.1 }}
          >
            <path d="M150 200 C122 172, 114 115, 150 64 C186 115, 178 172, 150 200 Z" fill="url(#roseLilyOuter)" stroke="#FFE4E6" strokeWidth="0.7" />
            <path d="M150 198 C150 155, 150 115, 150 72" stroke="#FDA4AF" strokeWidth="0.8" opacity="0.6" />
          </motion.g>
        ))}

        {innerAngles.map((angle, idx) => (
          <motion.g
            key={`inner-${idx}`}
            style={{ transformOrigin: '150px 200px' }}
            animate={{
              rotate: isBud ? angle * 0.08 : isFirstLight ? angle * 0.38 : angle,
              scaleX: isBud ? 0.48 : isFirstLight ? 0.72 : 1,
              scaleY: isBud ? 0.74 : isFirstLight ? 0.88 : 1.02,
            }}
            transition={{ duration: 2.0, delay: 0.15 + idx * 0.08 }}
          >
            <path d="M150 200 C118 168, 108 112, 150 58 C192 112, 182 168, 150 200 Z" fill="url(#roseLilyInner)" stroke="#FFF1F2" strokeWidth="0.8" />
            <path d="M150 196 Q150 135 150 68" stroke="#FDA4AF" strokeWidth="0.7" opacity="0.6" />
          </motion.g>
        ))}

        <motion.g
          animate={{ opacity: isBloom ? 1 : isFirstLight ? 0.35 : 0, scale: isBloom ? 1 : 0.65 }}
          transition={{ duration: 1.2 }}
          style={{ transformOrigin: '150px 195px' }}
        >
          <path d="M150 196 C150 165, 150 135, 150 108" stroke="#FFE4E6" strokeWidth="1.5" />
          <circle cx="150" cy="106" r="3" fill="#FDE68A" />
          {[
            { cx: 122, cy: 122, cpx: 135, cpy: 160, rot: -25 },
            { cx: 132, cy: 114, cpx: 140, cpy: 155, rot: -15 },
            { cx: 141, cy: 110, cpx: 145, cpy: 152, rot: -6 },
            { cx: 159, cy: 110, cpx: 155, cpy: 152, rot: 6 },
            { cx: 168, cy: 114, cpx: 160, cpy: 155, rot: 15 },
            { cx: 178, cy: 122, cpx: 165, cpy: 160, rot: 25 },
          ].map((s, i) => (
            <g key={i}>
              <path d={`M150 196 Q${s.cpx} ${s.cpy} ${s.cx} ${s.cy}`} stroke="#FFF1F2" strokeWidth="0.9" opacity="0.8" />
              <ellipse cx={s.cx} cy={s.cy} rx="3.8" ry="1.6" transform={`rotate(${s.rot} ${s.cx} ${s.cy})`} fill="#FDE68A" />
            </g>
          ))}
        </motion.g>

        {isGlow &&
          goldenMotes.map((m, i) => (
            <motion.circle
              key={i}
              cx={150}
              cy={135}
              r={1.6}
              fill="#FDE68A"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 0.85, 0], x: m.dx, y: m.dy }}
              transition={{ duration: 3.8, delay: m.delay, ease: 'easeOut' }}
            />
          ))}
      </svg>
    </motion.div>
  );
};

export function App() {
  const [stage, setStage] = useState<StageType>('THRESHOLD');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [bloomPhase, setBloomPhase] = useState<BloomPhase>('BUD');
  const [showPrimaryMessage, setShowPrimaryMessage] = useState(false);
  const [showFinalWish, setShowFinalWish] = useState(false);

  useEffect(() => {
    return () => ambientAudio.cleanup();
  }, []);

  useEffect(() => {
    if (stage !== 'THE_BLOOM') return;
    setBloomPhase('BUD');
    setShowPrimaryMessage(false);
    setShowFinalWish(false);

    const t1 = setTimeout(() => setBloomPhase('FIRST_LIGHT'), 1000);
    const t2 = setTimeout(() => setBloomPhase('BLOOM'), 2600);
    const t3 = setTimeout(() => setBloomPhase('QUIET_GLOW'), 4400);
    const t4 = setTimeout(() => setShowPrimaryMessage(true), 5200);
    const t5 = setTimeout(() => setShowFinalWish(true), 7200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [stage]);

  const handleNextCard = () => {
    if (cardIndex < ECHO_CARDS.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else {
      setStage('THE_BLOOM');
    }
  };

  const handlePrevCard = () => {
    if (cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    } else {
      setStage('THRESHOLD');
    }
  };

  const currentCard = ECHO_CARDS[cardIndex];

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(180deg, #0B0F19 0%, #11172A 55%, #1E1B4B 100%)',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
        overflowX: 'hidden',
      }}
    >
      <AmbientCanvas />

      

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '580px', width: '100%', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          
          {stage === 'THRESHOLD' && (
            <motion.section
              key="threshold"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <SoftRoseLilySvg phase="BUD" size="small" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#FDA4AF',
                  marginTop: '0.8rem',
                  marginBottom: '1rem',
                }}
              >
                JUST FOR YOU 
              </motion.p>

              <div style={{ marginBottom: '2.25rem', padding: '0 0.5rem' }}>
                <motion.p
                  className="font-serif-art"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)',
                    fontWeight: 400,
                    color: '#F8FAFC',
                    marginBottom: '0.4rem',
                  }}
                >
                  Thời gian vừa qua, có những lúc bản thân tưởng sẽ có thể cùng nhau..
                </motion.p>
                <motion.p
                  className="font-serif-art"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  style={{
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)',
                    fontWeight: 400,
                    color: '#CBD5E1',
                  }}
                >
                  Nhưng cuối cùng cả 2 vẫn chọn dừng lại với hai chữ bình yên.
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                onClick={() => setStage('ECHOES')}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  color: '#F8FAFC',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(253, 230, 138, 0.3)',
                  boxShadow: '0 0 20px rgba(253, 230, 138, 0.08)',
                  cursor: 'pointer',
                }}
              >
                Words from Within ↓
              </motion.button>
            </motion.section>
          )}

          {stage === 'ECHOES' && (
            <motion.section
              key={`echo-${currentCard.id}`}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.7 }}
              style={{
                padding: '2.25rem 1.5rem',
                borderRadius: '1.25rem',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.68rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(203, 213, 225, 0.55)',
                  marginBottom: '1.25rem',
                }}
              >
                <span>0{cardIndex + 1} / 04 — {currentCard.label}</span>
              </div>

              <h2
                className="font-serif-art"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                  fontWeight: 400,
                  color: '#F8FAFC',
                  marginBottom: '1rem',
                }}
              >
                {currentCard.title}
              </h2>

              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.7,
                  color: 'rgba(203, 213, 225, 0.88)',
                  fontWeight: 300,
                  marginBottom: '2rem',
                }}
              >
                {currentCard.content}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={handlePrevCard}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(203, 213, 225, 0.6)',
                    fontSize: '0.83rem',
                    cursor: 'pointer',
                    padding: '0.4rem 0.6rem',
                  }}
                >
                  ← Back
                </button>

                <button
                  onClick={handleNextCard}
                  style={{
                    padding: '0.65rem 1.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    color: '#F8FAFC',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    cursor: 'pointer',
                  }}
                >
                  {cardIndex < ECHO_CARDS.length - 1 ? 'Continue →' : 'Final →'}
                </button>
              </div>
            </motion.section>
          )}

          {stage === 'THE_BLOOM' && (
            <motion.section
              key="bloom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <p
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.3em',
                  color: '#FDA4AF',
                  opacity: 0.8,
                  marginBottom: '0.2rem',
                }}
              >
                BÔNG HOA ĐẸP NHẤT
              </p>

              <SoftRoseLilySvg phase={bloomPhase} size="large" />

              <div style={{ minHeight: '150px', marginTop: '0.5rem', width: '100%' }}>
                {showPrimaryMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="font-serif-art"
                    style={{
                      fontSize: 'clamp(1.rem, 2.2vw, 1.25rem)',
                      color: '#F8FAFC',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      padding: '0 0.5rem',
                    }}
                  >
                    “Đóa hoa này vốn được chuẩn bị cho một khởi đầu mới. Nay nó nở rộ trọn vẹn để khép lại cho những điều đẹp đẽ. Ly biết không, Đây là hoa Lily mà Trí tạo ra, chỉ giành riêng cho cái tên Ly mà thôi. ”
                  </motion.p>
                )}

                {showFinalWish && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(203, 213, 225, 0.8)',
                        fontWeight: 300,
                        lineHeight: 1.65,
                        maxWidth: '440px',
                        margin: '0 auto 0.8rem auto',
                        padding: '0 0.5rem',
                      }}
                    >
                      Mong rằng những năm tháng sau này, dù đi đến đâu và ở cạnh ai, Ly cũng sẽ luôn được hạnh phúc. Và nếu một ngày nào đó có vào trang web này lại, mong Ly nhớ rằng những khoảnh khắc của cả 2 đẹp đẽ đến nhường nào.
                    </p>
                    <p
                      className="font-serif-art"
                      style={{
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        color: 'rgba(253, 230, 138, 0.85)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      10/23/26 03.00 AM.
                    </p>

                    <button
                      onClick={() => { setStage('ECHOES'); setCardIndex(2); }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(203, 213, 225, 0.5)',
                        fontSize: '0.78rem',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        padding: '0.4rem',
                      }}
                    >
                      ↺ Back
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;