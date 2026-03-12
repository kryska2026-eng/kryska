import { useState } from 'react';
import { Save, User, MapPin, Phone, MessageCircle, Info } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const services = [
  'Acompanhante para eventos', 'Jantar romântico', 'Viagens', 'Pernoite',
  'Final de semana', 'Massagem', 'Namorada de aluguel', 'Striptease'
];

export default function DashboardProfile() {
  const [saved, setSaved] = useState(false);
  const [selectedServices, setSelectedServices] = useState(['Acompanhante para eventos', 'Jantar romântico']);
  const [form, setForm] = useState({
    name: 'Andressa Oliveira',
    age: '25',
    city: 'Ribeirão Preto',
    neighborhood: 'Centro',
    phone: '16999999999',
    whatsapp: '16999999999',
    height: '1,65',
    weight: '55',
    ethnicity: 'Branca',
    hair: 'Castanho',
    eyes: 'Castanhos',
    body: 'Magra',
    schedule: 'Seg-Sex 09h-22h | Sáb-Dom 12h-20h',
    price: 'R$ 300/hora',
    description: 'Olá! Sou a Andressa, tenho 25 anos e sou de Ribeirão Preto. Sou uma pessoa alegre, extrovertida e adoro conhecer pessoas novas. Ofereço um atendimento diferenciado e exclusivo.',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const inp = (label: string, field: keyof typeof form, placeholder?: string) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      <input
        value={form[field]}
        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14,
          border: '1.5px solid #e2e8f0', outline: 'none', color: '#1e293b',
          backgroundColor: '#fff', boxSizing: 'border-box',
          transition: 'border-color 0.15s'
        }}
        onFocus={e => e.target.style.borderColor = '#e11d48'}
        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
      />
    </div>
  );

  const sel = (label: string, field: keyof typeof form, options: string[]) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      <select
        value={form[field]}
        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14,
          border: '1.5px solid #e2e8f0', outline: 'none', color: '#1e293b',
          backgroundColor: '#fff', boxSizing: 'border-box'
        }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24, flexWrap: 'wrap', gap: 12
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>Meu Perfil</h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
              Mantenha suas informações sempre atualizadas
            </p>
          </div>
          <button
            onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12, border: 'none',
              background: saved ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(225,29,72,0.3)', transition: 'all 0.3s'
            }}
          >
            <Save size={16} />
            {saved ? 'Salvo!' : 'Salvar alterações'}
          </button>
        </div>

        {/* Dados pessoais */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Dados pessoais</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
            {inp('Nome artístico', 'name')}
            {inp('Idade', 'age')}
          </div>
        </div>

        {/* Localização */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <MapPin size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Localização</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
            {sel('Cidade', 'city', ['Ribeirão Preto', 'Sertãozinho', 'Cravinhos', 'Jardinópolis', 'Brodowski', 'Dumont', 'Pontal'])}
            {inp('Bairro', 'neighborhood')}
          </div>
        </div>

        {/* Contato */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Phone size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Contato</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
            {inp('Telefone', 'phone', '16999999999')}
            {inp('WhatsApp', 'whatsapp', '16999999999')}
          </div>
        </div>

        {/* Características */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Info size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Características</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
            {inp('Altura', 'height', 'Ex: 1,65')}
            {inp('Peso', 'weight', 'Ex: 55')}
            {sel('Etnia', 'ethnicity', ['Branca', 'Morena', 'Negra', 'Asiática', 'Latina', 'Outra'])}
            {sel('Cabelo', 'hair', ['Loiro', 'Castanho', 'Preto', 'Ruivo', 'Outro'])}
            {sel('Olhos', 'eyes', ['Castanhos', 'Verdes', 'Azuis', 'Pretos', 'Outros'])}
            {sel('Corpo', 'body', ['Magra', 'Atlética', 'Curvilínea', 'Plus Size'])}
          </div>
        </div>

        {/* Serviços */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff1f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <MessageCircle size={18} color="#e11d48" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Serviços oferecidos</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {services.map(s => (
              <button
                key={s}
                onClick={() => toggleService(s)}
                style={{
                  padding: '8px 14px', borderRadius: 20, fontSize: 13,
                  border: `2px solid ${selectedServices.includes(s) ? '#e11d48' : '#e2e8f0'}`,
                  backgroundColor: selectedServices.includes(s) ? '#fff1f5' : '#fff',
                  color: selectedServices.includes(s) ? '#e11d48' : '#64748b',
                  cursor: 'pointer', fontWeight: selectedServices.includes(s) ? 600 : 400,
                  transition: 'all 0.15s'
                }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Horários e preço */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Horários e valores</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
            {inp('Horários de atendimento', 'schedule', 'Ex: Seg-Sex 09h-22h')}
            {inp('Faixa de preço', 'price', 'Ex: R$ 300/hora')}
          </div>
        </div>

        {/* Descrição */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '24px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 24
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Sobre você</h3>
          <textarea
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            rows={5}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 14,
              border: '1.5px solid #e2e8f0', outline: 'none', color: '#1e293b',
              backgroundColor: '#fff', boxSizing: 'border-box', resize: 'vertical',
              lineHeight: 1.6, fontFamily: 'inherit'
            }}
            onFocus={e => e.target.style.borderColor = '#e11d48'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
          <p style={{ margin: '6px 0 0', fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
            {form.description.length}/500 caracteres
          </p>
        </div>

        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 14, border: 'none', width: '100%',
            background: saved ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(225,29,72,0.3)', transition: 'all 0.3s'
          }}
        >
          <Save size={18} />
          {saved ? '✓ Perfil salvo com sucesso!' : 'Salvar alterações'}
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
