"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

const services = [
  {
    index: "01",
    title: "Transmissão de imóveis",
    topic: "Imóveis",
    description:
      "Acompanhamento documental em compras, vendas, doações, heranças e partilhas.",
    items: ["Compras e vendas", "Doações", "Heranças e partilhas"],
  },
  {
    index: "02",
    title: "Fiscalidade",
    topic: "Outro assunto",
    description:
      "Apoio em obrigações e procedimentos associados a património e sucessões.",
    items: ["Participação de óbitos", "Preenchimento de IRS", "Legalização de prédios"],
  },
  {
    index: "03",
    title: "Contratos",
    topic: "Contratos",
    description:
      "Preparação e análise de contratos, com linguagem clara e atenção ao contexto de cada pessoa.",
    items: ["Arrendamento", "Laboral / trabalho", "Outros contratos"],
  },
  {
    index: "04",
    title: "Registos",
    topic: "Registos",
    description:
      "Tratamento de registos e formalidades para que cada passo fique devidamente documentado.",
    items: ["Predial", "Comercial", "Automóvel"],
  },
  {
    index: "05",
    title: "Atos e documentos",
    topic: "Documentos",
    description:
      "Serviços documentais para particulares e empresas, no escritório ou por marcação.",
    items: [
      "Procurações",
      "Reconhecimento de assinaturas",
      "Certificações e autenticações",
      "Retificações de área",
      "Elaboração de BUPi",
    ],
  },
];

const topics = [
  "Imóveis",
  "Heranças e partilhas",
  "Contratos",
  "Registos",
  "Documentos",
  "Outro assunto",
];

