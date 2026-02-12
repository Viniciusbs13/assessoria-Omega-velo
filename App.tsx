
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// --- CASE FILES DATA ---
const CASE_FILES = [
  {
    id: "CF_001",
    client: "Project Scale-X",
    result: "+R$ 1.2M / 30d",
    metric: "ROAS 12.5x",
    tags: ["E-COMMERCE", "ADS"],
    image: "https://images.unsplash.com/photo-1642790103517-1355030e42f9?auto=format&fit=crop&q=80&w=800",
    details: "Implementação de funil de escala vertical e criativos de alta retenção."
  },
  {
    id: "CF_002",
    client: "Authority Lab",
    result: "450k Follows",
    metric: "Engajamento +400%",
    tags: ["PERSONAL", "VIRAL"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    details: "Rebranding completo e estratégia de conteúdo baseada em autoridade técnica."
  },
  {
    id: "CF_003",
    client: "Nexus Fintech",
    result: "-65% CPA",
    metric: "LTV +120%",
    tags: ["DATA", "ADS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    details: "Otimização de algoritmos de conversão e tracking de telemetria avançada."
  }
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle, align = "left" }: { title: string, subtitle?: string, align?: "left" | "right" }) => (
  <div className={`mb-8 md:mb-20 ${align === "right" ? "text-right" : "text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-block"
    >
      <span className="font-oswald text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#00cfc1] mb-2 md:mb-4 block font-bold">
        {subtitle || "Especificação Técnica"}
      </span>
      <h2 className="font-oswald text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase italic leading-[0.8] tracking-tighter drop-shadow-2xl">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : "text-white"}>
            {word}{' '}
          </span>
        ))}
      </h2>
    </motion.div>
  </div>
);

const PortfolioSection = () => {
  const PORTFOLIO_VIDEOS = [
    { id: 1, title: "OMEGA_EDITS_01", category: "UGC / Retenção", url: "https://assets.mixkit.co/videos/preview/mixkit-girl-walking-on-a-pavement-in-the-city-43485-large.mp4" },
    { id: 2, title: "ADS_CONVERSAO_V2", category: "Ads Premium", url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-in-the-street-at-night-42500-large.mp4" },
    { id: 3, title: "DRONE_CINEMATIC", category: "Produção Pro", url: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-from-above-42498-large.mp4" },
    { id: 4, title: "BRAND_VERTICAL_X", category: "Viral Content", url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-43574-large.mp4" },
    { id: 5, title: "SCALE_IDENTITY", category: "Branding", url: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-crowded-city-street-42501-large.mp4" },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-40 bg-[#050505] overflow-hidden select-none">
      <div className="px-5 md:px-10 mb-8 md:mb-16">
        <SectionTitle title="Criativos profissionais" subtitle="Portfólio Vertical" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4 md:pb-8 gap-3">
          <p className="text-white/50 font-oswald text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase font-medium">
            Deslize para explorar
          </p>
          <div className="flex gap-3 items-center">
            <span className="w-6 md:w-12 h-px bg-[#00cfc1]/30" />
            <span className="font-mono text-[7px] md:text-[9px] text-[#00cfc1]/80 animate-pulse font-bold tracking-widest uppercase">Criativos_Impacto_Real</span>
          </div>
        </div>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ left: -1600, right: 0 }}
          className="flex gap-4 md:gap-10 px-5 md:px-10"
        >
          {PORTFOLIO_VIDEOS.map((video) => (
            <motion.div 
              key={video.id}
              className="relative min-w-[200px] sm:min-w-[300px] md:min-w-[400px] aspect-[9/16] bg-[#111] overflow-hidden group border border-white/5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[7px] md:text-[9px] bg-black/80 px-2 py-1 md:px-3 md:py-2 backdrop-blur-md border border-white/10 text-[#00cfc1] font-bold uppercase">
                    R: 9:16 | 4K
                  </div>
                  <div className="font-oswald text-[7px] md:text-[9px] tracking-[0.2em] text-[#00cfc1] bg-black/80 px-2 py-1 border border-[#00cfc1]/30 italic font-bold">
                    {video.category}
                  </div>
                </div>
                <div className="font-oswald text-xl md:text-3xl italic uppercase leading-none tracking-tighter text-white">
                  {video.title}
                </div>
              </div>
              <video src={video.url} muted loop playsInline autoPlay className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CaseFilesSection = () => {
  const [activeFile, setActiveFile] = useState<number | null>(0);

  // Efeito de troca automática a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFile((prev) => (prev === null ? 0 : (prev + 1) % CASE_FILES.length));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="engine" className="py-16 md:py-60 px-5 md:px-10 flex flex-col bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="font-oswald text-[12vw] sm:text-[10vw] lg:text-[10vw] uppercase italic leading-[0.8] tracking-tighter mb-6 md:mb-12">
            THE RESULTS <br /> <span className="text-[#00cfc1] text-glow-teal">VAULT.</span>
          </h2>
          <p className="text-sm md:text-lg font-medium max-w-md text-white/70 mb-8 md:mb-12 leading-relaxed">
            Nossos arquivos de telemetria. Prova real de escala e ROI através da metodologia Omega.
          </p>
          <div className="flex flex-col gap-3 md:gap-5">
            {CASE_FILES.map((file, idx) => (
              <motion.button
                key={file.id}
                onClick={() => setActiveFile(idx)}
                onMouseEnter={() => setActiveFile(idx)}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-4 md:p-6 border-l-2 md:border-l-4 transition-all duration-300 ${activeFile === idx ? 'border-[#00cfc1] bg-white/5' : 'border-white/5'}`}
              >
                <div className="text-left">
                  <span className="font-mono text-[7px] md:text-[9px] text-[#00cfc1] block mb-0.5">{file.id}</span>
                  <span className="font-oswald text-base md:text-2xl uppercase italic text-white tracking-tight">{file.client}</span>
                </div>
                <div className="text-right">
                  <span className="font-oswald text-sm md:text-xl text-[#00cfc1] block">{file.result}</span>
                  <span className="font-mono text-[7px] md:text-[8px] text-white/30 uppercase">{file.metric}</span>
                </div>
              </motion.button>
            ))}
          </div>
          <button className="mt-8 md:mt-12 bg-white text-black font-oswald text-sm md:text-lg px-6 py-3 md:px-12 md:py-4 uppercase tracking-[0.2em] hover:bg-[#00cfc1] transition-colors font-bold w-full sm:w-auto shadow-xl">
            Ver Provas de Escala
          </button>
        </div>

        <div className="relative h-[300px] sm:h-[450px] md:h-[600px] flex items-center justify-center order-1 lg:order-2">
          <AnimatePresence mode='wait'>
            {activeFile !== null ? (
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, x: 100, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -100, rotate: -5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[#0d0d0d] border border-white/10 shadow-2xl flex flex-col p-1 md:p-1.5 z-20"
              >
                {/* Cabecalho da Pasta Style */}
                <div className="bg-white/5 p-2 md:p-4 border-b border-white/10 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/40" />
                  </div>
                  <span className="font-mono text-[7px] md:text-[9px] text-white/30 uppercase tracking-widest truncate max-w-[120px] md:max-w-none">
                    FILE: {CASE_FILES[activeFile].id}_TELEMETRY.JPG
                  </span>
                </div>
                
                <div className="flex-1 overflow-hidden relative group">
                  <img 
                    src={CASE_FILES[activeFile].image} 
                    className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
                    alt="Client Result"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  
                  {/* Overlay de Info */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10">
                    <div className="flex flex-wrap gap-1.5 mb-2 md:mb-4">
                      {CASE_FILES[activeFile].tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 md:px-3 md:py-1 bg-[#00cfc1] text-black font-oswald text-[7px] md:text-[10px] font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-oswald text-xl md:text-4xl uppercase italic text-white mb-1 md:mb-2 drop-shadow-lg">
                      {CASE_FILES[activeFile].result}
                    </h4>
                    <p className="text-white/60 text-[9px] md:text-xs leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none font-medium">
                      {CASE_FILES[activeFile].details}
                    </p>
                  </div>

                  {/* Carimbo de Verificação */}
                  <div className="absolute top-8 right-8 md:top-12 md:right-12 rotate-12 border-2 md:border-4 border-[#00cfc1]/30 p-2 md:p-4 font-oswald text-lg md:text-2xl text-[#00cfc1]/30 uppercase font-black opacity-40 pointer-events-none select-none">
                    VERIFIED_OMEGA
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-white/5 flex items-center justify-center text-center p-6 md:p-10">
                <div className="flex flex-col items-center gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-[#00cfc1]/20 flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#00cfc1] rotate-45" />
                  </div>
                  <span className="font-oswald text-white/20 text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.6em] leading-relaxed">
                    SELECIONE UM ARQUIVO <br /> PARA DESCRIPTOGRAFAR_
                  </span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Restauradas animações de impacto Lando-style
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  const heroSkew = useTransform(smoothProgress, [0, 0.2], [0, -5]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0.2]);

  return (
    <div className="bg-[#050505] text-white font-['Inter'] selection:bg-[#00cfc1] selection:text-black">
      
      {/* UI Frame - Hidden on small screens to maximize space */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-[100] border-[6px] md:border-[10px] border-[#050505]" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[110] p-4 sm:p-6 md:p-8 flex flex-row justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <div className="font-oswald text-lg sm:text-2xl md:text-3xl tracking-tighter italic flex flex-col leading-none">
            <span className="text-[#00cfc1] text-glow-teal">OMEGA</span>
            <span className="text-white">ASSESSORIA</span>
          </div>
        </div>
        <div className="pointer-events-auto flex items-center gap-4 md:gap-10">
          <div className="hidden lg:flex gap-6 font-oswald text-[9px] tracking-[0.2em] uppercase opacity-60 font-bold">
            <a href="#portfolio" className="hover:text-[#00cfc1] transition-colors">Portfolio</a>
            <a href="#strategy" className="hover:text-[#00cfc1] transition-colors">Estratégia</a>
            <a href="#engine" className="hover:text-[#00cfc1] transition-colors">Resultados</a>
          </div>
          <button className="bg-white text-black font-oswald text-[8px] md:text-[10px] px-4 py-1.5 md:px-6 md:py-2.5 uppercase tracking-[0.15em] font-bold hover:bg-[#00cfc1] transition-colors shadow-lg">
            Consultoria
          </button>
        </div>
      </nav>

      <main>
        {/* HERO SECTION - Restaurado SkewY e Movimento Agressivo */}
        <section className="relative h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden px-5">
          <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-10 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          </motion.div>

          <motion.div style={{ y: heroTextY, skewY: heroSkew }} className="relative z-10 text-center">
            <h1 className="font-oswald text-[18vw] sm:text-[14vw] uppercase italic leading-[0.75] tracking-tighter">
              <span className="text-white drop-shadow-xl">BEYOND</span> <br />
              <span className="text-[#00cfc1] text-glow-teal">LIMITS.</span>
            </h1>
            <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 uppercase font-oswald text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] text-white/50 font-medium">
              <span>Performance em Marketing</span>
              <span className="w-6 md:w-10 h-px bg-[#00cfc1]/30 hidden md:block" />
              <span>Assessoria Omega Scale</span>
            </div>
          </motion.div>
        </section>

        <PortfolioSection />

        {/* STRATEGY SECTION */}
        <section id="strategy" className="py-16 md:py-40 px-5 md:px-10 overflow-hidden bg-[#070707]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/3">
                <SectionTitle title="Fórmula Omega" subtitle="Metodologia" />
                <p className="text-white/50 text-sm md:text-base leading-relaxed font-light mb-8 md:mb-10">
                  Sistemas de crescimento que transcendem o marketing comum. Dados, telemetria e psicologia de elite.
                </p>
                <button className="border border-white/10 px-6 py-3 md:px-8 md:py-4 font-oswald text-[9px] md:text-xs uppercase tracking-widest hover:bg-[#00cfc1] hover:text-black hover:border-transparent transition-all font-bold w-full sm:w-auto">
                  Ver Ecossistema
                </button>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                {[
                  { t: "Consultoria", d: "Auditoria de dados e posicionamento tático de elite." },
                  { t: "Audiovisual", d: "Produção profissional com edição cinematográfica." },
                  { t: "Tráfego (ADS)", d: "Foco obsessivo em ROI e captura de Market Share." },
                  { t: "Identity Branding", d: "Construção de autoridade incontestável no nicho." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="p-6 md:p-10 bg-[#050505] transition-colors"
                  >
                    <span className="font-oswald text-[#00cfc1] text-[9px] md:text-xs mb-3 md:mb-5 block font-bold tracking-widest uppercase">{`Modulo_0${i+1}`}</span>
                    <h3 className="font-oswald text-xl md:text-2xl uppercase italic mb-2 md:mb-3 text-white">{item.t}</h3>
                    <p className="text-white/40 text-[10px] md:text-sm leading-relaxed">{item.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENTS SECTION */}
        <section id="clients" className="py-12 md:py-24 border-y border-white/5 relative overflow-hidden bg-black">
          <div className="px-5 md:px-10 mb-8">
            <SectionTitle title="Omega Network" subtitle="Parceiros" />
          </div>
          
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: [0, -1200] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex gap-10 md:gap-20 whitespace-nowrap items-center py-4"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-10 md:gap-20">
                  <span className="font-oswald text-3xl sm:text-5xl md:text-6xl text-white/10 hover:text-[#00cfc1]/50 transition-colors uppercase italic font-bold">BRAND_PARTNER_0{i}</span>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00cfc1]/40 rotate-45" />
                  <span className="font-oswald text-3xl sm:text-5xl md:text-6xl text-white/10 hover:text-[#00cfc1]/50 transition-colors uppercase italic font-bold">CLIENT_RESULT_0{i}</span>
                  <div className="w-6 md:w-10 h-px bg-white/10" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VAULT SECTION - Agora com autoplay de 4s */}
        <CaseFilesSection />

        {/* TELEMETRY SECTION */}
        <section id="telemetry" className="py-16 md:py-40 px-5 md:px-10 bg-[#050505] border-t border-white/5">
          <SectionTitle title="Telemetria Real" subtitle="Métricas" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { label: "Crescimento", value: "+540%", sub: "Escala" },
              { label: "Eficiência", value: "x8.4", sub: "ROAS" },
              { label: "Market Share", value: "Top 1%", sub: "Rank" },
              { label: "Alcance", value: "45M+", sub: "Hits" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ backgroundColor: "rgba(0, 207, 193, 0.05)" }}
                className="bg-[#050505] p-5 md:p-10 transition-colors"
              >
                <h4 className="font-oswald text-[7px] md:text-[9px] text-[#00cfc1] uppercase tracking-[0.2em] mb-4 md:mb-8 font-bold">{stat.label}</h4>
                <div className="font-oswald text-3xl md:text-6xl mb-1 md:mb-2 italic font-bold">{stat.value}</div>
                <p className="text-[7px] md:text-[9px] uppercase tracking-widest text-white/30 font-medium">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 md:py-32 px-5 md:px-10 bg-black">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="font-oswald text-[12vw] sm:text-[10vw] uppercase italic leading-[0.7] tracking-tighter mb-12 md:mb-20">
              PRONTO PARA <br /> <span className="text-[#00cfc1] text-glow-teal">ESCALAR?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-16 font-oswald text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-white/40">
              <a href="#" className="hover:text-[#00cfc1] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#00cfc1] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#00cfc1] transition-colors">WhatsApp</a>
            </div>
            <p className="mt-16 font-mono text-[7px] text-white/20 uppercase tracking-[0.5em]">Omega Velocity © 2024 / All rights reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
