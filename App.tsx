import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Play, Zap, Palette, BarChart3, Shield, Menu, X } from 'lucide-react';
import Hls from 'hls.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** HLS Video Component */
const HLSVideo = ({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={className}
      style={style}
    />
  );
};

/** BlurText Animation Component */
const BlurText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/** Navbar Component */
const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="https://picsum.photos/seed/omega-logo/48/48" alt="Logo" className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
        </div>

        {/* Pill Nav */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-6 py-2 gap-8">
          {[
            { name: "Início", id: "home" },
            { name: "Serviços", id: "servicos" },
            { name: "Portfólio", id: "portfolio" },
            { name: "Processo", id: "processo" },
            { name: "Preços", id: "precos" }
          ].map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center">
          <button className="bg-white text-black rounded-full px-6 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-all">
            Fale Conosco <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

/** Hero Section */
const Hero = () => {
  return (
    <section className="relative h-[1000px] w-full overflow-visible bg-black flex flex-col items-center pt-[150px]">
      {/* Background Video */}
      <div className="absolute top-[20%] inset-x-0 w-full h-auto z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain opacity-40"
          poster="https://picsum.photos/seed/hero-fallback/1920/1080"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
        </video>
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Badge */}
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-8 flex items-center gap-2">
          <span className="bg-white text-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Novo</span>
          Apresentando o web design impulsionado por IA.
        </div>

        {/* Heading */}
        <BlurText 
          text="O Site que Sua Marca Merece" 
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px] mb-8 max-w-4xl"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body font-light text-white/60 text-sm md:text-base max-w-xl mb-12"
        >
          Design deslumbrante. Performance extrema. Construído por IA, refinado por especialistas. Isso é web design, reimaginado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="liquid-glass-strong rounded-full px-8 py-4 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-all">
            Começar Agora <ArrowUpRight size={18} />
          </button>
          <button className="text-white font-medium flex items-center gap-2 hover:opacity-80 transition-all">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Play size={16} fill="white" />
            </div>
            Ver Portfólio
          </button>
        </motion.div>
      </div>

      {/* Partners Bar */}
      <div className="mt-auto w-full pb-8 pt-16 flex flex-col items-center gap-8 relative z-10">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/60 font-body">
          Parceiros de confiança
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((partner) => (
            <span key={partner} className="text-2xl md:text-3xl font-heading italic text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/** How It Works Section */
const HowItWorks = () => {
  return (
    <section id="processo" className="relative min-h-[700px] w-full py-32 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Background HLS Video */}
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-8">
          Como Funciona
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          Você sonha. Nós entregamos.
        </h2>
        <p className="font-body font-light text-white/60 text-sm md:text-base mb-12 max-w-2xl mx-auto">
          Compartilhe sua visão. Nossa IA cuida do resto—wireframes, design, código, lançamento. Tudo em dias, não meses.
        </p>
        <button className="liquid-glass-strong rounded-full px-8 py-4 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-all mx-auto">
          Começar Agora <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
};

/** Features Chess Section */
const FeaturesChess = () => {
  return (
    <section id="servicos" className="py-24 px-6 md:px-16 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Capacidades
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Recursos Pro. Complexidade Zero.
          </h2>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h3 className="text-3xl font-heading italic text-white mb-6">Feito para converter. Criado para performar.</h3>
            <p className="font-body font-light text-white/60 text-sm mb-8">
              Cada pixel é intencional. Nossa IA estuda o que funciona nos melhores sites do mundo—e constrói o seu para superar todos eles.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-all">
              Saiba Mais
            </button>
          </div>
          <div className="liquid-glass rounded-2xl overflow-hidden aspect-video">
            <img src="https://picsum.photos/seed/feature1/800/450" alt="Feature 1" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="lg:order-2">
            <h3 className="text-3xl font-heading italic text-white mb-6">Fica mais inteligente. Automaticamente.</h3>
            <p className="font-body font-light text-white/60 text-sm mb-8">
              Seu site evolui sozinho. A IA monitora cada clique e conversão—otimizando em tempo real. Sem atualizações manuais. Nunca.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-all">
              Veja como funciona
            </button>
          </div>
          <div className="lg:order-1 liquid-glass rounded-2xl overflow-hidden aspect-video">
            <img src="https://picsum.photos/seed/feature2/800/450" alt="Feature 2" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
  );
};

/** Features Grid Section */
const FeaturesGrid = () => {
  const cards = [
    { icon: <Zap size={20} />, title: "Dias, não Meses", desc: "Do conceito ao lançamento em um ritmo que redefine velocidade." },
    { icon: <Palette size={20} />, title: "Obsessivamente Refinado", desc: "Cada detalhe considerado. Cada elemento polido ao extremo." },
    { icon: <BarChart3 size={20} />, title: "Feito para Converter", desc: "Layouts informados por dados. Decisões baseadas em performance." },
    { icon: <Shield size={20} />, title: "Seguro por Padrão", desc: "Proteção de nível empresarial incluída em cada projeto." }
  ];

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Por que nós?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            A diferença está nos detalhes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 hover:bg-white/[0.03] transition-colors group">
              <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-heading italic text-white mb-4">{card.title}</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Stats Section */
const Stats = () => {
  const stats = [
    { value: "200+", label: "Sites lançados" },
    { value: "98%", label: "Satisfação" },
    { value: "3.2x", label: "Mais conversões" },
    { value: "5 dias", label: "Entrega média" }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background HLS Video */}
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" 
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">{stat.value}</div>
              <div className="text-white/60 font-body font-light text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Testimonials Section */
const Testimonials = () => {
  const items = [
    { name: "Sarah Chen", role: "CEO Luminary", quote: "Uma reconstrução completa em cinco dias. O processo guiado por IA é mágico, mas o refinamento humano é o que o torna elite." },
    { name: "Marcus Webb", role: "Head of Growth Arcline", quote: "Conversões aumentaram 4x desde o lançamento. As otimizações de performance acontecem em tempo real, o que é um divisor de águas." },
    { name: "Elena Voss", role: "Brand Director Helix", quote: "Eles não apenas projetaram nosso site; eles reimaginaram toda a nossa presença digital com um nível de craft que eu nunca tinha visto antes." }
  ];

  return (
    <section id="depoimentos" className="py-24 px-6 md:px-16 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Depoimentos
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            O que dizem sobre nós.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 flex flex-col justify-between h-full">
              <p className="text-white/80 font-body font-light text-lg italic mb-8 leading-relaxed">
                "{item.quote}"
              </p>
              <div>
                <div className="text-white font-body font-medium text-sm">{item.name}</div>
                <div className="text-white/50 font-body font-light text-xs">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 3D Portfolio Section */
const Portfolio3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const projects = [
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4", title: "E-commerce Premium", category: "Design & Dev" },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4", title: "SaaS Dashboard", category: "UI/UX" },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4", title: "Agência de IA", category: "Full Experience" }
  ];

  return (
    <section id="portfolio" ref={containerRef} className="py-32 px-6 bg-black perspective-1000 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Nosso Trabalho
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Criado para o futuro.
        </h2>
      </div>

      <motion.div 
        style={{ rotateX: springRotateX, rotateY: springRotateY, scale }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {projects.map((project, i) => (
          <motion.div 
            key={i} 
            initial={{ y: 0 }}
            whileInView={{ y: i % 2 === 0 ? -20 : 20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="liquid-glass rounded-3xl overflow-hidden aspect-[9/16] relative group"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            >
              <source src={project.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h4 className="text-2xl font-heading italic text-white mb-2">{project.title}</h4>
              <p className="text-white/60 text-sm font-body font-light">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/** CTA Footer Section */
const CTAFooter = () => {
  return (
    <section id="precos" className="relative py-48 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background HLS Video */}
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          Seu próximo site começa aqui.
        </h2>
        <p className="font-body font-light text-white/60 text-lg mb-12 max-w-xl mx-auto">
          Agende uma consultoria gratuita. Veja o que o design impulsionado por IA pode fazer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="liquid-glass-strong rounded-full px-10 py-5 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-all">
            Agendar Reunião <ArrowUpRight size={20} />
          </button>
          <button className="bg-white text-black rounded-full px-10 py-5 font-medium hover:bg-white/90 transition-all">
            Ver Planos
          </button>
        </div>

        <footer className="mt-48 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-xs font-body font-light">© 2026 Assessoria Omega. Studio</div>
          <div className="flex items-center gap-8">
            {["Privacidade", "Termos", "Contato"].map((link) => (
              <a key={link} href="#" className="text-white/40 text-xs font-body font-light hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
};

/** Pricing Section */
const Pricing = () => {
  const plans = [
    { name: "Starter", price: "R$ 4.900", features: ["Landing Page IA", "Design Premium", "SEO Básico", "5 Dias de Entrega"] },
    { name: "Pro", price: "R$ 8.900", features: ["Site Multi-página", "E-commerce IA", "SEO Avançado", "Suporte Prioritário"], popular: true },
    { name: "Enterprise", price: "Sob Consulta", features: ["Soluções Customizadas", "Integrações Complexas", "Gestão de Dados", "SLA Dedicado"] }
  ];

  return (
    <section id="precos" className="py-24 px-6 md:px-16 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Preços
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Planos para cada escala.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={cn(
              "liquid-glass rounded-3xl p-8 flex flex-col h-full border border-white/5",
              plan.popular && "border-white/20 bg-white/[0.02]"
            )}>
              <div className="mb-8">
                <h3 className="text-2xl font-heading italic text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-heading italic text-white">{plan.price}</div>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="text-white/60 text-sm font-body font-light flex items-center gap-2">
                    <Zap size={14} className="text-white/40" /> {feature}
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full py-4 rounded-full font-medium transition-all",
                plan.popular ? "bg-white text-black hover:bg-white/90" : "liquid-glass-strong text-white hover:bg-white/5"
              )}>
                Escolher {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** FAQ Section */
const FAQ = () => {
  const questions = [
    { q: "Quanto tempo leva para o site ficar pronto?", a: "Nossa média de entrega para landing pages é de 5 dias úteis após a aprovação do conceito." },
    { q: "Como a IA é utilizada no processo?", a: "Usamos IA para gerar wireframes, otimizar o código para performance e criar layouts baseados em dados de conversão." },
    { q: "O site é fácil de atualizar?", a: "Sim, entregamos com um CMS intuitivo para que você possa fazer alterações rápidas sem depender de código." },
    { q: "Vocês oferecem suporte pós-lançamento?", a: "Sim, todos os nossos planos incluem suporte e manutenção para garantir que seu site continue performando." }
  ];

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9]">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-6">
          {questions.map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-6">
              <h3 className="text-lg font-heading italic text-white mb-4">{item.q}</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Main App Component */
const App: React.FC = () => {
  return (
    <main className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesChess />
      <FeaturesGrid />
      <Stats />
      <Portfolio3D />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTAFooter />
    </main>
  );
};

export default App;