const whatsappBase = "https://wa.me/351917536176";

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");

  const whatsappMessage = useMemo(() => {
    const details = message.trim() ? `\n\n${message.trim()}` : "";
    return `${whatsappBase}?text=${encodeURIComponent(
      `Boa tarde, Dra. Liliana Pereira. Gostaria de pedir informações sobre ${topic.toLowerCase()}.${details}`,
    )}`;
  }, [message, topic]);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        root.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        root.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        root.style.setProperty("--drift-x", `${(x - 0.5) * 18}px`);
        root.style.setProperty("--drift-y", `${(y - 0.5) * 14}px`);
      });
    };

    const onScroll = () => {
      const progress = Math.min(window.scrollY, 900);
      root.style.setProperty("--hero-shift", `${Math.max(progress * -0.045, -40)}px`);
      root.style.setProperty("--orbit-shift", `${Math.min(progress * 0.035, 28)}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) =>
      observer.observe(element),
    );

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="pointer-light" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Liliana Pereira — início">
          <img src="/images/liliana-pereira-logo.jpg" alt="" />
          <span>
            <strong>Liliana Pereira</strong>
            <small>Solicitadora</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#metodo">Como funciona</a>
          <a className="nav-contact" href="#contacto">
            Contacto <ArrowUpRight size={16} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}>
          {[
            ["Sobre", "#sobre"],
            ["Serviços", "#servicos"],
            ["Como funciona", "#metodo"],
            ["Contacto", "#contacto"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
              {label} <ArrowDownRight size={18} />
            </a>
          ))}
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Solicitadoria · Guia, Pombal</p>
          <h1>
            Assuntos jurídicos pedem <em>clareza.</em>
          </h1>
          <p className="hero-intro">
            Acompanhamento próximo, informação compreensível e atenção ao que realmente importa
            em cada decisão.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contacto">
              Expor o meu assunto <ArrowDownRight size={18} />
            </a>
            <a className="text-link" href={`${whatsappBase}?text=${encodeURIComponent("Boa tarde, Dra. Liliana Pereira. Gostaria de marcar uma consulta jurídica.")}`} target="_blank" rel="noreferrer">
              Marcar consulta <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-meta">
            <span><Check size={15} /> Atendimento presencial</span>
            <span><Check size={15} /> Por marcação</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Liliana Pereira, solicitadora">
          <div className="portrait-frame">
            <img
              src="/images/liliana-pereira-profissional-clean.jpg"
              alt="Liliana Pereira, solicitadora"
            />
            <div className="portrait-shade" />
            <div className="portrait-caption">
              <span>Liliana Pereira</span>
              <small>Solicitadora · C. P. 9782</small>
            </div>
          </div>
          <div className="portrait-note">
            <span>Atendimento</span>
            <strong>próximo e claro.</strong>
          </div>
        </div>

        <a className="scroll-cue" href="#sobre" aria-label="Descer para conhecer Liliana Pereira">
          <span>Descobrir</span>
          <ArrowDownRight size={18} />
        </a>
      </section>

      <section className="belief-section" id="sobre">
        <div className="belief-number" aria-hidden="true">01</div>
        <div className="belief-copy" data-reveal>
          <p className="eyebrow">A pessoa antes do processo</p>
          <blockquote>
            “A empatia ajuda a resolver <em>pessoas.</em>”
          </blockquote>
          <p>
            Cada assunto começa por uma história diferente. O primeiro passo é ouvir, perceber o
            contexto e tornar o caminho jurídico mais simples de acompanhar.
          </p>
        </div>

        <div className="belief-photo" data-reveal>
          <img
            src="/images/liliana-pereira-exterior-clean.jpg"
            alt="Liliana Pereira num ambiente exterior"
          />
          <div className="photo-label">
            <span>Guia · Pombal</span>
            <span>Serviços jurídicos</span>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Áreas de intervenção</p>
            <h2>O apoio certo para cada etapa.</h2>
          </div>
          <p>
            Consulte as principais áreas e selecione uma para perceber de que forma pode ser
            acompanhada.
          </p>
        </div>

        <div className="services-list">
          {services.map((service, index) => {
            const isOpen = activeService === index;
            return (
              <article className={`service-item ${isOpen ? "is-open" : ""}`} key={service.title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveService(index)}
                >
                  <span className="service-index">{service.index}</span>
                  <span className="service-title">{service.title}</span>
                  <span className="service-toggle"><ChevronDown size={22} /></span>
                </button>
                <div className="service-detail" aria-hidden={!isOpen}>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href="#contacto" onClick={() => setTopic(service.topic)}>
                    Falar sobre este assunto <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="method-sticky" data-reveal>
          <p className="eyebrow">Como funciona</p>
          <h2>Uma conversa clara desde o primeiro contacto.</h2>
          <p>
            Sem linguagem desnecessariamente complicada. Cada passo é explicado antes de avançar.
          </p>
        </div>

        <div className="method-steps">
          <article data-reveal>
            <span>01</span>
            <div>
              <h3>Ouvir</h3>
              <p>Partilhe o contexto e o que precisa de resolver.</p>
            </div>
          </article>
          <article data-reveal>
            <span>02</span>
            <div>
              <h3>Enquadrar</h3>
              <p>São identificados os documentos, os passos e as prioridades do assunto.</p>
            </div>
          </article>
          <article data-reveal>
            <span>03</span>
            <div>
              <h3>Acompanhar</h3>
              <p>O processo é seguido com proximidade e informação ao longo do percurso.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Primeiro contacto</p>
          <h2>Conte-me o essencial.</h2>
          <p>
            Escolha o tema, acrescente uma nota se desejar e abra a conversa diretamente no
            WhatsApp. Nenhuma informação fica guardada neste website.
          </p>
          <div className="contact-direct">
            <a href="tel:+351917536176"><Phone size={18} /> +351 917 536 176</a>
            <a href="mailto:9782solicitadora@gmail.com"><Mail size={18} /> 9782solicitadora@gmail.com</a>
          </div>
        </div>

        <div className="message-composer" data-reveal>
          <div className="composer-step">
            <span>01</span>
            <p>Qual é o assunto?</p>
          </div>
          <div className="topic-grid" role="group" aria-label="Escolher assunto">
            {topics.map((item) => (
              <button
                type="button"
                key={item}
                className={topic === item ? "is-selected" : ""}
                onClick={() => setTopic(item)}
              >
                {item} {topic === item && <Check size={14} />}
              </button>
            ))}
          </div>

          <label htmlFor="message">
            <span>02</span>
            Conte um pouco mais <small>(opcional)</small>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ex.: Preciso de informações sobre os documentos necessários…"
            rows={4}
          />

          <a className="whatsapp-button" href={whatsappMessage} target="_blank" rel="noreferrer">
            <MessageCircle size={19} /> Abrir conversa no WhatsApp <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section className="visit-section">
        <div className="visit-heading" data-reveal>
          <p className="eyebrow">Atendimento</p>
          <h2>À distância de uma conversa.</h2>
        </div>
        <div className="visit-grid">
          <article data-reveal>
            <Clock3 size={22} />
            <h3>Horário</h3>
            <p>Segunda a sexta<br /><strong>09h — 18h</strong></p>
            <p>Sábado<br /><strong>Por marcação</strong></p>
          </article>
          <article data-reveal>
            <MapPin size={22} />
            <h3>Escritório</h3>
            <p>Av. Nossa Senhora da Guia, 123<br />Escritório 3 · 3105-093 Guia</p>
            <a href="https://www.google.pt/maps/place/Av.+Nossa+Sra.+da+Guia+123/data=!4m7!3m6!1s0xd226a5a5a3835a5:0x14023fdd2b18dd3e!8m2!3d39.9469139!4d-8.7843603!16s%2Fg%2F11csf0_2dt!19sChIJpTU4WlpqIg0RPt0YK90_AhQ?authuser=0&hl=pt-PT&rclk=1" target="_blank" rel="noreferrer">
              Ver no mapa <ArrowUpRight size={15} />
            </a>
          </article>
          <article data-reveal>
            <CalendarDays size={22} />
            <h3>Marcação</h3>
            <p>Escolha o canal mais cómodo para pedir uma consulta jurídica.</p>
            <a href={`${whatsappBase}?text=${encodeURIComponent("Boa tarde, Dra. Liliana Pereira. Gostaria de marcar uma consulta jurídica.")}`} target="_blank" rel="noreferrer">
              Pedir marcação <ArrowUpRight size={15} />
            </a>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/images/liliana-pereira-logo.jpg" alt="" />
          <div><strong>Liliana Pereira</strong><span>Solicitadora</span></div>
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/solicitadora_lilianapereira/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={19} /></a>
          <a href="mailto:9782solicitadora@gmail.com" aria-label="Email"><Mail size={19} /></a>
          <a href={whatsappBase} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={19} /></a>
        </div>
        <p className="concept-note">
          Conceito independente criado a partir de informação pública. Não é o website oficial.
        </p>
      </footer>

      <a className="floating-contact" href={whatsappBase} target="_blank" rel="noreferrer" aria-label="Falar por WhatsApp">
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>
    </main>
  );
}
