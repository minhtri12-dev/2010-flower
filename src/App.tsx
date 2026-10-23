import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Stage = 'LOCK' | 'THRESHOLD' | 'ECHOES' | 'BLOOM';
type BloomPhase = 'BUD' | 'FIRST_LIGHT' | 'BLOOM' | 'QUIET_GLOW';

const PASSCODE = '22102026';

const chapters = [
  {
    number: '01',
    tag: 'THE BEGINNING · 26 MAY',
    title: 'Gặp gỡ',
    paragraphs: [
      'Quen biết Ly thông qua em Đông, vô tình 2 anh em trò chuyện vui vẻ trên Facebook thì có nhắc đến Ly, em Đông cứ kêu " anh thử làm quen xem, chị Ly hiền lắm. Cũng có nhiều người ưng chị nhưng mà chị chưa chịu ai đâu "  và vẫn nhớ như in cái ngày 26 tháng 5, ngày mà cả 2 bắt đầu trò chuyện và tìm hiểu.',
      'Từ Facebook, Instagram đến Locket, Ly đều chấp nhận lời mời kết bạn rất nhanh, hai người cũng bắt đầu nhắn nhiều hơn và kể nhau nghe những câu chuyện thường ngày. Khoảng thời gian đó thì Trí cũng rất muốn đi chơi với Ly nhưng do kẹt học Toeic nên Ly bảo là khi nào Trí học xong thì chúng ta gặp, cảm ơn Ly vì đã đợi Trí trong khoảng thời gian đó.',
      'Khoảnh khắc lần đầu gặp Ly thì Trí đã rung động rồi, tuy dáng người nhỏ nhắn nhưng Ly rất xinh và dịu dàng. Đó là lần đầu Trí có cảm giác rung động một người ngay lúc mới gặp. Cảm ơn Ly rất nhiều vì đã cho Trí biết được cảm giác như thế nó đẹp đẽ nhường nào.',
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
      'Cảm ơn Ly đã tặng Trí chiếc áo sơ mi rất đẹp và khung hình có tấm ảnh Messi mà Trí rất thích. Trí biết những món quà này không phải lựa nhanh cho xong, đó là sự tìm hiểu và tỉ mỉ cả và Trí rất biết ơn về điều đó.',
      'Hộp nến thơm Ly tặng cho Trí, đến giờ Trí vẫn chưa dám dùng, Trí gói lại và đặt trên bàn để mùi hương không bay đi. Dù gì, thì Trí sẽ không dùng món quà này tại vì những kỉ niệm mà Ly tặng Trí luôn giữ bên mình, không bao giờ để nó mất hay trầy xước đâu. Cảm ơn Ly đã mua bánh cho Trí lúc Trí ở quê nha, những món quà và sự chăm chút nhỏ của Ly Trí đều không quên đâu hehe.',
      'Mấy món quà Trí tặng Ly, Trí đều tìm hiểu rất kĩ đó nha, cái áo màu hồng đó phù hợp với Ly lắm, hôm qua Ly mặc thật sự xinh lắm đó, không cần phải lộng lẫy nhưng vẫn toát ra vibe công chúa ˆˆ, cả vòng tay mà Trí tặng cho Ly nữa, dù chúng ta không còn liên lạc nhưng Ly nhớ hãy mang những thứ ấy thường xuyên nhá, vì những món quà Trí lựa chọn tuy không mắc tiền nhưng sẽ rất hợp với Ly lắm.',
    ],
  },
  {
    number: '04',
    tag: 'A QUIET GOODBYE',
    title: 'Những lời chúc tốt đẹp giành cho Ly',
    paragraphs: [
      'Nhưng tình yêu mà, nó phải đến từ 2 phía chứ, đúng không? Thời gian vừa qua, Trí đã cố gắng làm những gì có thể để ghi điểm trong mắt Ly. Ly không nói hôm nay đi làm mệt nhưng Trí luôn biết cảm giác khối lượng công việc mà Ly làm hằng ngày. Thế nên Trí đã ngỏ ý để đặt trà sữa hoặc thức uống khác cho Ly, để Ly có năng lượng hơn trong lúc làm việc. Món quà tuy nhỏ nhưng có thể giúp ít cho Ly để Ly làm việc hiệu quả hơn.',
      'Trí rất muốn hỏi thăm và chăm sóc Ly tận tình hơn, nhưng không biết Ly có nhìn lại mỗi khi Ly nhắn tin cọc không? Trí nhận được những câu đó thì có cảm giác đượm buồn lắm và Trí cũng biết là tính cách của Ly đó giờ vậy, hơi " nhạt " nhưng ở ngoài thì nói chuyện khá vui và dễ gần, vì vậy Trí cũng hiểu. Nhưng sau cái ngày 3/9 ấy, mọi thứ có lẽ vẫn không thay đổi, bản thân Trí cũng đã biết sẽ có ngày hôm nay. Lần này có thể Trí ít buồn hơn, nhưng những kỉ niệm thì sẽ còn rất lâu để quên được đó, Ly biết không? Lần này chắc sẽ không còn cơ hội để quay lại nữa rồi, vì cảm xúc của Ly có lẽ cũng đã đến giới hạn.',
      'Cảm ơn Ly vì đã nói ra những điều thật lòng để Trí có thể ngừng chờ đợi một câu trả lời khác. Trí tôn trọng lựa chọn của Ly và mong những năm tháng phía trước sẽ mang đến cho Ly nhiều niềm vui, sự bình yên và một người thật sự phù hợp với điều Ly mong muốn. Đừng cảm thấy có lỗi khi nói ra những lời đó nữa, hạnh phúc của em là do em chọn mà. ',
    ],
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap');
:root{color-scheme:dark;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;--night:#090e18;--navy:#101a2b;--silver:#f8fafc;--moon:#cbd5e1;--amber:#f2d99a;--amber-soft:rgba(242,217,154,.72)}
*{box-sizing:border-box}html{min-width:320px;background:var(--night);scroll-behavior:smooth}body{margin:0;min-width:320px;min-height:100vh;background:var(--night);color:var(--silver);font-family:'Manrope',sans-serif;font-weight:300}button,input{font:inherit}button{-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible{outline:2px solid rgba(242,217,154,.9);outline-offset:4px}::selection{background:rgba(242,217,154,.22);color:white}
.qg-app{position:relative;isolation:isolate;width:100%;min-height:100vh;min-height:100dvh;overflow-x:clip;background:radial-gradient(ellipse at 50% 14%,rgba(66,79,111,.18),transparent 39%),radial-gradient(ellipse at 50% 85%,rgba(40,37,82,.20),transparent 45%),linear-gradient(180deg,#090e18 0%,#111a2a 52%,#171934 100%)}
.qg-canvas{position:fixed;inset:0;z-index:-1;width:100%;height:100%;pointer-events:none}.qg-atmosphere{position:fixed;inset:0;z-index:-2;overflow:hidden;pointer-events:none}.qg-moon{position:absolute;left:50%;top:7%;width:min(62vw,700px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(218,226,240,.095) 0%,rgba(156,172,198,.035) 34%,transparent 69%);filter:blur(9px)}.qg-ray{position:absolute;top:-24%;left:50%;height:95vh;width:min(16vw,190px);transform:translateX(-50%) rotate(13deg);background:linear-gradient(180deg,rgba(218,226,240,.025),rgba(218,226,240,0));filter:blur(27px);opacity:.8}.qg-horizon-back{position:absolute;inset:auto -5% 0;height:23vh;min-height:130px;background:linear-gradient(180deg,rgba(17,27,42,0),rgba(7,12,20,.76));opacity:.7;clip-path:polygon(0 46%,8% 35%,18% 52%,31% 27%,41% 44%,52% 23%,63% 47%,78% 30%,88% 49%,100% 31%,100% 100%,0 100%)}.qg-horizon-front{position:absolute;inset:auto -5% 0;height:12vh;min-height:75px;background:linear-gradient(180deg,rgba(9,15,24,0),rgba(4,9,15,.95));opacity:.75;clip-path:polygon(0 55%,10% 42%,24% 60%,40% 39%,53% 56%,69% 32%,82% 57%,93% 43%,100% 51%,100% 100%,0 100%)}
.qg-topbar{position:fixed;z-index:30;top:18px;left:20px;right:20px;display:flex;justify-content:space-between;align-items:center;pointer-events:none}.qg-topbar>*{pointer-events:auto}.qg-brand{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,232,240,.42)}.qg-back{border:1px solid rgba(203,213,225,.19);background:rgba(10,15,25,.45);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:rgba(226,232,240,.8);padding:9px 13px;border-radius:999px;cursor:pointer;font-size:11px;transition:all .25s ease}.qg-back:hover{border-color:rgba(242,217,154,.55);color:#fff8e8;background:rgba(255,255,255,.055)}
.qg-shell{position:relative;z-index:1;width:min(100% - 34px,900px);margin:0 auto}.qg-centered{min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:80px 0 48px}.qg-serif{font-family:'Cormorant Garamond',serif;font-weight:400}.qg-eyebrow{font-size:9px;line-height:1.9;letter-spacing:.29em;text-transform:uppercase;color:var(--amber-soft)}
.qg-lock-panel{position:relative;width:min(100%,460px);padding:28px 24px 30px;text-align:center;border:1px solid rgba(203,213,225,.11);background:linear-gradient(150deg,rgba(255,255,255,.035),rgba(255,255,255,.009));box-shadow:0 30px 100px rgba(0,0,0,.22);overflow:hidden}.qg-lock-panel:before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(242,217,154,.54),transparent)}.qg-lock-panel.gate-unlock{box-shadow:0 0 90px rgba(242,217,154,.09),0 28px 90px rgba(0,0,0,.16)}.qg-lock-panel.gate-error{border-color:rgba(210,156,166,.38)}.qg-lock-flower{width:116px;height:140px;margin:0 auto 10px}.qg-lock-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,5vw,39px);line-height:1.1;letter-spacing:-.025em;font-weight:400;margin:0;color:#f7f7f6}.qg-lock-copy{color:rgba(203,213,225,.65);font-size:12px;line-height:1.9;max-width:300px;margin:14px auto 25px}.qg-datebox{position:relative;width:min(100%,344px);margin:0 auto;border-bottom:1px solid rgba(203,213,225,.3);padding:12px 0 14px;transition:border-color .25s ease,box-shadow .25s ease;cursor:text}.qg-datebox:focus-within{border-color:rgba(242,217,154,.85);box-shadow:0 8px 22px -20px rgba(242,217,154,.8)}.qg-datebox.error{border-color:rgba(227,164,176,.8)}.qg-digits{display:flex;justify-content:center;align-items:center;gap:7px;pointer-events:none}.qg-digit-group{display:flex;gap:4px}.qg-digit{width:29px;height:35px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(203,213,225,.12);font-family:'Cormorant Garamond',serif;font-size:24px;color:#e5e7eb;transition:color .2s,border-color .2s,text-shadow .2s}.qg-digit.filled{color:#fff4c8;border-color:rgba(242,217,154,.45);text-shadow:0 0 13px rgba(242,217,154,.24)}.qg-separator{font-size:13px;color:rgba(203,213,225,.42)}.qg-hidden-input{position:absolute;inset:0;z-index:2;width:100%;height:100%;opacity:.015;color:transparent;caret-color:transparent;background:transparent;border:0;outline:0}.qg-date-hint{font-size:9px;letter-spacing:.2em;color:rgba(148,163,184,.55);margin:11px 0 0}.qg-lock-feedback{min-height:24px;margin:15px 0 0;font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;color:rgba(242,217,154,.78)}.qg-lock-feedback.error{color:#e6b8c1}.qg-lock-rule{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:24px}.qg-lock-rule span{height:1px;width:29px;background:rgba(203,213,225,.16)}.qg-lock-rule i{width:4px;height:4px;border-radius:50%;background:var(--amber)}
.qg-welcome{text-align:center;padding:35px 0 45px}.qg-welcome-lily{width:172px;margin:0 auto 7px}.qg-welcome-title{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,7vw,70px);line-height:.98;letter-spacing:-.045em;font-weight:400;margin:0 auto 20px;color:#f7f7f6}.qg-welcome-quote{max-width:630px;margin:0 auto;font-family:'Cormorant Garamond',serif;font-size:clamp(22px,3.6vw,31px);line-height:1.55;color:rgba(238,241,247,.84)}.qg-welcome-quote em{display:block;color:rgba(203,213,225,.59);font-style:italic}.qg-primary-btn{display:inline-flex;align-items:center;justify-content:center;gap:13px;margin-top:34px;min-width:205px;padding:13px 22px;border:1px solid rgba(242,217,154,.38);background:rgba(255,255,255,.025);color:#f8fafc;cursor:pointer;font-size:11px;letter-spacing:.05em;transition:all .3s ease}.qg-primary-btn:hover{border-color:rgba(242,217,154,.78);background:rgba(242,217,154,.06);transform:translateY(-2px)}.qg-btn-arrow{color:var(--amber);font-size:16px}
.qg-progress{position:fixed;z-index:25;top:0;left:0;width:100%;height:2px;background:rgba(203,213,225,.06)}.qg-progress-fill{height:100%;background:linear-gradient(90deg,rgba(203,213,225,.25),rgba(242,217,154,.8));transition:width .15s linear}.qg-letter{width:min(100% - 34px,790px);margin:0 auto;padding:112px 0 95px}.qg-letter-header{text-align:center;max-width:640px;margin:0 auto 74px}.qg-letter-heading{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,7vw,62px);font-weight:400;letter-spacing:-.035em;line-height:1.05;margin:0;color:#f7f7f6}.qg-letter-intro{max-width:500px;margin:19px auto 0;font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;line-height:1.6;color:rgba(203,213,225,.67)}.qg-chapters{position:relative}.qg-chapters:before{content:'';position:absolute;top:9px;bottom:16px;left:23px;width:1px;background:linear-gradient(180deg,transparent,rgba(203,213,225,.2) 7%,rgba(203,213,225,.2) 93%,transparent)}.qg-chapter{position:relative;display:grid;grid-template-columns:48px minmax(0,1fr);gap:22px;margin-bottom:76px}.qg-chapter-marker{position:relative;z-index:1;text-align:center}.qg-chapter-number{width:29px;height:29px;border:1px solid rgba(242,217,154,.32);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#101725;color:rgba(242,217,154,.9);font-family:'Cormorant Garamond',serif;font-size:13px}.qg-chapter-tag{margin:3px 0 15px;font-size:9px;letter-spacing:.17em;line-height:1.8;color:rgba(242,217,154,.7);text-transform:uppercase}.qg-chapter-title{font-family:'Cormorant Garamond',serif;font-size:clamp(31px,5.4vw,46px);line-height:1.1;letter-spacing:-.025em;color:#f7f7f6;font-weight:400;margin:0}.qg-chapter-subtitle{font-family:'Cormorant Garamond',serif;font-style:italic;color:rgba(203,213,225,.57);font-size:18px;line-height:1.6;margin:12px 0 24px}.qg-chapter-divider{height:1px;width:67px;background:linear-gradient(90deg,rgba(242,217,154,.75),transparent);margin-bottom:25px}.qg-paragraph{font-size:13px;line-height:2.15;font-weight:300;letter-spacing:.005em;color:rgba(226,232,240,.77);margin:0 0 20px;overflow-wrap:anywhere}.qg-paragraph:last-of-type{margin-bottom:0}.qg-chapter-flourish{display:flex;align-items:center;gap:10px;margin-top:28px;opacity:.5}.qg-chapter-flourish svg{width:14px;height:14px;stroke:#cbd5e1}.qg-chapter-flourish span{height:1px;width:21px;background:rgba(203,213,225,.5)}.qg-letter-ending{position:relative;text-align:center;margin:8px auto 0;padding-top:52px}.qg-letter-ending:before{content:'';position:absolute;top:0;left:50%;width:1px;height:35px;background:linear-gradient(180deg,rgba(242,217,154,.55),transparent)}.qg-ending-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,4vw,31px);line-height:1.65;font-style:italic;color:rgba(226,232,240,.83);margin:0 auto 28px;max-width:630px}.qg-secondary-btn{border:1px solid rgba(203,213,225,.22);border-radius:999px;background:rgba(255,255,255,.02);color:rgba(248,250,252,.83);padding:12px 20px;cursor:pointer;font-size:11px;letter-spacing:.04em;transition:all .25s ease}.qg-secondary-btn:hover{border-color:rgba(242,217,154,.58);color:#fff7d2;background:rgba(242,217,154,.04)}
.qg-bloom-page{width:min(100% - 34px,860px);min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;margin:0 auto;padding:86px 0 65px}.qg-bloom-content{text-align:center;width:100%}.qg-bloom-title{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,6vw,58px);line-height:1.12;letter-spacing:-.035em;font-weight:400;color:#f7f7f6;margin:0}.qg-bloom-kicker{font-size:9px;letter-spacing:.29em;color:rgba(242,217,154,.75);margin:0 0 13px}.qg-lily-stage{position:relative;min-height:355px;display:flex;align-items:center;justify-content:center;margin:4px auto 0}.qg-lily-stage:before{content:'';position:absolute;width:min(75vw,445px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(200,211,230,.065),rgba(200,211,230,.012) 48%,transparent 70%);pointer-events:none}.qg-bloom-copy{position:relative;z-index:2;max-width:680px;margin:0 auto;padding:0 8px}.qg-bloom-primary{font-family:'Cormorant Garamond',serif;font-size:clamp(23px,4vw,32px);line-height:1.65;color:rgba(248,250,252,.94);margin:12px auto 0}.qg-bloom-secondary{max-width:555px;margin:22px auto 0;color:rgba(203,213,225,.73);font-size:12px;line-height:2;font-weight:300}.qg-bloom-signature{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:rgba(242,217,154,.77);margin:29px 0 0}.qg-bloom-date{font-size:9px;letter-spacing:.16em;color:rgba(148,163,184,.48);margin:29px 0 0}.qg-bloom-rule{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:25px;opacity:.55}.qg-bloom-rule span{width:25px;height:1px;background:rgba(203,213,225,.4)}.qg-bloom-rule i{width:4px;height:4px;border-radius:50%;background:var(--amber)}.qg-bloom-back-row{margin-top:30px}
/* Mobile-safe lily: petals use native SVG transform attributes, not CSS transform-origin. */
.qg-lily{position:relative;flex-shrink:0;width:126px;height:174px;margin:0 auto;filter:drop-shadow(0 0 15px rgba(203,213,225,.055));overflow:visible}.qg-lily.large{width:min(310px,73vw);height:auto;aspect-ratio:280 / 360;min-height:0}.qg-lily svg{display:block;width:100%;height:100%;overflow:visible}.qg-lily .lily-petal{transform-box:fill-box;transform-origin:center;}.qg-lily .lily-petal-shape{stroke:#fff;stroke-opacity:.72;stroke-width:.8}.qg-lily .lily-petal-vein{stroke:#bdc7d7;stroke-opacity:.45;stroke-width:.85;stroke-linecap:round}
@media(max-width:620px){.qg-topbar{top:12px;left:13px;right:13px}.qg-shell{width:calc(100% - 28px)}.qg-centered{padding:72px 0 34px}.qg-lock-panel{padding:24px 15px 24px}.qg-lock-flower{transform:scale(.92);margin-top:-7px;margin-bottom:-1px}.qg-datebox{width:100%}.qg-digits{gap:4px}.qg-digit-group{gap:2px}.qg-digit{width:clamp(21px,6.7vw,29px);height:32px;font-size:22px}.qg-welcome{padding-top:25px}.qg-welcome-lily{width:155px}.qg-welcome-title{font-size:clamp(39px,10vw,56px)}.qg-letter{width:calc(100% - 28px);padding-top:92px;padding-bottom:70px}.qg-letter-header{margin-bottom:50px}.qg-letter-intro{font-size:19px}.qg-chapters:before{left:14px}.qg-chapter{grid-template-columns:30px minmax(0,1fr);gap:13px;margin-bottom:56px}.qg-chapter-number{width:28px;height:28px;font-size:12px}.qg-chapter-tag{font-size:8px;letter-spacing:.12em}.qg-chapter-title{font-size:clamp(29px,7.6vw,38px)}.qg-chapter-subtitle{font-size:16px;margin:10px 0 20px}.qg-paragraph{font-size:12px;line-height:2.08;margin-bottom:16px}.qg-letter-ending{padding-top:43px}.qg-ending-quote{font-size:23px}.qg-bloom-page{width:calc(100% - 28px);padding-top:80px;padding-bottom:42px}.qg-lily-stage{min-height:clamp(255px,76vw,320px)}.qg-lily.large{width:min(246px,68vw);height:auto;aspect-ratio:280 / 360;min-height:0}.qg-bloom-primary{font-size:23px}.qg-bloom-secondary{font-size:12px;line-height:1.95;margin-top:16px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

const AmbientCanvas: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;
    const pointer = { x: -1000, y: -1000 };
    const palette = ['#F2D99A', '#E7EDF6', '#B8C7DC'];
    const count = reducedMotion ? 18 : width < 640 ? 32 : 62;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.45 + 0.35,
      alpha: Math.random() * 0.42 + 0.12,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.11 + 0.025),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.009 + 0.002,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.phase += p.speed;
          p.x += p.vx + Math.sin(p.phase) * 0.08;
          p.y += p.vy;
          if (p.y < -15) p.y = height + 15;
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
        }
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = !reducedMotion && distance < 105 && distance > 0 ? (105 - distance) / 105 * 4 : 0;
        const x = p.x + (distance ? dx / distance * influence : 0);
        const y = p.y + (distance ? dy / distance * influence : 0);
        const radius = p.radius * 3.5;
        const pulse = reducedMotion ? 0.72 : 0.62 + Math.sin(p.phase) * 0.38;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'rgba(248,250,252,0)');
        ctx.save();
        ctx.globalAlpha = p.alpha * pulse;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };
    const animate = () => { draw(); if (!reducedMotion) frame = requestAnimationFrame(animate); };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
    };
  }, [reducedMotion]);

  return <canvas ref={ref} className="qg-canvas" aria-hidden="true" />;
};

