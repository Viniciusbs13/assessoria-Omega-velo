
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { BrandProfile } from './types';
import { analyzeBrandingFromImage } from './services/geminiService';

// --- DESIGN SYSTEM CONSTANTS ---
const COLORS = {
  black: "#050505",
  accent: "#00cfc1", // Omega Teal
  white: "#ffffff",
  darkGrey: "#111111",
};

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle, align = "left" }: { title: string, subtitle?: string, align?: "left" | "right" }) => (
  <div className={`mb-24 ${align === "right" ? "text-right" : "text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="inline-block"
    >
      <span className="font-oswald text-xs uppercase tracking-[0.5em] text-[#00cfc1] mb-4 block">
        {subtitle || "Especificação Técnica"}
      </span>
      <h2 className="font-oswald text-7xl md:text-9xl uppercase italic leading-[0.8] tracking-tighter">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : ""}>
            {word}{' '}
          </span>
        ))}
      </h2>
    </motion.div>
  </div>
);

// --- PORTFOLIO DATA (VERTICAL 9:16) ---
const PORTFOLIO_VIDEOS = [
  { id: 1, title: "OMEGA_EDITS_01", category: "UGC / Retenção", url: "https://assets.mixkit.co/videos/preview/mixkit-girl-walking-on-a-pavement-in-the-city-43485-large.mp4" },
  { id: 2, title: "ADS_CONVERSAO_V2", category: "Ads Premium", url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-in-the-street-at-night-42500-large.mp4" },
  { id: 3, title: "DRONE_CINEMATIC", category: "Produção Pro", url: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-from-above-42498-large.mp4" },
  { id: 4, title: "BRAND_VERTICAL_X", category: "Viral Content", url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-43574-large.mp4" },
  { id: 5, title: "SCALE_IDENTITY", category: "Branding", url: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-crowded-city-street-42501-large.mp4" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-40 bg-[#050505] overflow-hidden select-none">
      <div className="px-10 mb-20">
        <SectionTitle title="The Motion Vault" subtitle="Protocolo de Conteúdo Vertical" />
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
          <p className="text-white/30 font-oswald text-[10px] tracking-[0.4em] uppercase">
            Arraste para explorar — Frequência 9:16 Portrait
          </p>
          <div className="flex gap-4 items-center">
            <span className="w-12 h-px bg-[#00cfc1]/30" />
            <span className="font-mono text-[8px] text-[#00cfc1] animate-pulse">OPTIMIZED_FOR_MOBILE_RETENTION</span>
          </div>
        </div>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ left: -1600, right: 0 }}
          className="flex gap-10 px-10"
        >
          {PORTFOLIO_VIDEOS.map((video) => (
            <motion.div 
              key={video.id}
              className="relative min-w-[280px] md:min-w-[400px] aspect-[9/16] bg-[#111] overflow-hidden group border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[9px] bg-black/80 px-4 py-2 backdrop-blur-md border border-white/10 leading-relaxed text-[#00cfc1]/70">
                    RATIO: 9:16 <br />
                    RES: 1080x1920 <br />
                    GEAR: 4K_RAW
                  </div>
                  <div className="font-oswald text-[10px] tracking-[0.4em] text-[#00cfc1] bg-black/80 px-3 py-1 border border-[#00cfc1]/20 italic">
                    {video.category}
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 items-start">
                  <div className="w-full h-px bg-[#00cfc1]/20" />
                  <div className="flex justify-between items-center w-full">
                    <div className="font-oswald text-4xl italic uppercase leading-none tracking-tighter">
                      {video.title}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#00cfc1] flex items-center justify-center shrink-0">
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-[#00cfc1] border-b-[5px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              <video 
                src={video.url} 
                muted 
                loop 
                playsInline
                autoPlay
                className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-in-out"
              />
              
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(0,207,193,0.1),rgba(0,207,193,0.02),rgba(0,207,193,0.1))] bg-[size:100%_4px,4px_100%]" />
              
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00cfc1]/0 group-hover:border-[#00cfc1]/50 transition-all" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00cfc1]/0 group-hover:border-[#00cfc1]/50 transition-all" />
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                 <motion.div 
                   animate={{ height: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="w-full bg-[#00cfc1]"
                 />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-20 px-10 flex flex-col md:flex-row justify-between items-center gap-10">
         <div className="flex gap-12 font-mono text-[8px] uppercase tracking-[0.4em] opacity-20">
            <span>BITRATE: 45MBPS</span>
            <span>COLOR: OMEGA_TEAL</span>
            <span>EQUIP: DRONE & PRO CAM</span>
         </div>
         <div className="max-w-xs text-right opacity-30">
            <p className="font-oswald text-[10px] uppercase tracking-widest leading-loose italic">
              "Atenção é a nova moeda. Nossos edits são projetados para máxima retenção em feeds verticais."
            </p>
         </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  const heroSkew = useTransform(smoothProgress, [0, 0.2], [0, -5]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0.3]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      try {
        const result = await analyzeBrandingFromImage(base64);
        setProfile(result);
        document.getElementById('ai-result')?.scrollIntoView({ behavior: 'smooth' });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#050505] text-white font-['Inter'] selection:bg-[#00cfc1] selection:text-black">
      
      {/* UI Elements - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[12px] border-[#050505]" />
      <div className="fixed top-1/2 left-6 -translate-y-1/2 z-[100] hidden lg:block">
        <div className="flex flex-col gap-8 opacity-20 hover:opacity-100 transition-opacity">
          {['01', '02', '03', '04', '05'].map(n => (
            <span key={n} className="font-oswald text-[10px] tracking-widest cursor-pointer hover:text-[#00cfc1]">Ω_{n}</span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-[110] p-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="font-oswald text-4xl tracking-tighter italic flex flex-col leading-none">
            <span className="text-[#00cfc1]">OMEGA</span>
            <span>ASSESSORIA</span>
          </div>
        </div>
        <div className="pointer-events-auto flex gap-12 items-center">
          <div className="hidden md:flex gap-10 font-oswald text-[10px] tracking-[0.4em] uppercase opacity-40">
            <a href="#portfolio" className="hover:opacity-100 transition-opacity">Portfolio</a>
            <a href="#strategy" className="hover:opacity-100 transition-opacity">Estratégia</a>
            <a href="#telemetry" className="hover:opacity-100 transition-opacity">Impacto</a>
            <a href="#engine" className="hover:opacity-100 transition-opacity">Diagnóstico</a>
          </div>
          <button className="bg-white text-black font-oswald text-[10px] px-8 py-3 uppercase tracking-[0.3em] hover:bg-[#00cfc1] transition-colors">
            Falar com Expert
          </button>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-10">
          <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-10 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          </motion.div>

          <motion.div style={{ y: heroTextY, skewY: heroSkew }} className="relative z-10 text-center">
            <h1 className="font-oswald text-[18vw] md:text-[15vw] uppercase italic leading-[0.75] tracking-tighter">
              BEYOND <br />
              <span className="text-[#00cfc1]">LIMITS.</span>
            </h1>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 uppercase font-oswald text-[10px] tracking-[0.5em] opacity-40">
              <span>Alta Performance em Marketing</span>
              <span className="w-12 h-px bg-[#00cfc1]/20 hidden md:block" />
              <span>Assessoria Omega Scale</span>
            </div>
          </motion.div>

          <div className="absolute bottom-20 left-10 font-mono text-[8px] opacity-20 uppercase tracking-widest hidden lg:block">
            LAT: -23.5505 / LONG: -46.6333 <br />
            STATUS: OMEGA_PROTO_ACTIVE
          </div>
        </section>

        {/* MOTION VAULT - VERTICAL RATIO 9:16 */}
        <PortfolioSection />

        {/* TELEMETRY SECTION */}
        <section id="telemetry" className="py-40 px-10 border-y border-white/5">
          <SectionTitle title="Métricas de Escala" subtitle="Telemetria de Resultados" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { label: "Crescimento de Receita", value: "+540%", sub: "Escala Agregada" },
              { label: "Eficiência de Ads", value: "x8.4", sub: "Média de ROAS" },
              { label: "Velocidade de Mercado", value: "Top 1%", sub: "Performance de Segmento" },
              { label: "Alcance Global", value: "45M+", sub: "Impressões/Mês" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ backgroundColor: "rgba(0, 207, 193, 0.05)" }}
                className="bg-[#050505] p-12 group transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#00cfc1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-oswald text-[10px] text-white/30 uppercase tracking-[0.4em] mb-12">{stat.label}</h4>
                <div className="font-oswald text-7xl mb-4 group-hover:text-[#00cfc1] transition-colors italic">{stat.value}</div>
                <p className="text-[10px] uppercase tracking-widest opacity-20">{stat.sub}</p>
                <svg className="absolute bottom-0 left-0 w-full h-12 opacity-10 group-hover:opacity-30 transition-opacity">
                  <motion.path 
                    d="M0 40 Q 50 10 100 40 T 200 40 T 300 40" 
                    fill="none" 
                    stroke="#00cfc1" 
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="strategy" className="py-60 px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-32">
              <div className="lg:w-1/3">
                <SectionTitle title="A Fórmula Omega" subtitle="Nossa Metodologia" />
                <p className="text-white/40 text-lg leading-relaxed font-light mb-12">
                  Arquitetamos sistemas de crescimento que transcendem o marketing comum. Utilizamos tecnologia de ponta, telemetria de dados e psicologia de consumo de elite.
                </p>
                <button className="border border-white/10 px-10 py-5 font-oswald text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Explorar Ecossistema
                </button>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { t: "Consultoria Estratégica", d: "Auditoria de dados e posicionamento. Planejamento tático de elite para escala." },
                  { t: "Produção Audiovisual", d: "Câmeras profissionais, drones e edição motion design para impacto visual absoluto." },
                  { t: "Tráfego Pago (ADS)", d: "Meta, Google e TikTok Ads com foco obsessivo em ROI e captura de Market Share." },
                  { t: "Sites de Conversão", d: "Criação de ecossistemas digitais de alta performance e tecnologia de ponta." },
                  { t: "Treinamento Comercial", d: "Capacitação técnica para transformar leads em clientes fiéis através de processos." },
                  { t: "Branding de Escala", d: "Construção de autoridade incontestável no nicho através de identidade forte." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 border border-white/5 hover:border-[#00cfc1]/30 transition-colors"
                  >
                    <span className="font-oswald text-[#00cfc1] text-xs mb-6 block opacity-40">{`SERVIÇO_${i+1}`}</span>
                    <h3 className="font-oswald text-3xl uppercase italic mb-4">{item.t}</h3>
                    <p className="text-white/30 text-sm leading-relaxed">{item.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI ENGINE SECTION */}
        <section id="engine" className="min-h-screen bg-[#00cfc1] text-black py-40 px-10 flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-oswald text-[12vw] lg:text-[10vw] uppercase italic leading-[0.8] tracking-tighter mb-12">
                OMEGA <br /> ANALYTICS.
              </h2>
              <p className="text-xl font-medium max-w-md opacity-70 mb-12">
                Nossa IA analisa sua imagem e presença para identificar gargalos de branding e potencial de escala imediata.
              </p>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => (document.getElementById('file-input') as HTMLInputElement).click()}
                className="bg-black text-white font-oswald text-2xl px-16 py-8 uppercase tracking-widest hover:skew-x-2 transition-transform"
              >
                {loading ? "Processando..." : "Iniciar Diagnóstico"}
              </motion.button>
              <input id="file-input" type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
            </div>

            <div className="relative aspect-[4/5] bg-black group overflow-hidden border border-black/10">
              <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,black_1px,black_2px)] bg-[size:100%_3px]" />
              </div>
              <AnimatePresence mode="wait">
                {previewImage ? (
                  <motion.img 
                    key="preview"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={previewImage} 
                    className="w-full h-full object-cover grayscale brightness-50" 
                  />
                ) : (
                  <div key="placeholder" className="w-full h-full flex items-center justify-center p-20 text-center">
                    <span className="font-oswald text-white/20 text-xs uppercase tracking-[1em]">Aguardando Entrada de Identidade_</span>
                  </div>
                )}
              </AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-white shadow-[0_0_20px_#00cfc1] z-20"
                />
              )}
            </div>
          </div>
        </section>

        {/* RESULT DISPLAY */}
        <AnimatePresence>
          {profile && (
            <motion.section 
              id="ai-result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-black py-40 px-10 border-b border-white/5"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                  <div className="lg:w-1/2">
                    <span className="font-oswald text-[#00cfc1] text-[10px] tracking-[0.5em] uppercase mb-8 block">Relatório de Diagnóstico</span>
                    <h3 className="font-oswald text-8xl md:text-9xl uppercase italic leading-[0.8] mb-12">{profile.name}</h3>
                    <div className="space-y-8">
                      <div className="p-8 border border-white/10 bg-[#00cfc1]/5">
                        <p className="font-oswald text-2xl italic text-[#00cfc1]">"{profile.tagline}"</p>
                      </div>
                      <p className="text-white/40 leading-relaxed text-lg">{profile.bio}</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                    <div className="p-10 bg-black">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-4">DNA de Personalidade</span>
                      <span className="font-oswald text-xl uppercase italic">{profile.personality}</span>
                    </div>
                    <div className="p-10 bg-black">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-4">Frequência Omega</span>
                      <div className="w-8 h-8 rounded-full shadow-[0_0_15px_#00cfc1]" style={{ backgroundColor: COLORS.accent }} />
                    </div>
                    <div className="p-10 bg-black col-span-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-6">Vetores de Crescimento</span>
                      <div className="flex flex-wrap gap-4">
                        {profile.brandAttributes.map(attr => (
                          <span key={attr} className="px-4 py-2 border border-white/10 font-oswald text-xs uppercase italic tracking-widest hover:border-[#00cfc1]/50 transition-colors cursor-default">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="py-40 px-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="font-oswald text-[12vw] uppercase italic leading-[0.7] tracking-tighter mb-20">
              PRONTO PARA <br /> <span className="text-[#00cfc1]">TRANSCENDER?</span>
            </h2>
            <div className="flex gap-20 font-oswald text-xs tracking-[0.4em] uppercase opacity-40">
              <a href="#" className="hover:text-[#00cfc1] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#00cfc1] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#00cfc1] transition-colors">WhatsApp</a>
            </div>
            <div className="mt-40 pt-10 border-t border-white/5 w-full flex justify-between text-[8px] uppercase tracking-[0.6em] opacity-20">
              <span>Assessoria Omega © 2024</span>
              <span>Engenharia de Performance</span>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        main {
          position: relative;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          h2 {
            font-size: 10vw;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
