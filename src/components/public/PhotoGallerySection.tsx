import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { FotoGaleria } from '../../types';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Car, Sparkles } from 'lucide-react';

export const PhotoGallerySection: React.FC = () => {
  const { galeria } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePhoto, setActivePhoto] = useState<FotoGaleria | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as Fotos' },
    { id: 'veiculos', label: 'Veículos de Treinamento' },
    { id: 'aulas', label: 'Aulas Práticas' },
    { id: 'pista', label: 'Pista e Baliza' },
    { id: 'instrutora', label: 'Atendimento' }
  ];

  const filteredPhotos = galeria.filter(foto =>
    selectedCategory === 'todos' ? true : foto.categoria === selectedCategory
  );

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Estrutura e Treinamento na Prática</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeria de Fotos
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Conheça nossos veículos de instrução homologados com duplo comando, a área de treinamento de baliza e o ambiente acolhedor das aulas.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map(foto => (
            <div
              key={foto.id}
              onClick={() => setActivePhoto(foto)}
              className="group relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200 relative">
                <img
                  src={foto.imagemUrl}
                  alt={foto.titulo}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">
                    {foto.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {foto.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.imagemUrl}
                  alt={activePhoto.titulo}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                    {activePhoto.categoria}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activePhoto.titulo}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activePhoto.descricao}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
