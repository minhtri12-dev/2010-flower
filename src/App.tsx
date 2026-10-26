import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Stage = 'INTRO' | 'LOCK' | 'ECHOES' | 'BLOOM' | 'ALBUM';
type Photo = { src: string; caption: string; date: string };
type Chapter = { number: string; tag: string; title: string; paragraphs: string[] };

const PASSCODE = '22102026';
const BASE = import.meta.env.BASE_URL || '/';

const PHOTOS: Photo[] = [
  { src: `${BASE}memories/1.png`, caption: '27.6.26 ', date: '' },
  { src: `${BASE}memories/2.png`, caption: '27.6.26', date: '' },
  { src: `${BASE}memories/3.png`, caption: '12.7.26', date: '' },
  { src: `${BASE}memories/4.png`, caption: '14.8.26', date: '' },
  { src: `${BASE}memories/5.png`, caption: '14.8.26', date: '' },
  { src: `${BASE}memories/6.png`, caption: '22.10.26', date: '' },
];

const CHAPTERS: Chapter[] = [
  {
    number: '01',
    tag: 'THE BEGINNING · 26 MAY',
    title: 'Gặp gỡ',
    paragraphs: [
      'Quen biết Ly thông qua em Đông, vô tình 2 anh em trò chuyện vui vẻ trên Facebook thì có nhắc đến Ly, em Đông cứ kêu " anh thử làm quen xem, chị Ly hiền lắm. Cũng có nhiều người ưng chị nhưng mà chị chưa chịu ai đâu "  và vẫn nhớ như in cái ngày 26 tháng 5, ngày mà cả 2 bắt đầu trò chuyện và tìm hiểu.',
      'Từ Facebook, Instagram đến Locket, Ly đều chấp nhận lời mời kết bạn rất nhanh, hai người cũng bắt đầu nhắn nhiều hơn và kể nhau nghe những câu chuyện thường ngày. Khoảng thời gian đó thì Trí cũng rất muốn đi chơi với Ly nhưng do kẹt học Toeic nên Ly bảo là khi nào Trí học xong thì chúng ta gặp, cảm ơn Ly vì đã đợi Trí trong khoảng thời gian đó.',
      'Khoảnh khắc lần đầu gặp Ly thì Trí đã rung động rồi, tuy dáng người nhỏ nhắn nhưng Ly rất xinh và dịu dàng. Đó là lần đầu Trí có cảm giác rung động một người ngay lúc mới gặp. Cảm ơn Ly rất nhiều vì đã cho Trí biết được cảm giác đó nó đẹp đẽ nhường nào.',
    ],
  },
  {
    number: '02',
    tag: 'WHAT WAS SINCERE',
    title: 'Điều Trí nói về Ly',
    paragraphs: [
      'Trước mặt mọi người, Trí chưa từng giấu việc mình đang làm quen với Ly. Từ những người bạn đại học, bạn ở quê, những người bạn đá bóng cho đến mẹ nữa. Trí đã từng mong một ngày có thể tự hào giới thiệu Ly với mọi người, được chăm sóc và đi bên cạnh Ly.',
      'Mẹ Trí và mẹ Ly thì cũng biết nhau, nên là khi Trí nhắc đến Ly thì mẹ cũng thích lắm vì nhà Ly thường hay đi chùa và Ly cũng vậy, như cách mẹ Trí thường làm để cầu nguyện cho gia đình.',
      'Trong lòng Trí, ước mong được sớm làm bạn trai của Ly, được khoe với tất cả mọi người, được chăm sóc và đi cạnh Ly chưa từng là một bí mật hay điều gì phải giấu giếm cả.',
    ],
  },
  {
    number: '03',
    tag: 'THINGS WORTH KEEPING',
    title: 'Những món quà của cả 2 ',
    paragraphs: [
      'Cảm ơn Ly đã tặng Trí chiếc áo sơ mi rất đẹp và khung hình có tấm ảnh Messi mà Trí rất thích, cả 2 món đó đều được Trí giữ gìn sạch sẽ và cẩn thận. Trí biết những món quà này không phải lựa nhanh cho xong, đó là sự tìm hiểu và tỉ mỉ cả và Trí rất biết ơn về điều đó.',
      'Hộp nến thơm Ly tặng cho Trí, đến giờ Trí vẫn chưa dám dùng, Trí gói lại và đặt trên bàn để mùi hương không bay đi. Dù gì, thì Trí sẽ không dùng món quà này tại vì những kỉ niệm mà Ly tặng Trí luôn giữ bên mình, không bao giờ để nó mất hay trầy xước đâu. Cảm ơn Ly đã mua bánh cho Trí lúc Trí ở quê nha, những món quà và sự chăm chút nhỏ của Ly Trí đều không quên đâu hehe.',
      'Mấy món quà Trí tặng Ly, Trí đều tìm hiểu rất kĩ đó nha, cái áo màu hồng đó phù hợp với Ly lắm, hôm qua Ly mặc thật sự xinh lắm đó, không cần phải lộng lẫy nhưng vẫn toát ra vibe công chúa ˆˆ, cả vòng tay mà Trí tặng cho Ly nữa, dù chúng ta không còn liên lạc nhưng Ly nhớ hãy xem những món ấy như đồ dùng thường xuyên của mình nhá, vì những món quà Trí lựa chọn tuy không mắc tiền nhưng sẽ rất hợp với Ly lắm.',
    ],
  },
  {
    number: '04',
    tag: 'A QUIET GOODBYE',
    title: 'Những lời chúc tốt đẹp giành cho Ly',
    paragraphs: [
      'Nhưng tình cảm mà, nó phải đến từ 2 phía chứ, đúng không? Thời gian vừa qua, Trí đã cố gắng làm những gì có thể để ghi điểm trong mắt Ly. Ly không nói hôm nay đi làm mệt nhưng Trí luôn biết cảm giác khối lượng công việc mà Ly làm hằng ngày. Thế nên Trí đã ngỏ ý để đặt trà sữa hoặc thức uống khác cho Ly, để Ly có năng lượng hơn trong lúc làm việc. Món quà tuy nhỏ nhưng có thể giúp ít cho Ly để Ly làm việc hiệu quả hơn.',
      'Trí rất muốn hỏi thăm và chăm sóc Ly tận tình hơn, nhưng không biết Ly có nhìn lại mỗi khi Ly nhắn tin cọc không? Trí nhận được những câu đó thì có cảm giác đượm buồn lắm và Trí cũng biết là tính cách của Ly đó giờ vậy, hơi " nhạt " nhưng ở ngoài thì nói chuyện khá vui và dễ gần, vì vậy Trí cũng hiểu. Nhưng sau cái ngày 3/9 ấy, mọi thứ có lẽ vẫn không thay đổi, bản thân Trí cũng đã biết sẽ có ngày hôm nay. Lần này có thể Trí ít buồn hơn, nhưng những kỉ niệm thì sẽ còn rất lâu để quên được đó, Ly biết không? Lần này chắc sẽ không còn khả năng để quay lại nữa rồi, vì cảm xúc của Ly có lẽ cũng đã cạn kiệt.',
      'Cảm ơn Ly vì đã nói ra những điều thật lòng để Trí có thể ngừng chờ đợi một câu trả lời khác. Trí tôn trọng lựa chọn của Ly và mong những năm tháng phía trước sẽ mang đến cho Ly nhiều niềm vui, sự bình yên và một người thật sự phù hợp với điều Ly mong muốn. Đừng cảm thấy có lỗi khi nói ra những lời đó nữa, hạnh phúc của em là do em chọn mà. ',
    ],
  },
];

