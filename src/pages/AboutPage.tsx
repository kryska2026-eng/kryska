
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Eye, CheckCircle, Star, Lock, Users, Heart, ArrowRight, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f3 40%, #fef2f2 70%, #fff8f9 100%)',
        borderBottom: '1px solid #fce7f3',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Blob decorativo */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(251,113,133,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="about-hero-inner" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 24
            }}>
              <Heart size={13} color="#f43f5e" fill="#f43f5e" />
              <span style={{ fontSize: 12, color: '#f43f5e', fontWeight: 600, letterSpacing: 0.5 }}>
                SOBRE A KRYSKA
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800,
              lineHeight: 1.15, margin: '0 0 20px', color: '#1a0a10'
            }}>
              A plataforma mais{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                segura e discreta
              </span>{' '}
              de Ribeirão Preto
            </h1>

            <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.75, margin: '0 0 32px' }}>
              A Kryska nasceu com um propósito claro: conectar acompanhantes verificadas com pessoas
              que buscam companhia de qualidade na região de Ribeirão Preto e cidades vizinhas,
              com segurança, discrição e respeito.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/anunciar" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                color: '#fff', padding: '13px 28px', borderRadius: 12,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(244,63,94,0.3)'
              }}>
                Anunciar agora <ArrowRight size={16} />
              </Link>
              <a href="mailto:contato@kryska.com.br" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#f43f5e',
                border: '1.5px solid #fecdd3', padding: '13px 28px',
                borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none'
              }}>
                <Mail size={16} /> Falar conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="about-content-inner">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0
          }}>
            {[
              { num: '500+', label: 'Anunciantes ativas' },
              { num: '20+', label: 'Cidades atendidas' },
              { num: '100%', label: 'Perfis verificados' },
              { num: '24h', label: 'Aprovação de cadastro' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '32px 24px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
              }}>
                <div style={{
                  fontSize: 36, fontWeight: 800, color: '#f43f5e',
                  lineHeight: 1, marginBottom: 8
                }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="about-content-inner" style={{ paddingTop: 64, paddingBottom: 64 }}>

        {/* MISSÃO + DIFERENCIAIS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

          {/* Missão */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: 40,
            border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24
            }}>
              <Heart size={22} color="#f43f5e" fill="#fda4af" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a0a10', margin: '0 0 16px' }}>
              Nossa missão
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, margin: '0 0 16px' }}>
              Ser a principal plataforma de acompanhantes verificadas da região de Ribeirão Preto,
              oferecendo um ambiente seguro, discreto e profissional para anunciantes e visitantes.
            </p>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, margin: 0 }}>
              Acreditamos que a transparência e a verificação de identidade são fundamentais para
              construir confiança e garantir a segurança de todos.
            </p>
          </div>

          {/* Valores */}
          <div style={{
            background: 'linear-gradient(135deg, #1a0a10, #2d0f1e)',
            borderRadius: 20, padding: 40,
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)'
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'rgba(244,63,94,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24
            }}>
              <Star size={22} color="#fb7185" fill="#fb7185" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 24px' }}>
              Nossos valores
            </h2>
            {[
              { label: 'Segurança', desc: 'Verificação obrigatória de todos os perfis' },
              { label: 'Discrição', desc: 'Privacidade garantida para todos' },
              { label: 'Respeito', desc: 'Ambiente livre de julgamentos' },
              { label: 'Qualidade', desc: 'Perfis reais e verificados' },
            ].map((v, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                marginBottom: i < 3 ? 20 : 0
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#f43f5e', flexShrink: 0, marginTop: 6
                }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                    {v.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: 48,
          border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          marginBottom: 24
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.15)',
              borderRadius: 100, padding: '5px 14px', marginBottom: 16
            }}>
              <span style={{ fontSize: 11, color: '#f43f5e', fontWeight: 700, letterSpacing: 0.5 }}>
                PARA ANUNCIANTES
              </span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a0a10', margin: '0 0 12px' }}>
              Como funciona o cadastro
            </h2>
            <p style={{ fontSize: 15, color: '#94a3b8', margin: 0 }}>
              Processo simples, rápido e 100% seguro
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              {
                step: '01', icon: <Users size={22} color="#f43f5e" />,
                title: 'Dados pessoais',
                desc: 'Nome, idade, cidade, WhatsApp e informações do seu perfil'
              },
              {
                step: '02', icon: <Star size={22} color="#f43f5e" />,
                title: 'Fotos e vídeos',
                desc: 'Envie suas melhores fotos. Marca d\'água automática protege seu conteúdo'
              },
              {
                step: '03', icon: <Shield size={22} color="#f43f5e" />,
                title: 'Verificação',
                desc: 'Selfie com documento e foto do documento para confirmar identidade'
              },
              {
                step: '04', icon: <CheckCircle size={22} color="#f43f5e" />,
                title: 'Escolha o plano',
                desc: 'Básico R$49/mês ou Destaque R$99/mês. Ative e comece a receber contatos'
              },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {i < 3 && (
                  <div style={{
                    position: 'absolute', top: 24, left: '60%',
                    width: '80%', height: 1,
                    background: 'linear-gradient(90deg, #fecdd3, transparent)',
                    zIndex: 0
                  }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <span style={{
                      fontSize: 28, fontWeight: 900, color: '#fce7f3', lineHeight: 1
                    }}>{item.step}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a0a10', margin: '0 0 8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEGURANÇA + PRIVACIDADE + VERIFICAÇÃO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
          {[
            {
              icon: <Shield size={24} color="#f43f5e" />,
              bg: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
              title: 'Segurança',
              items: [
                'Verificação de documento obrigatória',
                'OCR automático valida maioridade',
                'Perfis aprovados pela administração',
                'Conteúdo monitorado constantemente'
              ]
            },
            {
              icon: <Lock size={24} color="#7c3aed" />,
              bg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
              title: 'Privacidade',
              items: [
                'Documentos em pasta restrita',
                'Apenas admins têm acesso',
                'Nunca exibido publicamente',
                'Conformidade com a LGPD'
              ]
            },
            {
              icon: <Eye size={24} color="#0891b2" />,
              bg: 'linear-gradient(135deg, #ecfeff, #cffafe)',
              title: 'Transparência',
              items: [
                'Perfis com badge de verificada',
                'Visitantes sabem que é real',
                'Preços e planos claros',
                'Sem taxas ocultas'
              ]
            }
          ].map((card, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: 32,
              border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a0a10', margin: '0 0 20px' }}>
                {card.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {card.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1
                    }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CONTATO */}
        <div style={{
          background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
          borderRadius: 20, padding: 48, textAlign: 'center',
          border: '1px solid #fecdd3', marginBottom: 24
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(244,63,94,0.3)'
          }}>
            <Mail size={26} color="#fff" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a0a10', margin: '0 0 12px' }}>
            Fale conosco
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 28px', lineHeight: 1.7 }}>
            Dúvidas, sugestões ou suporte? Nossa equipe responde em até 24 horas.
          </p>
          <a href="mailto:contato@kryska.com.br" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            color: '#fff', padding: '15px 36px', borderRadius: 14,
            fontWeight: 700, fontSize: 16, textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(244,63,94,0.35)',
            transition: 'transform 0.2s'
          }}>
            <Mail size={18} />
            contato@kryska.com.br
          </a>
        </div>

        {/* AVISO LEGAL */}
        <div style={{
          background: '#fffbeb', borderRadius: 16, padding: '20px 28px',
          border: '1px solid #fde68a', display: 'flex', alignItems: 'flex-start', gap: 14
        }}>
          <div style={{ fontSize: 20, flexShrink: 0 }}>⚠️</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>
              Aviso legal
            </div>
            <p style={{ fontSize: 13, color: '#78350f', margin: 0, lineHeight: 1.7 }}>
              O site <strong>kryska.com.br</strong> é uma plataforma de classificados para adultos maiores de 18 anos.
              Não nos responsabilizamos pelo conteúdo dos anúncios publicados pelas anunciantes.
              Todo o conteúdo é de responsabilidade exclusiva de quem o publica.
              Ao acessar este site, você confirma ter 18 anos ou mais.
            </p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
