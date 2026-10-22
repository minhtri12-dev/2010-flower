class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

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
      
      // Bắt đầu từ âm lượng 0 và tăng dần rất nhẹ để không gây giật mình
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 3.5);
      this.masterGain.connect(this.ctx.destination);

      // Các tần số tạo hợp âm Fmaj7 trầm ấm, thanh thản (F2, C3, E3, A3)
      const frequencies = [87.31, 130.81, 164.81, 220.0];

      frequencies.forEach((freq, index) => {
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        // Làm lệch nhẹ tần số (detune) để tạo độ dày tự nhiên như tiếng đàn thực
        osc.frequency.setValueAtTime(freq + (index * 0.15), this.ctx.currentTime);

        // Bộ lọc thông thấp để loại bỏ hoàn toàn âm chói
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / frequencies.length, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.masterGain);

        osc.start();
        this.oscillators.push(osc);
      });

      this.isPlaying = true;
    } catch {
      // Nếu trình duyệt chặn hoặc không hỗ trợ, im lặng bỏ qua
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const currentTime = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 1.5);

    setTimeout(() => {
      this.cleanup();
    }, 1600);

    this.isPlaying = false;
  }

  public cleanup(): void {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Bỏ qua nếu đã dừng
      }
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

export const ambientAudio = new AmbientSoundEngine();