const CSS = `
:root{color-scheme:light;--paper:#f8f0df;--ink:#30231e;--rose:#b96878;--green:#7b8666;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
html,body,#root{margin:0;min-width:320px;min-height:100%;background:#dfd0b6}
body{font-family:Manrope,sans-serif;color:var(--ink)}
button,input{font:inherit}
button{-webkit-tap-highlight-color:transparent}
button:focus-visible,input:focus-visible{outline:2px solid var(--rose);outline-offset:4px}
.vk-app{position:relative;isolation:isolate;min-height:100vh;min-height:100dvh;overflow-x:hidden;background:radial-gradient(ellipse at 50% 0%,#fffcef,transparent 56%),linear-gradient(135deg,#dfd0b6,#f2e8d4 47%,#ddcbb0);color:var(--ink)}
.vk-app:before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.25;background:repeating-linear-gradient(0deg,#76553608 0,#76553608 1px,transparent 1px,transparent 4px)}
.vk-atmosphere{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.vk-moon{position:absolute;left:50%;top:-7%;width:min(85vw,820px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,#fffceec9,transparent 70%);filter:blur(16px)}
.vk-rays{position:absolute;top:-22%;left:50%;height:110vh;width:min(27vw,230px);transform:translateX(-50%) rotate(13deg);background:linear-gradient(#ffffff50,transparent);filter:blur(33px)}
.vk-canvas{position:fixed;inset:0;z-index:1;width:100%;height:100%;pointer-events:none;opacity:.85}
.vk-topbar{position:absolute;z-index:20;top:17px;left:20px;right:20px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.vk-brand{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#4a3327a8}
.vk-topbutton{border:1px solid #64432f45;background:#fff9e99c;color:#61483b;padding:9px 15px;border-radius:999px;cursor:pointer;font-size:11px;backdrop-filter:blur(10px)}
.vk-center{position:relative;z-index:2;min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:48px 16px}
.vk-eyebrow{font-size:9px;line-height:1.9;letter-spacing:.2em;text-transform:uppercase;color:#8d6b57}

.vk-intro{position:relative;width:min(100%,520px);height:min(78dvh,590px);min-height:380px;display:grid;place-items:center;cursor:pointer;background:transparent;border:0;padding:16px;touch-action:manipulation;perspective:1200px}
.vk-letter-scene{position:relative;width:min(100%,420px);height:min(72dvh,520px);min-height:360px;filter:drop-shadow(0 28px 32px #4c30242b);transform:rotate(-1.2deg);transition:transform .55s cubic-bezier(.2,.75,.2,1)}
.vk-letter-scene:hover{transform:rotate(0) translateY(-4px)}
.vk-letter-sheet{position:absolute;inset:0;border-radius:2px;background:#e9ddc7;box-shadow:0 9px 22px #6249301a}
.vk-letter-sheet-back{inset:5px -8px -7px 8px;transform:rotate(3deg);background:#e5d3bb}
.vk-letter-sheet-mid{inset:2px -4px -3px 4px;transform:rotate(1.5deg);background:#f1e5d0}
.vk-blank-letter{position:absolute;inset:0;overflow:hidden;background:linear-gradient(122deg,#fffdf3,#f8f0e0 44%,#f1e5cf);border:1px solid #9c79502f;box-shadow:inset 0 0 0 5px #f8f0df,inset 0 0 0 6px #9f805126,inset 0 20px 45px #ffffff45}
.vk-blank-letter:before{content:'';position:absolute;inset:16px;border:1px solid #99775540;pointer-events:none}
.vk-blank-letter:after{content:'';position:absolute;inset:22px;border:1px solid #b88f7140;pointer-events:none}
.vk-letter-edge{position:absolute;inset:0;opacity:.5;pointer-events:none;background:radial-gradient(ellipse at 0 0,#bb9c7440,transparent 30%),radial-gradient(ellipse at 100% 100%,#b6947130,transparent 30%)}
.vk-letter-emboss{position:absolute;left:50%;top:49%;width:150px;height:150px;transform:translate(-50%,-50%);opacity:.17;color:#bd7f80}
.vk-letter-emboss svg{width:100%;height:100%;overflow:visible}
.vk-letter-rule{position:absolute;left:50%;bottom:68px;width:84px;height:1px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,#a88a6b8c,transparent)}
.vk-letter-rule:after{content:'✦';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:0 9px;background:#f6ecd9;color:#a87c78;font-size:10px}
.vk-letter-corner{position:absolute;width:67px;height:67px;opacity:.48;color:#aa8d6c}
.vk-letter-corner svg{width:100%;height:100%}
.vk-letter-corner.top-left{top:22px;left:22px}
.vk-letter-corner.top-right{top:22px;right:22px;transform:scaleX(-1)}
.vk-letter-corner.bottom-left{bottom:22px;left:22px;transform:scaleY(-1)}
.vk-letter-corner.bottom-right{bottom:22px;right:22px;transform:scale(-1)}
.vk-letter-seal{position:absolute;left:50%;bottom:34px;transform:translateX(-50%);width:37px;height:37px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 32% 28%,#d69da0,#b96870 60%,#88444b);border:1px solid #8e4a4d;box-shadow:inset 0 0 0 3px #ffffff27,0 4px 9px #4a28261c;color:#f8e7d2;font-family:'Cormorant Garamond',serif;font-size:20px}
.vk-intro:active .vk-letter-scene{transform:rotate(0) scale(.988)}

.vk-lock-card{position:relative;width:min(100%,485px);padding:32px clamp(18px,5vw,40px) 35px;text-align:center;background:var(--paper);background-image:radial-gradient(ellipse at 8% 3%,#ffffffaa,transparent 43%);border:1px solid #6c52393b;box-shadow:0 28px 62px #3e2a1d25}
.vk-lock-card:before,.vk-letter:before,.vk-bloom-card:before,.vk-album:before{content:'';position:absolute;inset:10px;border:1px solid #89644229;pointer-events:none}
.vk-lock-card:after{content:'';position:absolute;left:50%;top:0;width:76px;height:2px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,#bb8e79,transparent)}
.vk-lock-seal{width:54px;height:54px;display:grid;place-items:center;margin:0 auto 13px;border-radius:50%;border:1px solid #b27c7666;color:#a44b61;background:radial-gradient(circle at 32% 28%,#fff8eb,#e7b8b2);box-shadow:inset 0 0 0 4px #fff7e66b;font-family:'Cormorant Garamond',serif;font-size:26px}
.vk-lock-title{font-family:'Cormorant Garamond',serif;font-size:43px;line-height:1.05;font-weight:500;letter-spacing:-.025em;margin:0;color:#2b201c}
.vk-lock-copy{font-family:Lora,serif;color:#806858;font-size:14px;line-height:1.8;margin:10px auto 23px;max-width:310px}
.vk-password-form{display:flex;flex-direction:column;gap:11px;max-width:290px;margin:0 auto}
.vk-password{width:100%;min-height:48px;border:1px solid #92755c66;border-radius:3px;background:#fffaf0a6;padding:12px 15px;text-align:center;color:#34251f;letter-spacing:.32em;font-size:17px}
.vk-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:44px;padding:12px 22px;border:1px solid #7c543b66;border-radius:999px;background:#ffffff68;color:#4b3027;cursor:pointer;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;transition:all .25s}
.vk-primary:hover{border-color:var(--rose);background:#ffffffc7;transform:translateY(-1px)}
.vk-primary:disabled{opacity:.65;cursor:wait}
.vk-error{min-height:18px;color:#a0443e;font-size:11px;margin:1px 0 0}
.vk-lock-note{margin:20px 0 0;color:#9a806d;font-size:9px;letter-spacing:.12em}

.vk-progress{position:fixed;z-index:19;top:0;left:0;width:100%;height:3px;background:#6448321a}
.vk-progress-fill{height:100%;background:linear-gradient(90deg,#c3a18a,var(--rose));transition:width .25s}
.vk-letter-wrap{position:relative;z-index:2;min-height:100vh;min-height:100dvh;padding:73px 0 34px;perspective:1600px}
.vk-letter{position:relative;isolation:isolate;overflow:hidden;width:min(calc(100% - 28px),800px);min-height:min(710px,calc(100dvh - 108px));margin:0 auto;padding:clamp(24px,5.2vw,56px) clamp(20px,6.4vw,70px) 35px;background:var(--paper);background-image:radial-gradient(ellipse at 4% 4%,#ffffffbd,transparent 39%),radial-gradient(ellipse at 97% 95%,#ae8e6221,transparent 35%);border:1px solid #6f4f532d;box-shadow:0 28px 62px #3e2a2f30;transform-style:preserve-3d;backface-visibility:hidden}
.vk-paper-top{position:relative;z-index:1;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding-bottom:9px;margin-bottom:25px;border-bottom:1px solid #30231e9e;font-family:'Cormorant Garamond',serif;font-size:18px;color:#34251f}
.vk-paper-no{white-space:nowrap}
.vk-paper-date{text-align:right;color:var(--rose);font-size:clamp(10px,1.6vw,14px);line-height:1.4;letter-spacing:.03em}
.vk-letter-header{position:relative;z-index:1;margin:0 0 24px;padding-bottom:18px;text-align:center;border-bottom:1px solid #30231e33}
.vk-letter-heading{font-family:'Cormorant Garamond',serif;font-size:clamp(31px,5vw,43px);font-weight:500;line-height:1.12;margin:0;color:#35231f}
.vk-letter-intro{font-family:Lora,serif;font-size:clamp(13px,1.8vw,15px);line-height:1.75;color:#7e6253;margin:10px auto 0}
.vk-paper-title{position:relative;z-index:1;font-family:'Cormorant Garamond',serif;font-size:clamp(31px,5.2vw,43px);line-height:1.12;font-weight:500;margin:0 0 16px;color:#241b18}
.vk-divider{position:relative;z-index:1;width:70px;height:1px;background:linear-gradient(90deg,var(--rose),transparent);margin-bottom:22px}
.vk-paragraph{position:relative;z-index:1;font-family:Lora,serif;font-size:clamp(15px,1.85vw,17px);line-height:1.95;font-style:italic;letter-spacing:.003em;color:#30211d;margin:0 0 20px;overflow-wrap:anywhere}
.vk-paragraph:last-of-type{margin-bottom:0}
.vk-flourish{position:relative;z-index:1;display:flex;align-items:center;gap:9px;margin-top:27px;opacity:.68}
.vk-flourish svg{width:22px;height:22px;stroke:var(--green)}
.vk-flourish span{height:1px;width:35px;background:#6e77558c}
.vk-footer{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:26px;padding-top:14px;border-top:1px solid #30231e33}
.vk-page-count{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.08em;color:#97735e}
.vk-controls{display:flex;justify-content:flex-end;gap:9px;flex-wrap:wrap}
.vk-secondary{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid #69483359;border-radius:999px;background:#ffffff61;color:#533a2f;padding:10px 16px;cursor:pointer;font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;transition:all .25s}
.vk-secondary:hover{border-color:var(--rose);color:var(--rose);background:#ffffffc7;transform:translateY(-1px)}
.vk-ending{position:relative;z-index:1;border-top:1px solid #30231e4d;margin-top:28px;padding-top:23px;text-align:center}
.vk-ending-quote{font-family:Lora,serif;font-size:clamp(16px,2vw,19px);font-style:italic;line-height:1.8;color:#3a2822;margin:0 auto 21px;max-width:570px}
.vk-ornament{position:absolute;left:20px;bottom:18px;width:62px;opacity:.42;pointer-events:none}

.vk-bloom-page{position:relative;z-index:2;width:min(calc(100% - 30px),820px);min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;margin:0 auto;padding:72px 0 35px}
.vk-bloom-card{position:relative;width:100%;padding:clamp(24px,5vw,46px) clamp(18px,5vw,52px);text-align:center;background:var(--paper);background-image:radial-gradient(ellipse at 10% 5%,#ffffffb3,transparent 43%);border:1px solid #6f4f5333;box-shadow:0 28px 62px #3e2a2f2e}
.vk-bloom-title{
  position: relative;
  z-index: 3;
  transform: translateY(-6px);
  margin: 0 0 8px;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(35px, 6vw, 52px);
  line-height: 1.13;
  font-weight: 500;
  color: #2b201c;
}
.vk-bloom-kicker{font-size:9px;letter-spacing:.22em;color:#9a6c55;margin:0 0 9px}
.vk-lily-stage{position:relative;min-height:clamp(330px,54vw,480px);display:flex;align-items:center;justify-content:center;margin:0 auto;overflow:visible}
.vk-lily-stage:before{content:'';position:absolute;width:min(75vw,390px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#c4a9824d,#c4a98217 48%,transparent 70%);pointer-events:none}
.vk-bouquet{
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: min(440px, 91vw);
  height: auto;
  overflow: visible;
  transform: translateY(22px);
  filter: drop-shadow(0 13px 12px #69513a20);
}
.vk-bouquet svg{display:block;width:100%;height:auto;overflow:visible}
.vk-bloom-copy{position:relative;z-index:2;max-width:680px;margin:0 auto;padding:0 8px}
.vk-bloom-primary{font-family:Lora,serif;font-size:clamp(16px,2vw,19px);line-height:1.85;font-style:italic;color:#35231f;margin:12px auto 0}
.vk-bloom-secondary{max-width:555px;margin:18px auto 0;color:#624b3f;font-family:Lora,serif;font-size:15px;line-height:1.9}
.vk-bloom-signature{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:#a0443e;margin:20px 0 0}
.vk-bloom-date{font-size:9px;letter-spacing:.13em;color:#947a66;margin:20px 0 0}
.vk-rule{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:19px;opacity:.65}
.vk-rule span{width:28px;height:1px;background:#533a2c73}
.vk-rule i{width:5px;height:5px;border-radius:50%;background:var(--rose)}

.vk-album-page{position:relative;z-index:2;width:min(calc(100% - 30px),900px);margin:0 auto;padding:75px 0 45px}
.vk-album{position:relative;padding:clamp(22px,5vw,48px);background:#f5ecd6;border:1px solid #6f4f533b;box-shadow:0 28px 62px #3e2a2f30;overflow:hidden}
.vk-album-heading{position:relative;z-index:1;text-align:center;margin:0 0 26px}
.vk-album-title{font-family:'Cormorant Garamond',serif;font-size:clamp(35px,6vw,54px);font-weight:500;line-height:1.1;color:#2a201b;margin:0}
.vk-album-subtitle{font-family:Lora,serif;color:#866a56;font-size:14px;line-height:1.7;margin:9px 0 0}
.vk-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2.3vw,25px);align-items:start}
.vk-polaroid{position:relative;min-width:0;padding:8px 8px 34px;background:#fffaf0;box-shadow:0 7px 15px #442f202b;border:1px solid #644b381f;transform:rotate(var(--tilt,-2deg));transition:transform .3s,box-shadow .3s;cursor:pointer}
.vk-polaroid:nth-child(3n+2){--tilt:2deg;margin-top:15px}
.vk-polaroid:nth-child(3n){--tilt:-1deg;margin-top:5px}
.vk-polaroid:disabled{cursor:default}
.vk-polaroid:hover:not(:disabled){transform:rotate(0) translateY(-4px);box-shadow:0 14px 24px #442f2038}
.vk-photo-frame{aspect-ratio:4/5;overflow:hidden;background:linear-gradient(145deg,#e6d8bd,#f4ead6);display:flex;align-items:center;justify-content:center}
.vk-photo-frame img{display:block;width:100%;height:100%;object-fit:cover}
.vk-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#947b66;text-align:center;padding:10px}
.vk-placeholder svg{width:38px;height:38px;stroke:#9a8a6b}
.vk-placeholder span{font-family:'Cormorant Garamond',serif;font-size:14px;line-height:1.4}
.vk-photo-date,.vk-photo-caption{position:absolute;left:4px;right:4px;text-align:center;font-family:'Cormorant Garamond',serif}
.vk-photo-date{bottom:22px;font-size:12px;color:#a0443e}
.vk-photo-caption{bottom:5px;font-size:13px;color:#735c4c;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.vk-album-note{text-align:center;max-width:560px;margin:18px auto 0;font-family:Lora,serif;font-size:13px;color:#826957;line-height:1.6;font-style:italic}
.vk-lightbox{position:fixed;z-index:60;inset:0;display:flex;align-items:center;justify-content:center;padding:20px;background:#2c1f1acc;backdrop-filter:blur(8px)}
.vk-lightbox img{max-width:min(88vw,780px);max-height:82dvh;object-fit:contain;padding:10px 10px 30px;background:#fffaf0;box-shadow:0 22px 70px #0006;transform:rotate(-1deg)}
.vk-lightbox-close{position:absolute;right:20px;top:20px;border:1px solid #ffffffa6;background:#fff8e824;color:white;padding:8px 12px;border-radius:50%;cursor:pointer;font-size:20px}

@media(max-width:620px){
  .vk-topbar{top:11px;left:12px;right:12px}
  .vk-brand{font-size:8px;letter-spacing:.18em}
  .vk-topbutton{padding:8px 11px;font-size:10px}
  .vk-center{padding:35px 11px}
  .vk-intro{width:100%;height:min(77dvh,590px);min-height:330px;padding:10px}
  .vk-letter-scene{width:min(100%,370px);height:min(67dvh,480px);min-height:330px}
  .vk-blank-letter:before{inset:12px}
  .vk-blank-letter:after{inset:17px}
  .vk-letter-corner{width:48px;height:48px}
  .vk-letter-corner.top-left,.vk-letter-corner.top-right{top:17px}
  .vk-letter-corner.bottom-left,.vk-letter-corner.bottom-right{bottom:17px}
  .vk-letter-corner.top-left,.vk-letter-corner.bottom-left{left:17px}
  .vk-letter-corner.top-right,.vk-letter-corner.bottom-right{right:17px}
  .vk-letter-emboss{width:115px;height:115px}
  .vk-letter-rule{bottom:54px}
  .vk-letter-seal{bottom:25px;width:33px;height:33px;font-size:18px}
  .vk-lock-card{padding:24px 15px 27px}
  .vk-lock-seal{width:47px;height:47px}
  .vk-lock-title{font-size:37px}
  .vk-lock-copy{font-size:13px;margin:8px auto 18px}
  .vk-letter-wrap{padding:61px 0 24px}
  .vk-letter{width:calc(100% - 18px);min-height:calc(100dvh - 85px);padding:21px 17px 24px}
  .vk-letter:before,.vk-lock-card:before,.vk-bloom-card:before,.vk-album:before{inset:7px}
  .vk-paper-top{margin-bottom:20px;padding-bottom:8px;gap:7px;font-size:15px}
  .vk-paper-date{font-size:9px;letter-spacing:0}
  .vk-letter-header{margin-bottom:18px;padding-bottom:14px}
  .vk-letter-heading{font-size:30px}
  .vk-letter-intro{font-size:12px;line-height:1.7}
  .vk-paper-title{font-size:clamp(29px,8vw,36px);margin-bottom:13px}
  .vk-divider{margin-bottom:17px}
  .vk-paragraph{font-size:clamp(14px,3.9vw,16px);line-height:1.9;margin-bottom:16px}
  .vk-footer{margin-top:22px;padding-top:12px}
  .vk-page-count{font-size:13px}
  .vk-secondary{padding:9px 11px;font-size:9px;letter-spacing:.04em}
  .vk-ornament{width:42px;left:9px;bottom:9px}
  .vk-ending{margin-top:22px;padding-top:17px}
  .vk-ending-quote{font-size:15px;line-height:1.8}
  .vk-bloom-page{width:calc(100% - 18px);padding:60px 0 24px}
  .vk-bloom-card{padding:22px 15px}
  .vk-bloom-title{
  font-size: clamp(35px, 6vw, 52px);
  transform: translateY(-6px);
  margin-bottom: 8px;
}
  .vk-lily-stage{min-height:clamp(300px,84vw,380px)}
  .vk-bouquet{width:min(390px,94vw)}
  .vk-bloom-primary{font-size:15px;line-height:1.8}
  .vk-bloom-secondary{font-size:13px;line-height:1.8}
  .vk-album-page{width:calc(100% - 18px);padding:60px 0 24px}
  .vk-album{padding:24px 15px 25px}
  .vk-album-title{font-size:clamp(32px,8.5vw,43px)}
  .vk-album-subtitle{font-size:12px}
  .vk-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
  .vk-polaroid{padding:6px 6px 31px}
  .vk-polaroid:nth-child(3n+2),.vk-polaroid:nth-child(3n){margin-top:0}
  .vk-polaroid:nth-child(even){margin-top:13px}
  .vk-photo-caption{font-size:11px}
  .vk-photo-date{font-size:10px}
  .vk-placeholder span{font-size:12px}
  .vk-album-note{font-size:11px}
  .vk-lightbox{padding:12px}
}
@media(prefers-reduced-motion:reduce){
  *,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
`;

function BotanicalDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none" aria-hidden="true">
      <path d="M50 112C52 88 51 61 57 28" stroke="#7d8565" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M52 87C30 88 19 73 18 55C39 55 51 67 52 87Z" fill="#8c9671" fillOpacity=".35" stroke="#7d8565" strokeWidth="1.1"/>
      <path d="M54 63C57 43 73 30 88 31C86 50 72 64 54 63Z" fill="#8c9671" fillOpacity=".3" stroke="#7d8565" strokeWidth="1.1"/>
      <path d="M57 28C43 23 43 11 53 5C65 12 66 21 57 28Z" fill="#a44b43" fillOpacity=".28" stroke="#a44b43" strokeWidth="1.1"/>
    </svg>
  );
}

function PinkLilyBouquet({ reducedMotion }: { reducedMotion: boolean }) {
  const flowers = [
    { x: 123, y: 137, scale: 0.78, rotate: -17, delay: 0.15 },
    { x: 228, y: 88, scale: 0.86, rotate: 5, delay: 0.32 },
    { x: 335, y: 142, scale: 0.76, rotate: 18, delay: 0.48 },
    { x: 169, y: 231, scale: 0.68, rotate: -10, delay: 0.65 },
    { x: 292, y: 233, scale: 0.69, rotate: 13, delay: 0.8 },
  ];

  const petalRotations = [0, 60, 120, 180, 240, 300];

  return (
    <div className="vk-bouquet" role="img" aria-label="Bó hoa gồm năm bông Lily màu hồng đang nở rộ">
      <svg viewBox="0 0 460 535" aria-hidden="true">
        <defs>
          <linearGradient id="lilyPetalPink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff2f2"/>
            <stop offset="28%" stopColor="#f8c9d7"/>
            <stop offset="67%" stopColor="#e98eaf"/>
            <stop offset="100%" stopColor="#c95f8a"/>
          </linearGradient>
          <linearGradient id="lilyPetalLight" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#fff7f2"/>
            <stop offset="38%" stopColor="#f6c6d4"/>
            <stop offset="75%" stopColor="#e88bab"/>
            <stop offset="100%" stopColor="#bd5e83"/>
          </linearGradient>
          <linearGradient id="lilyStem" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#516a45"/>
            <stop offset="42%" stopColor="#8ea06b"/>
            <stop offset="67%" stopColor="#6c8755"/>
            <stop offset="100%" stopColor="#405b3a"/>
          </linearGradient>
          <linearGradient id="lilyWrap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4e9"/>
            <stop offset="42%" stopColor="#f0d9d2"/>
            <stop offset="100%" stopColor="#d5aeb1"/>
          </linearGradient>
          <linearGradient id="lilyWrapSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d8b4b3"/>
            <stop offset="100%" stopColor="#f4dfd6"/>
          </linearGradient>
          <radialGradient id="lilyPollen">
            <stop offset="0%" stopColor="#bd8542"/>
            <stop offset="100%" stopColor="#8b572b"/>
          </radialGradient>
          <filter id="lilyPetalShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2"/>
          </filter>
        </defs>

        <ellipse cx="230" cy="482" rx="108" ry="17" fill="#75503e" opacity=".13" filter="url(#lilyPetalShadow)"/>

        {/* Thân hoa hội tụ về phần giấy gói. */}
        <g fill="none" stroke="url(#lilyStem)" strokeLinecap="round" strokeLinejoin="round">
          <path d="M123 140 C126 228 161 298 209 388" strokeWidth="5"/>
          <path d="M228 91 C222 205 231 287 230 393" strokeWidth="5.5"/>
          <path d="M335 144 C327 236 288 309 249 389" strokeWidth="5"/>
          <path d="M169 232 C181 287 206 339 222 397" strokeWidth="4.2"/>
          <path d="M292 233 C281 288 258 344 239 397" strokeWidth="4.2"/>
        </g>

        {/* Lá Lily dài, nhọn và có gân lá. */}
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M173 333 C123 322 99 283 101 247 C140 254 169 288 173 333Z" fill="#81986b" stroke="#536e48" strokeWidth="1.2"/>
          <path d="M172 330 C145 301 123 274 105 251" fill="none" stroke="#c0c99b" strokeWidth="1.4"/>
          <path d="M192 359 C144 365 115 343 101 313 C138 306 176 328 192 359Z" fill="#718c5c" stroke="#536e48" strokeWidth="1.2"/>
          <path d="M188 356 L106 316" fill="none" stroke="#b7c38f" strokeWidth="1.4"/>
          <path d="M284 335 C329 307 350 270 344 238 C308 255 287 288 284 335Z" fill="#8da172" stroke="#536e48" strokeWidth="1.2"/>
          <path d="M287 328 C307 296 329 265 341 242" fill="none" stroke="#ccd2a5" strokeWidth="1.4"/>
          <path d="M265 361 C311 364 340 340 351 309 C315 303 279 328 265 361Z" fill="#6f8958" stroke="#536e48" strokeWidth="1.2"/>
          <path d="M270 357 L347 312" fill="none" stroke="#b7c58f" strokeWidth="1.4"/>
          <path d="M229 341 C197 314 194 282 207 258 C235 282 241 313 229 341Z" fill="#95a778" stroke="#657b50" strokeWidth="1.1"/>
          <path d="M229 336 L210 263" fill="none" stroke="#d2d7ab" strokeWidth="1.2"/>
        </g>

        {/* Năm bông Lily hồng, mỗi bông có sáu cánh nhọn. */}
        {flowers.map((flower) => (
          <motion.g
            key={`${flower.x}-${flower.y}`}
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.85,
              delay: reducedMotion ? 0 : flower.delay,
              type: 'spring',
              stiffness: 82,
              damping: 12,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <g transform={`translate(${flower.x} ${flower.y}) rotate(${flower.rotate}) scale(${flower.scale})`}>
              {/* Ba cánh phía sau sáng màu hơn. */}
              {petalRotations.filter((_, i) => i % 2 === 1).map((rotation) => (
                <g key={`back-${rotation}`} transform={`rotate(${rotation})`}>
                  <path
                    d="M0 -4 C-12 -23 -25 -51 -24 -79 C-23 -103 -9 -120 0 -126 C12 -116 25 -99 25 -78 C25 -49 13 -22 0 -4Z"
                    fill="url(#lilyPetalLight)" stroke="#c96f91" strokeWidth="1.25"
                  />
                  <path d="M0 -11 C-3 -35 -4 -69 0 -118" fill="none" stroke="#fff4ef" strokeWidth="1.35" opacity=".85"/>
                </g>
              ))}

              {/* Ba cánh phía trước có gân và đốm hồng đậm đặc trưng. */}
              {petalRotations.filter((_, i) => i % 2 === 0).map((rotation) => (
                <g key={`front-${rotation}`} transform={`rotate(${rotation})`}>
                  <path
                    d="M0 -3 C-16 -23 -31 -50 -29 -76 C-27 -101 -12 -122 0 -130 C14 -118 29 -98 29 -76 C30 -48 15 -20 0 -3Z"
                    fill="url(#lilyPetalPink)" stroke="#c45c86" strokeWidth="1.45"
                  />
                  <path d="M0 -12 C-4 -37 -5 -79 0 -121" fill="none" stroke="#fff6f1" strokeWidth="1.8" opacity=".92"/>
                  <path d="M-2 -24 C-10 -48 -17 -67 -18 -88 M2 -25 C11 -49 17 -68 18 -88" fill="none" stroke="#d7789c" strokeWidth="1.2" opacity=".78"/>
                  <path d="M-1 -25 C-7 -49 -8 -73 -5 -94" fill="none" stroke="#fff9f4" strokeWidth=".9" opacity=".75"/>
                  <g fill="#a83e71" opacity=".82">
                    <ellipse cx="-8" cy="-69" rx="2.5" ry="3.8" transform="rotate(-13 -8 -69)"/>
                    <ellipse cx="8" cy="-75" rx="2.2" ry="3.2" transform="rotate(12 8 -75)"/>
                    <ellipse cx="-14" cy="-84" rx="1.9" ry="2.7"/>
                    <ellipse cx="13" cy="-91" rx="1.7" ry="2.5"/>
                    <circle cx="2" cy="-61" r="1.7"/>
                    <circle cx="-2" cy="-99" r="1.6"/>
                  </g>
                </g>
              ))}

              <ellipse cx="0" cy="-1" rx="19" ry="15" fill="#e99ab0" opacity=".6"/>
              <ellipse cx="0" cy="1" rx="10.5" ry="8.2" fill="#f5d59b" stroke="#bc8457" strokeWidth="1.2"/>
              <ellipse cx="0" cy="0" rx="5.5" ry="4.2" fill="#fff1bd"/>

              {/* Nhị hoa và bao phấn màu vàng nâu. */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <g key={`stamen-${angle}`} transform={`rotate(${angle})`}>
                  <path d="M0 0 Q-3 -14 1 -31" fill="none" stroke="#e4c08a" strokeWidth="2.3" strokeLinecap="round"/>
                  <ellipse cx="1" cy="-33" rx="3.4" ry="7" transform="rotate(14 1 -33)" fill="url(#lilyPollen)" stroke="#966434" strokeWidth=".75"/>
                  <path d="M0 -29 L1 -37" stroke="#eacb8f" strokeWidth=".8"/>
                </g>
              ))}
            </g>
          </motion.g>
        ))}

        {/* Giấy gói màu hồng phấn và kem. */}
        <path d="M91 282 C130 300 181 299 230 283 C279 299 330 300 369 282 L321 427 L230 482 L139 427Z" fill="#c89da3" opacity=".8"/>
        <path d="M99 278 C142 296 190 292 230 279 L230 466 L145 421Z" fill="url(#lilyWrapSide)" stroke="#cda7a6" strokeWidth="1.2"/>
        <path d="M230 279 C270 292 318 296 361 278 L315 421 L230 466Z" fill="url(#lilyWrap)" stroke="#e3c6be" strokeWidth="1.2"/>
        <path d="M103 289 L147 414 L225 461" fill="none" stroke="#fff6e9" strokeWidth="2" opacity=".72"/>
        <path d="M357 289 L313 414 L235 461" fill="none" stroke="#b8828e" strokeWidth="1.6" opacity=".48"/>
        <path d="M146 307 C177 320 203 321 230 311 C257 321 283 320 314 307" fill="none" stroke="#fff2e8" strokeWidth="1.5" opacity=".78"/>

        {/* Nơ ruy băng ở phần thân bó hoa. */}
        <g strokeLinejoin="round">
          <path d="M228 391 C195 364 167 369 175 396 C181 411 206 407 228 396Z" fill="#b65e79" stroke="#97425f" strokeWidth="1.2"/>
          <path d="M232 391 C265 364 293 369 285 396 C279 411 254 407 232 396Z" fill="#d77d98" stroke="#a94e6e" strokeWidth="1.2"/>
          <path d="M222 398 L211 431 L232 420 L243 433 L240 397Z" fill="#b95d7c" stroke="#a94e6e" strokeWidth="1.1"/>
          <path d="M228 391 C218 384 218 400 230 402 C242 400 241 385 232 391Z" fill="#f0b2c0" stroke="#a94e6e" strokeWidth="1.2"/>
          <path d="M180 391 Q199 385 215 396 M280 391 Q261 385 245 396" fill="none" stroke="#f5c7d0" strokeWidth="1.3" opacity=".9"/>
        </g>
        <path d="M158 434 Q230 462 302 434" fill="none" stroke="#fff6ee" strokeWidth="1.2" opacity=".75"/>
      </svg>
    </div>
  );
}

