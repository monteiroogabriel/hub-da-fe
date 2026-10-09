import { Search, ArrowRight, Briefcase, Heart, Scale, Palette, Megaphone, Settings } from 'lucide-react';
import Image from 'next/image';

const POPULAR_SERVICES = [
  { id: 'contabilidade', name: 'Contabilidade', icon: <Briefcase size={24} /> },
  { id: 'juridico', name: 'Jurídico', icon: <Scale size={24} /> },
  { id: 'design', name: 'Design & Marca', icon: <Palette size={24} /> },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone size={24} /> },
  { id: 'coaching', name: 'Mentoria', icon: <Heart size={24} /> },
  { id: 'gestao', name: 'Gestão', icon: <Settings size={24} /> },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-background min-h-screen px-6 pt-8 pb-12 overflow-x-hidden">

      {/* Header / Brand Area */}
      <div className="flex items-center gap-3 mb-10">
        <div className="relative w-10 h-10">
          <Image
            src="https://i.imgur.com/GrXdnFi.png"
            alt="HUB da Fé Logo"
            fill
            className="rounded-full object-cover shadow-sm"
          />
        </div>
        <span className="text-2xl font-bold tracking-tighter text-brand-navy uppercase font-serif">
          HUB <span className="text-brand-gold">da</span> Fé
        </span>
      </div>

      {/* Main Hero Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold leading-tight text-brand-navy mb-4 font-serif">
          Encontre Profissionais <br/>
          <span className="text-brand-gold">Qualificados</span> Perto de Você
        </h1>

        <p className="text-zinc-600 text-base leading-relaxed mb-8">
          Conectando você a prestadores de serviço confiáveis e alinhados ao propósito do Reino.
        </p>

        {/* Search Bar - SkillLink Style */}
        <div className="relative w-full">
          <div className="flex items-center px-4 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 focus-within:border-brand-gold transition-all duration-300 group">
            <Search className="text-zinc-400 group-focus-within:text-brand-gold transition-colors" size={20} />
            <input
              type="text"
              placeholder="Qual serviço você precisa?"
              className="w-full bg-transparent px-3 py-1 text-zinc-900 focus:outline-none placeholder:text-zinc-400 text-base"
            />
          </div>
        </div>
      </section>

      {/* Popular Services Grid */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-brand-navy mb-6 font-serif">Serviços Populares</h2>

        <div className="grid grid-cols-2 gap-4">
          {POPULAR_SERVICES.map((service) => (
            <button
              key={service.id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all duration-300 group"
            >
              <div className="text-brand-navy group-hover:text-brand-gold transition-colors mb-3">
                {service.icon}
              </div>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-brand-navy transition-colors">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA - Join as Professional */}
      <section className="mt-auto">
        <button className="w-full bg-brand-navy text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2">
          Cadastre-se como Profissional <ArrowRight size={20} />
        </button>
        <p className="text-center text-zinc-400 text-xs mt-4">
          Faça parte da maior rede de negócios cristãos.
        </p>
      </section>
    </div>
  );
}