/*
 * Mobile fix:
 * Previously petals were rotated with CSS transforms using a pixel transform-origin.
 * On iOS/Safari this origin can be interpreted in CSS pixels rather than viewBox units,
 * especially when the SVG is resized on a phone. Here every petal's rotation is part of
 * the native SVG transform attribute, so its hinge stays at (140, 184) at every size.
 * Bloom is shown by staged opacity and staggered reveals rather than fragile SVG CSS transforms.
 */
const WhiteLily: React.FC<{
  phase: BloomPhase;
  size?: 'small' | 'large';
  reducedMotion: boolean;
}> = ({ phase, size = 'large', reducedMotion }) => {
  const id = useId().replace(/:/g, '');
  const bud = phase === 'BUD';
  const first = phase === 'FIRST_LIGHT';
  const bloom = phase === 'BLOOM' || phase === 'QUIET_GLOW';
  const glow = phase === 'QUIET_GLOW';
  const openOpacity = bud ? 0 : first ? 0.58 : 1;
  const petalAngles = [-66, -43, -19, 19, 43, 66];
  const petalPath = (inner: boolean) => inner
    ? 'M140 184 C116 160 111 120 140 67 C169 120 164 160 140 184 Z'
    : 'M140 184 C108 157 96 104 140 43 C184 104 172 157 140 184 Z';

  return (
    <motion.div
      className={`qg-lily ${size}`}
      role="img"
      aria-label="A white lily"
      animate={reducedMotion ? { rotate: 0 } : { rotate: [0, 0.45, 0, -0.45, 0] }}
      transition={{ duration: 9, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 280 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`${id}-halo`}>
            <stop offset="0" stopColor="#F2D99A" stopOpacity={glow ? 0.28 : 0.08} />
            <stop offset=".48" stopColor="#C6D2E3" stopOpacity=".055" />
            <stop offset="1" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-stem`} x1="140" y1="170" x2="140" y2="355" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#607E68" />
            <stop offset="1" stopColor="#263E34" />
          </linearGradient>
          <linearGradient id={`${id}-petal`} x1="140" y1="43" x2="140" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".54" stopColor="#F2F4F8" />
            <stop offset="1" stopColor="#BBC5D5" />
          </linearGradient>
          <linearGradient id={`${id}-inner`} x1="140" y1="67" x2="140" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".7" stopColor="#F5F6F8" />
            <stop offset="1" stopColor="#D4DAE5" />
          </linearGradient>
          <radialGradient id={`${id}-pollen`}>
            <stop offset="0" stopColor="#FFF4C8" stopOpacity="1" />
            <stop offset="1" stopColor="#F2D99A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="140" cy="135" r={glow ? 115 : bloom ? 96 : 64}
          fill={`url(#${id}-halo)`}
          animate={{ opacity: glow ? 1 : first ? 0.6 : 0.28 }}
          transition={{ duration: reducedMotion ? 0.1 : 1.8 }}
        />

        {/* Stem and leaves */}
        <path d="M140 184 C138 237 142 284 139 352" stroke={`url(#${id}-stem)`} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M140 278 C112 263 87 241 71 211 C100 228 122 250 140 268 Z" fill={`url(#${id}-stem)`} />
        <path d="M140 305 C164 289 189 264 201 235 C176 250 154 274 140 292 Z" fill={`url(#${id}-stem)`} />
        <path d="M139 236 C119 221 106 202 100 185 C120 201 133 216 139 227 Z" fill="#405F4D" />

        {/* The closed bud fades away as the open lily is revealed. */}
        <motion.g
          initial={false}
          animate={{ opacity: bud ? 1 : first ? 0.35 : 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.75 }}
        >
          <path d="M140 185 C115 158 115 115 140 63 C165 115 165 158 140 185 Z" fill={`url(#${id}-petal)`} stroke="#FFFFFF" strokeWidth=".8" />
          <path d="M140 181 C130 154 131 113 140 75 C149 113 150 154 140 181 Z" fill={`url(#${id}-inner)`} />
          <path d="M140 181 Q140 125 140 69" stroke="#C2CAD8" strokeWidth="1" />
        </motion.g>

        {/*
          All petals use SVG's own transform attribute (not CSS rotate).
          This is the key iOS/Safari fix: the rotation pivot uses viewBox units.
        */}
        {petalAngles.map((angle, index) => {
          const inner = index % 2 === 1;
          return (
            <motion.g
              key={angle}
              transform={`rotate(${angle} 140 184)`}
              initial={false}
              animate={{ opacity: openOpacity }}
              transition={{ duration: reducedMotion ? 0.12 : 0.85, delay: reducedMotion ? 0 : first ? index * 0.055 : index * 0.075 }}
            >
              <path
                d={petalPath(inner)}
                fill={`url(#${id}-${inner ? 'inner' : 'petal'})`}
                stroke="#FFFFFF"
                strokeOpacity=".76"
                strokeWidth=".8"
                strokeLinejoin="round"
              />
              <path
                d={inner ? 'M140 178 Q140 126 140 76' : 'M140 178 C138 142 138 93 140 50'}
                stroke="#C2CAD8"
                strokeOpacity=".56"
                strokeWidth=".85"
                strokeLinecap="round"
              />
            </motion.g>
          );
        })}

        {/* Stamens and pistil fade in after the petals begin to open. */}
        <motion.g
          initial={false}
          animate={{ opacity: bloom ? 1 : first ? 0.48 : 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 1.0, delay: reducedMotion ? 0 : 0.12 }}
        >
          <path d="M140 183 C139 154 127 132 111 116" stroke="#E3E7EF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M140 183 C139 152 135 129 130 108" stroke="#E3E7EF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M140 183 C140 153 140 130 140 103" stroke="#F2D99A" strokeWidth="1.45" strokeLinecap="round" />
          <path d="M140 183 C141 152 145 129 150 108" stroke="#E3E7EF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M140 183 C141 154 153 132 169 116" stroke="#E3E7EF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M140 183 C141 157 158 139 178 131" stroke="#E3E7EF" strokeWidth="1.15" strokeLinecap="round" />
          {[
            { x: 111, y: 116, a: -48 },
            { x: 130, y: 108, a: -13 },
            { x: 140, y: 103, a: 0 },
            { x: 150, y: 108, a: 13 },
            { x: 169, y: 116, a: 48 },
            { x: 178, y: 131, a: 62 },
          ].map((s) => (
            <g key={`${s.x}-${s.y}`}>
              <ellipse cx={s.x} cy={s.y} rx="4.2" ry="1.8" transform={`rotate(${s.a} ${s.x} ${s.y})`} fill="#F2D99A" />
              <circle cx={s.x} cy={s.y} r="1.15" fill="#FFF8D8" />
            </g>
          ))}
        </motion.g>

        {/* Soft pollen motes around the open flower. */}
        <motion.g
          initial={false}
          animate={{ opacity: glow ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8 }}
        >
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 16;
            const distance = 32 + (i % 4) * 9;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance * 0.82;
            return (
              <motion.circle
                key={i}
                cx="140" cy="133" r={i % 4 === 0 ? 2.1 : 1.2}
                fill={`url(#${id}-pollen)`}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={glow && !reducedMotion
                  ? { opacity: [0, 0.95, 0], x: dx, y: dy }
                  : { opacity: glow ? 0.38 : 0, x: 0, y: 0 }}
                transition={{ duration: reducedMotion ? 0.1 : 3.2, delay: reducedMotion ? 0 : i * 0.075, repeat: glow && !reducedMotion ? Infinity : 0, repeatDelay: 1.2, ease: 'easeOut' }}
              />
            );
          })}
        </motion.g>
      </svg>
    </motion.div>
  );
};

