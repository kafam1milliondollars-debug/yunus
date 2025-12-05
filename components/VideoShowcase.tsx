
import React, { useState } from 'react';

const videos = [
  {
    id: 1,
    title: "Mageros Prodüksiyon Showreel",
    subtitle: "SİNEMATİK REKLAM & TANITIM",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop", 
    tag: "Prodüksiyon",
    duration: "02:45"
  },
  {
    id: 2,
    title: "E-Ticaret Başarı Hikayesi",
    subtitle: "%400 Büyüme Stratejisi",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop", 
    tag: "Başarı Hikayeleri",
    duration: "08:20"
  },
  {
    id: 3,
    title: "Dijital Ajans Yaşamı",
    subtitle: "Mageros Kreatif Ekibi",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop", 
    tag: "Ajans Günlükleri",
    duration: "15:10"
  }
];

const extraVideos = [
    {
        id: 4,
        title: "Global İhracat Zirvesi",
        subtitle: "Panel Konuşmaları",
        image: "https://images.unsplash.com/photo-1544531696-60c35eb3e77c?q=80&w=2000&auto=format&fit=crop",
        tag: "Etkinlik"
    },
    {
        id: 5,
        title: "Ürün Fotoğrafçılığı Backstage",
        subtitle: "Stüdyo Çekimleri",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop",
        tag: "Kamera Arkası"
    },
    {
        id: 6,
        title: "Web Tasarım Trendleri 2024",
        subtitle: "Tasarım Ekibi İncelemesi",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2000&auto=format&fit=crop",
        tag: "Eğitim"
    }
];

const tags = ["Öne Çıkanlar", "Prodüksiyon", "E-Ticaret", "Web Tasarım", "Başarı Hikayeleri", "Ajans"];

export const VideoShowcase: React.FC = () => {
  const [activeTag, setActiveTag] = useState("Öne Çıkanlar");
  const [playing, setPlaying] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleVideoClick = (id: number) => {
    setPlaying(id);
  };

  const closeVideo = () => setPlaying(null);

  const toggleShowAll = () => {
      setShowAll(!showAll);
  };

  return (
    <section id="stories" className="py-20 bg-[#080808] border-b border-gray-900 transition-all duration-500">
      
      {/* Video Modal Simulation */}
      {playing !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fadeIn" onClick={closeVideo}>
              <div className="bg-gray-900 w-full max-w-5xl aspect-video rounded-2xl relative flex items-center justify-center border border-gray-800 shadow-[0_0_50px_rgba(168,85,247,0.2)]" onClick={e => e.stopPropagation()}>
                  <button onClick={closeVideo} className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors">
                      <span className="material-icons text-4xl">close</span>
                  </button>
                  <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="material-icons text-6xl text-purple-500">play_arrow</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Video Yükleniyor</h3>
                      <p className="text-gray-500 text-sm">Demo modunda video oynatıcı simülasyonu.</p>
                  </div>
              </div>
          </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                    Mageros TV
                </h2>
                <p className="text-gray-400">Markaların dijital dönüşüm hikayelerini ve profesyonel prodüksiyonlarımızı izleyin.</p>
            </div>
            <button 
                onClick={toggleShowAll}
                className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg border border-white/10 transition-colors text-sm font-semibold group"
            >
                {showAll ? 'Daha Az Göster' : 'Tüm Videolar'} 
                <span className={`material-icons text-sm transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}>arrow_forward</span>
            </button>
        </div>

        {/* Tags */}
        <div className="flex overflow-x-auto gap-4 mb-10 pb-4 no-scrollbar">
            <button 
                onClick={() => setActiveTag("Öne Çıkanlar")}
                className={`whitespace-nowrap pb-2 text-sm font-medium border-b-2 transition-colors ${activeTag === "Öne Çıkanlar" ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            >
                Öne Çıkanlar
            </button>
            {tags.filter(t => t !== "Öne Çıkanlar").map((tag) => (
                <button 
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeTag === tag ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'}`}
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto transition-all">
            
            {/* Large Feature Video */}
            <div 
                onClick={() => handleVideoClick(videos[0].id)}
                className="lg:col-span-2 relative group rounded-2xl overflow-hidden cursor-pointer h-[300px] lg:h-[500px] border border-gray-800 hover:border-purple-500/50 transition-all shadow-2xl"
            >
                <img src={videos[0].image} alt={videos[0].title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <svg className="w-10 h-10 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="px-3 py-1 bg-purple-600 text-[10px] font-bold text-white rounded uppercase tracking-wider">
                            {videos[0].tag}
                        </div>
                        <span className="text-gray-400 text-xs flex items-center gap-1"><span className="material-icons text-[10px]">schedule</span> {videos[0].duration}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {videos[0].title}
                    </h3>
                    <p className="text-gray-300 font-medium tracking-wide text-sm opacity-80">
                        {videos[0].subtitle}
                    </p>
                </div>
            </div>

            {/* Right Side Stacked Videos */}
            <div className="flex flex-col gap-6 h-[500px]">
                {videos.slice(1).map((video) => (
                    <div 
                        key={video.id} 
                        onClick={() => handleVideoClick(video.id)}
                        className="relative group rounded-2xl overflow-hidden cursor-pointer flex-1 border border-gray-800 hover:border-purple-500/50 transition-all min-h-[200px]"
                    >
                        <img src={video.image} alt={video.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                            <svg className="w-6 h-6 text-white fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>

                        <div className="absolute bottom-0 left-0 p-5 w-full">
                            <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                                {video.title}
                            </h3>
                            <p className="text-gray-400 text-xs">
                                {video.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Extra Videos Grid (Collapsible) */}
        {showAll && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fadeIn">
                {extraVideos.map((video) => (
                    <div 
                        key={video.id}
                        onClick={() => handleVideoClick(video.id)}
                        className="relative group rounded-2xl overflow-hidden cursor-pointer h-[250px] border border-gray-800 hover:border-purple-500/50 transition-all"
                    >
                        <img src={video.image} alt={video.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20 opacity-0 group-hover:opacity-100">
                             <span className="material-icons text-white">play_arrow</span>
                        </div>

                        <div className="absolute bottom-0 left-0 p-5 w-full">
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1 block">{video.tag}</span>
                            <h3 className="text-lg font-bold text-white mb-0 leading-snug">
                                {video.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Mobile 'Load More' Button */}
        <div className="mt-8 md:hidden text-center">
             <button 
                onClick={toggleShowAll}
                className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold text-sm w-full"
            >
                {showAll ? 'Daha Az Göster' : 'Tüm Videoları Gör'}
            </button>
        </div>

      </div>
    </section>
  );
};