function BlankLetterArt() {
  return (
    <>
      <div className="vk-letter-sheet vk-letter-sheet-back"/>
      <div className="vk-letter-sheet vk-letter-sheet-mid"/>
      <div className="vk-blank-letter">
        <div className="vk-letter-edge"/>
        <div className="vk-letter-corner top-left" aria-hidden="true"><BotanicalDoodle/></div>
        <div className="vk-letter-corner top-right" aria-hidden="true"><BotanicalDoodle/></div>
        <div className="vk-letter-corner bottom-left" aria-hidden="true"><BotanicalDoodle/></div>
        <div className="vk-letter-corner bottom-right" aria-hidden="true"><BotanicalDoodle/></div>
        <div className="vk-letter-emboss" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none">
            <path d="M60 104V45" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M60 82C39 82 25 68 27 48C46 49 59 62 60 82Z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M61 66C62 45 78 31 97 32C94 52 80 66 61 66Z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M60 45C45 38 43 24 54 15C66 24 68 36 60 45Z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M60 45C39 30 40 12 58 6C75 17 75 33 60 45Z" stroke="currentColor" strokeWidth="1.1" opacity=".7"/>
            <path d="M60 45C72 28 88 26 99 37C87 51 73 52 60 45Z" stroke="currentColor" strokeWidth="1.1" opacity=".7"/>
            <path d="M60 45C47 56 46 69 54 78" stroke="currentColor" strokeWidth="1" opacity=".65"/>
          </svg>
        </div>
        <div className="vk-letter-rule"/>
        <div className="vk-letter-seal" aria-hidden="true">✿</div>
      </div>
    </>
  );
}

function AmbientCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let lastFrame = 0;

    const count = reducedMotion ? 16 : width < 640 ? 43 : 78;
    const colors = ['#e4cba7', '#fff7e4', '#c69a79', '#b7b898', '#f2d9b0'];

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.45,
      vx: (Math.random() - 0.5) * 0.55,
      vy: -(Math.random() * 0.65 + 0.18),
      a: Math.random() * 0.46 + 0.18,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!reducedMotion && time - lastFrame < 28) return;
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        const twinkle = 0.65 + 0.35 * Math.sin(time * 0.0012 + p.phase);
        ctx.globalAlpha = p.a * twinkle;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -8) {
            p.y = height + 8;
            p.x = Math.random() * width;
          }
          if (p.x < -8) p.x = width + 8;
          if (p.x > width + 8) p.x = -8;
        }
      });

      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="vk-canvas" aria-hidden="true"/>;
}

export default function App() {
  const reduce = useReducedMotion();
  const reduced = Boolean(reduce);

  const [stage, setStage] = useState<Stage>('INTRO');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [opening, setOpening] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bloomReady, setBloomReady] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const touchStartX = useRef<number | null>(null);
  const currentChapter = CHAPTERS[chapterIndex];

  useEffect(() => {
    const fonts = [
      ['vk-font-cormorant', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap'],
      ['vk-font-lora', 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap'],
      ['vk-font-manrope', 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap'],
    ];

    fonts.forEach(([id, href]) => {
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    const style = document.createElement('style');
    style.id = 'vk-app-style';
    style.textContent = CSS;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (stage !== 'BLOOM') return;

    if (reduced) {
      setBloomReady(true);
      return;
    }

    setBloomReady(false);
    const timer = window.setTimeout(() => setBloomReady(true), 4000);
    return () => window.clearTimeout(timer);
  }, [stage, reduced]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const unlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() !== PASSCODE) {
      setError('Sai rồi, không phải ngày này.');
      setPassword('');
      return;
    }

    setError('');
    setOpening(true);

    window.setTimeout(() => {
      setStage('ECHOES');
      setChapterIndex(0);
      setOpening(false);
      scrollTop();
    }, reduced ? 30 : 780);
  };

  const turnPage = (next: number) => {
    setDirection(next > chapterIndex ? 1 : -1);
    setChapterIndex(next);
    scrollTop();
  };

  const showBloom = () => {
    setStage('BLOOM');
    setBloomReady(false);
    scrollTop();
  };

  return (
    <main className="vk-app">
      <div className="vk-atmosphere" aria-hidden="true">
        <div className="vk-moon"/>
        <div className="vk-rays"/>
      </div>

      <AmbientCanvas reducedMotion={reduced}/>

      {stage !== 'INTRO' && (
        <div className="vk-topbar">
          <span className="vk-brand"> A PRIVATE LETTER</span>
          {stage !== 'LOCK' && (
            <button
              className="vk-topbutton"
              type="button"
              onClick={() => {
                setStage(stage === 'ALBUM' ? 'BLOOM' : stage === 'BLOOM' ? 'ECHOES' : 'LOCK');
                scrollTop();
              }}
            >
              ← Back
            </button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === 'INTRO' ? (
          <motion.section
            key="intro"
            className="vk-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(5px)' }}
            transition={{ duration: reduced ? 0.12 : 0.65 }}
          >
            <button
              type="button"
              className="vk-intro"
              onClick={() => setStage('LOCK')}
              aria-label="Chạm để mở bức thư"
            >
              <div className="vk-letter-scene" aria-hidden="true">
                <BlankLetterArt/>
              </div>
            </button>
          </motion.section>
        ) : stage === 'LOCK' ? (
          <motion.section
            key="lock"
            className="vk-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
            transition={{ duration: reduced ? 0.12 : 0.5 }}
          >
            <div className={`vk-lock-card ${opening ? 'is-opening' : ''}`}>
              <div className="vk-lock-seal" aria-hidden="true">✿</div>
              <p className="vk-eyebrow" style={{ margin: '0 0 5px' }}>
                A LETTER KEPT SECRET
              </p>
              <h1 className="vk-lock-title">Vùng Ký Ức</h1>
              <p className="vk-lock-copy">
                Nhập ngày, tháng, năm để mở khoá.
              </p>

              <form className="vk-password-form" onSubmit={unlock}>
                <input
                  className="vk-password"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={8}
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  aria-label="Nhập mật khẩu"
                  aria-describedby="vk-password-error"
                  autoFocus
                />
                <button className="vk-primary" type="submit" disabled={opening}>
                  {opening ? 'Đang mở thư…' : 'Mở lá thư'}
                  <span aria-hidden="true">→</span>
                </button>
                <p className="vk-error" id="vk-password-error" role="status">
                  {error}
                </p>
              </form>
              <p className="vk-lock-note">ONLY A MEMORY, PRESERVED WITH CARE</p>
            </div>
          </motion.section>
        ) : stage === 'ECHOES' ? (
          <motion.section
            key="letters"
            className="vk-letter-wrap"
            initial={{ opacity: 0, filter: 'blur(7px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(7px)' }}
            transition={{ duration: reduced ? 0.12 : 0.65 }}
          >
            <div className="vk-progress" aria-hidden="true">
              <div
                className="vk-progress-fill"
                style={{ width: `${((chapterIndex + 1) / CHAPTERS.length) * 100}%` }}
              />
            </div>

            <div
              className="vk-letter"
              onTouchStart={event => {
                touchStartX.current = event.changedTouches[0]?.screenX ?? null;
              }}
              onTouchEnd={event => {
                if (touchStartX.current === null) return;
                const delta = event.changedTouches[0].screenX - touchStartX.current;

                if (Math.abs(delta) > 70) {
                  if (delta < 0 && chapterIndex < CHAPTERS.length - 1) {
                    turnPage(chapterIndex + 1);
                  } else if (delta > 0 && chapterIndex > 0) {
                    turnPage(chapterIndex - 1);
                  }
                }

                touchStartX.current = null;
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={currentChapter.number}
                  custom={direction}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          rotateY: direction > 0 ? 17 : -17,
                          x: direction > 0 ? 22 : -22,
                        }
                  }
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          rotateY: direction > 0 ? -14 : 14,
                          x: direction > 0 ? -18 : 18,
                        }
                  }
                  transition={{
                    duration: reduced ? 0.12 : 0.52,
                    ease: [0.22, 0.72, 0.15, 1],
                  }}
                >
                  <div className="vk-paper-top">
                    <span className="vk-paper-no">No. {currentChapter.number} __</span>
                    <span className="vk-paper-date">{currentChapter.tag}</span>
                  </div>

                  {chapterIndex === 0 && (
                    <header className="vk-letter-header">
                      <p className="vk-eyebrow" style={{ margin: '0 0 8px' }}>
                        WORDS FROM WITHIN
                      </p>
                      <h1 className="vk-letter-heading">Những dòng tâm tư của bản thân</h1>
                      <p className="vk-letter-intro">
                        Không phải để níu giữ, chỉ để trân trọng những điều đẹp đẽ đã trải qua.
                      </p>
                    </header>
                  )}

                  <h2 className="vk-paper-title">{currentChapter.title}</h2>
                  <div className="vk-divider"/>

                  {currentChapter.paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="vk-paragraph"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduced ? 0.12 : 0.5,
                        delay: reduced ? 0 : 0.12 + index * 0.12,
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}

                  <div className="vk-flourish" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21V11M12 15C6 15 4 10 4 5C9 5 12 8 12 15ZM12 12C12 7 16 3 21 3C21 9 18 12 12 12Z"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span/>
                  </div>

                  {chapterIndex === CHAPTERS.length - 1 && (
                    <div className="vk-ending">
                      <p className="vk-ending-quote">
                        “Thật ra, thích em không nằm trong kế hoạch của anh.
                        <br/>
                        Cũng giống như việc phải quên em, đó là điều anh chưa từng chuẩn bị.”
                      </p>
                      <button className="vk-secondary" type="button" onClick={showBloom}>
                        Final →
                      </button>
                    </div>
                  )}

                  <BotanicalDoodle className="vk-ornament"/>

                  <footer className="vk-footer">
                    <span className="vk-page-count">
                      {chapterIndex + 1} / {CHAPTERS.length}
                    </span>

                    <div className="vk-controls">
                      {chapterIndex > 0 && (
                        <button
                          className="vk-secondary"
                          type="button"
                          onClick={() => turnPage(chapterIndex - 1)}
                        >
                          ← Previous
                        </button>
                      )}

                      {chapterIndex < CHAPTERS.length - 1 && (
                        <button
                          className="vk-secondary"
                          type="button"
                          onClick={() => turnPage(chapterIndex + 1)}
                        >
                          Next →
                        </button>
                      )}
                    </div>
                  </footer>
                </motion.article>
              </AnimatePresence>
            </div>
          </motion.section>
        ) : stage === 'BLOOM' ? (
          <motion.section
            key="bloom"
            className="vk-bloom-page"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.9 }}
          >
            <div className="vk-bloom-card">
              <p className="vk-eyebrow vk-bloom-kicker">LILY FLOWER</p>
              <h1 className="vk-bloom-title">Bông hoa đẹp nhất</h1>

              <div className="vk-lily-stage">
                <PinkLilyBouquet reducedMotion={reduced}/>
              </div>

              <div className="vk-bloom-copy">
                <AnimatePresence>
                  {bloomReady && (
                    <motion.div
                      initial={
                        reduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: 8, filter: 'blur(5px)' }
                      }
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: reduced ? 0.12 : 1 }}
                    >
                      <p className="vk-bloom-primary">
                        “Boá hoa này vốn được chuẩn bị cho một khởi đầu mới. Nay nó nở rộ trọn vẹn để khép lại cho những điều đẹp đẽ. Ly biết không, Đây là hoa Lily mà Trí tạo ra, chỉ giành riêng cho cái tên Ly mà thôi.”
                      </p>

                      <p className="vk-bloom-secondary">
                        Mong rằng những năm tháng phía trước sẽ dịu dàng với Ly, Nếu một ngày tình cờ Ly tìm được pass và vào được nơi này, mong Ly sẽ nhớ về nó như là một kỉ niệm đẹp của cả hai. Cuối cùng, Trí cũng có thể nói những dòng chữ này ở nơi đây thôi, " Anh thật sự yêu em lắm, Bùi Yến Ly. "
                      </p>

                      <p className="vk-bloom-signature">May life be gentle with you.</p>
                      <p className="vk-bloom-date">23 10 26 · 03:00 AM</p>

                      <div className="vk-rule" aria-hidden="true">
                        <span/>
                        <i/>
                        <span/>
                      </div>

                      <div style={{ marginTop: 22 }}>
                        <button
                          className="vk-secondary"
                          type="button"
                          onClick={() => {
                            setStage('ALBUM');
                            scrollTop();
                          }}
                        >
                          Memorable photos →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="album"
            className="vk-album-page"
            initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.7 }}
          >
            <div className="vk-album">
              <BotanicalDoodle className="vk-ornament"/>

              <header className="vk-album-heading">
                <p className="vk-eyebrow" style={{ margin: '0 0 7px' }}>
                  A LITTLE BOOK OF MEMORIES
                </p>
                <h1 className="vk-album-title">Những kỷ niệm đẹp</h1>
                <p className="vk-album-subtitle">A few moments worth keeping.</p>
              </header>

              <div className="vk-grid">
                {Array.from({ length: Math.max(6, PHOTOS.length) }, (_, index) => {
                  const photo = PHOTOS[index];

                  return (
                    <motion.button
                      key={photo ? `${photo.src}-${index}` : `empty-${index}`}
                      type="button"
                      className="vk-polaroid"
                      onClick={() => photo && setSelectedPhoto(photo)}
                      whileTap={{ scale: 0.97 }}
                      aria-label={photo ? `Mở ảnh ${photo.caption}` : 'Khung ảnh kỷ niệm'}
                      disabled={!photo}
                    >
                      <div className="vk-photo-frame">
                        {photo ? (
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            onError={event => {
                              (event.currentTarget as HTMLImageElement).style.opacity = '0.12';
                            }}
                          />
                        ) : (
                          <div className="vk-placeholder">
                            <svg viewBox="0 0 48 48" fill="none">
                              <rect x="7" y="8" width="34" height="31" rx="1" strokeWidth="1.2"/>
                              <circle cx="18" cy="18" r="3.5" strokeWidth="1.2"/>
                              <path d="M9 34L20 24L27 30L32 25L40 33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Ảnh kỷ niệm</span>
                          </div>
                        )}
                      </div>

                      {photo?.date && <span className="vk-photo-date">{photo.date}</span>}
                      <span className="vk-photo-caption">
                        {photo?.caption || 'Ngày tháng đáng nhớ'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <p className="vk-album-note">A few moments worth keeping.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="vk-lightbox"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="vk-lightbox-close"
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Đóng ảnh"
            >
              ×
            </button>

            <motion.img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              initial={{ scale: 0.94, rotate: -2 }}
              animate={{ scale: 1, rotate: -1 }}
              onClick={event => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}