const DateLock: React.FC<{ reducedMotion: boolean; onSuccess: () => void }> = ({ reducedMotion, onSuccess }) => {
  const [digits, setDigits] = useState('');
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    const value = event.target.value.replace(/\D/g, '').slice(0, 8);
    setDigits(value);
    setError(false);
    setUnlocking(false);
    if (value.length !== 8) return;

    timers.current.push(window.setTimeout(() => {
      if (value === PASSCODE) {
        setUnlocking(true);
        timers.current.push(window.setTimeout(onSuccess, reducedMotion ? 80 : 720));
      } else {
        setError(true);
        timers.current.push(window.setTimeout(() => {
          setDigits('');
          setError(false);
          inputRef.current?.focus();
        }, reducedMotion ? 500 : 950));
      }
    }, reducedMotion ? 0 : 220));
  };

  const digitGroup = (start: number, length: number) => (
    <div className="qg-digit-group">
      {Array.from({ length }, (_, offset) => {
        const index = start + offset;
        return <div key={index} className={`qg-digit ${digits[index] ? 'filled' : ''}`}>{digits[index] || ''}</div>;
      })}
    </div>
  );

  return (
    <motion.section
      className={`qg-lock-panel ${error ? 'gate-error' : ''} ${unlocking ? 'gate-unlock' : ''}`}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', x: error && !reducedMotion ? [-4, 4, -3, 3, 0] : 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: reducedMotion ? 0.15 : 0.8 }}
    >
      <div className="qg-lock-flower"><WhiteLily phase={unlocking ? 'QUIET_GLOW' : 'BUD'} size="small" reducedMotion={reducedMotion} /></div>
      <p className="qg-eyebrow" style={{ margin: '4px 0 9px' }}>A DATE HELD IN MEMORY</p>
      <h1 className="qg-lock-title">Vùng Ký Ức</h1>

      <div className={`qg-datebox ${error ? 'error' : ''}`} onClick={() => inputRef.current?.focus()}>
        <div className="qg-digits" aria-hidden="true">
          {digitGroup(0, 2)}<span className="qg-separator">/</span>{digitGroup(2, 2)}<span className="qg-separator">/</span>{digitGroup(4, 4)}
        </div>
        <input ref={inputRef} className="qg-hidden-input" type="text" inputMode="numeric" autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={8} value={digits} onChange={handleChange} aria-label="Nhập ngày tháng năm gồm tám chữ số" disabled={unlocking} autoFocus />
      </div>
      <p className="qg-date-hint">DD / MM / YYYY</p>
      <AnimatePresence mode="wait">
        <motion.p key={error ? 'error' : unlocking ? 'success' : 'idle'} className={`qg-lock-feedback ${error ? 'error' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {error ? 'Ngày mà cả hai quyết định...' : unlocking ? 'Những dòng tâm sự của bản thân.' : 'Nhập ngày để tiếp tục'}
        </motion.p>
      </AnimatePresence>
      <div className="qg-lock-rule"><span /><i /><span /></div>
    </motion.section>
  );
};

export function App() {
  const reduced = Boolean(useReducedMotion());
  const [stage, setStage] = useState<Stage>('LOCK');
  const [bloomPhase, setBloomPhase] = useState<BloomPhase>('BUD');
  const [showPrimary, setShowPrimary] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const readerEndRef = useRef<HTMLElement | null>(null);
  const bloomTimers = useRef<number[]>([]);

  const clearBloomTimers = () => {
    bloomTimers.current.forEach(window.clearTimeout);
    bloomTimers.current = [];
  };

  useEffect(() => () => clearBloomTimers(), []);

  useEffect(() => {
    if (stage !== 'BLOOM') return;
    clearBloomTimers();
    setBloomPhase('BUD');
    setShowPrimary(false);
    setShowFinal(false);

    if (reduced) {
      setBloomPhase('QUIET_GLOW');
      setShowPrimary(true);
      setShowFinal(true);
      return;
    }

    bloomTimers.current = [
      window.setTimeout(() => setBloomPhase('FIRST_LIGHT'), 1000),
      window.setTimeout(() => setBloomPhase('BLOOM'), 2550),
      window.setTimeout(() => setBloomPhase('QUIET_GLOW'), 4250),
      window.setTimeout(() => setShowPrimary(true), 5100),
      window.setTimeout(() => setShowFinal(true), 7000),
    ];
    return clearBloomTimers;
  }, [stage, reduced]);

  useEffect(() => {
    if (stage !== 'ECHOES') {
      setReadingProgress(0);
      return;
    }
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(height <= 0 ? 100 : Math.max(0, Math.min(100, (window.scrollY / height) * 100)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [stage]);

  const showLetter = (toEnd = false) => {
    if (toEnd) {
      window.setTimeout(() => readerEndRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }), reduced ? 0 : 100);
    }
    setStage('ECHOES');
    if (!toEnd) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const showBloom = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    setStage('BLOOM');
  };

  const goBackToThreshold = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    setStage('THRESHOLD');
  };

  return (
    <main className="qg-app">
      <style>{CSS}</style>
      <div className="qg-atmosphere" aria-hidden="true"><div className="qg-moon" /><div className="qg-ray" /><div className="qg-horizon-back" /><div className="qg-horizon-front" /></div>
      <AmbientCanvas reducedMotion={reduced} />

      {stage !== 'LOCK' && (
        <header className="qg-topbar">
          {stage === 'BLOOM' && <button className="qg-back" type="button" onClick={() => showLetter(true)}>← Return the letter</button>}
          {stage === 'ECHOES' && <button className="qg-back" type="button" onClick={goBackToThreshold}>← First page</button>}
        </header>
      )}

      <AnimatePresence mode="wait">
        {stage === 'LOCK' ? (
          <motion.div key="lock" className="qg-centered qg-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: reduced ? 'none' : 'blur(8px)' }} transition={{ duration: reduced ? 0.15 : 0.75 }}>
            <DateLock reducedMotion={reduced} onSuccess={() => { window.scrollTo({ top: 0, behavior: 'auto' }); setStage('THRESHOLD'); }} />
          </motion.div>
        ) : stage === 'THRESHOLD' ? (
          <motion.div key="threshold" className="qg-centered qg-shell" initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', y: 8 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', y: -5 }} transition={{ duration: reduced ? 0.15 : 0.9 }}>
            <section className="qg-welcome">
              <motion.div className="qg-welcome-lily" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduced ? 0.15 : 1.15 }}>
                <WhiteLily phase="BUD" size="small" reducedMotion={reduced} />
              </motion.div>
              <motion.p className="qg-eyebrow" style={{ margin: '8px 0 24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.25, duration: 0.8 }}>THE QUIET GARDEN OF GRATITUDE</motion.p>
              <motion.h1 className="qg-welcome-title" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.45, duration: 1 }}>Có những đoạn đường</motion.h1>
              <motion.p className="qg-welcome-quote" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.75, duration: 1 }}>
                không đi đến cuối,<em>nhưng vẫn xứng đáng được nhớ bằng những kỉ niệm đẹp.</em>
              </motion.p>
              <motion.button type="button" className="qg-primary-btn" onClick={() => { setStage('ECHOES'); window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.1, duration: 0.75 }}>
                Enter <span className="qg-btn-arrow" aria-hidden="true">↓</span>
              </motion.button>
            </section>
          </motion.div>
        ) : stage === 'ECHOES' ? (
          <motion.div key="echoes" initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(7px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }} transition={{ duration: reduced ? 0.15 : 0.85 }}>
            <div className="qg-progress" aria-hidden="true"><div className="qg-progress-fill" style={{ width: `${readingProgress}%` }} /></div>
            <div className="qg-letter">
              <header className="qg-letter-header">
                <motion.p className="qg-eyebrow" style={{ margin: '0 0 17px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>WORDS FROM WITHIN</motion.p>
                <motion.h1 className="qg-letter-heading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.15 : 0.9 }}>Những dòng tâm tư của bản thân</motion.h1>
                <motion.p className="qg-letter-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.2, duration: 0.9 }}>Không phải để níu giữ, chỉ để trân trọng những điều đẹp đẽ đã trải qua.</motion.p>
              </header>
              <div className="qg-chapters">
                {chapters.map((chapter) => (
                  <motion.section key={chapter.number} className="qg-chapter" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0.15 : 0.8 }}>
                    <div className="qg-chapter-marker"><span className="qg-chapter-number">{chapter.number}</span></div>
                    <div>
                      <p className="qg-chapter-tag">{chapter.tag}</p>
                      <h2 className="qg-chapter-title">{chapter.title}</h2>
                      <div className="qg-chapter-divider" />
                      {chapter.paragraphs.map((paragraph, pIndex) => (
                        <motion.p key={pIndex} className="qg-paragraph" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.15 : 0.65, delay: reduced ? 0 : pIndex * 0.06 }}>{paragraph}</motion.p>
                      ))}
                      <div className="qg-chapter-flourish" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21V11M12 15C6 15 4 10 4 5C9 5 12 8 12 15ZM12 12C12 7 16 3 21 3C21 9 18 12 12 12Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg><span /></div>
                    </div>
                  </motion.section>
                ))}
              </div>
              <motion.footer ref={readerEndRef} className="qg-letter-ending" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.15 : 0.9 }}>
                <p className="qg-ending-quote">“Thật ra, thích em không nằm trong kế hoạch của anh.<br />Cũng giống như việc phải quên em, đó là điều anh chưa từng chuẩn bị.”</p>
                <button className="qg-secondary-btn" type="button" onClick={showBloom}>Final →</button>
              </motion.footer>
            </div>
          </motion.div>
        ) : (
          <motion.div key="bloom" className="qg-bloom-page" initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(9px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: reduced ? 0.2 : 1.1 }}>
            <section className="qg-bloom-content">
              <motion.p className="qg-eyebrow qg-bloom-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Lily Flower</motion.p>
              <motion.h1 className="qg-bloom-title" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.15 : 0.9 }}>Bông hoa đẹp nhất</motion.h1>
              <div className="qg-lily-stage"><WhiteLily phase={bloomPhase} size="large" reducedMotion={reduced} /></div>
              <div className="qg-bloom-copy">
                <AnimatePresence>
                  {showPrimary && <motion.p className="qg-bloom-primary" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: reduced ? 0.15 : 1.1 }}>“Đóa hoa này vốn được chuẩn bị cho một khởi đầu mới. Nay nó nở rộ trọn vẹn để khép lại cho những điều đẹp đẽ. Ly biết không, Đây là hoa Lily mà Trí tạo ra, chỉ giành riêng cho cái tên Ly mà thôi.”</motion.p>}
                </AnimatePresence>
                <AnimatePresence>
                  {showFinal && <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: reduced ? 0.15 : 1.2 }}>
                    <p className="qg-bloom-secondary">Mong rằng những năm tháng phía trước sẽ dịu dàng với Ly,  Nếu một ngày tình cờ Ly tìm được pass và vào được nơi này, mong Ly sẽ nhớ về nó như là một kỉ niệm đẹp của cả hai. Cuối cùng, Trí cũng có thể những chữ này ở nơi đây thôi, " Anh thật sự yêu em lắm, Bùi Yến Ly. "</p>
                    <p className="qg-bloom-signature">May life be gentle with you.</p>
                    <p className="qg-bloom-date">23 10 26 · 03:00 AM</p>
                    <div className="qg-bloom-rule" aria-hidden="true"><span /><i /><span /></div>
                    <div className="qg-bloom-back-row">
                      <button className="qg-secondary-btn" type="button" onClick={() => showLetter(true)}>← Return the letter</button>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
