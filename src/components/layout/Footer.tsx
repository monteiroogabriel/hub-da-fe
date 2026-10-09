export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-8 border-t border-brand-gold/30">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="mb-6">
          <span className="text-lg font-bold text-brand-gold uppercase tracking-widest">
            HUB da Fé
          </span>
        </div>
        <p className="text-sm text-blue-100 opacity-70 leading-relaxed mb-6">
          Conectando empresários cristãos para prosperar com propósito.
        </p>
        <div className="flex justify-center gap-6 text-xs text-blue-200 opacity-50 mb-6">
          <a href="/termos" className="hover:text-brand-gold transition-colors">Termos</a>
          <a href="/privacidade" className="hover:text-brand-gold transition-colors">Privacidade</a>
        </div>
        <div className="text-[10px] text-blue-300 opacity-40 uppercase tracking-tighter">
          © {new Date().getFullYear()} HUB da Fé • Habilidade União Benchmark
        </div>
      </div>
    </footer>
  );
}
