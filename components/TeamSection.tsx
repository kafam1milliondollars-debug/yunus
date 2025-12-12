
import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: "Emre Yılmaz",
    role: "Ajans Başkanı & Stratejist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    social: "linkedin"
  },
  {
    id: 2,
    name: "Selin Kara",
    role: "Kreatif Direktör",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    social: "dribbble"
  },
  {
    id: 3,
    name: "Mert Demir",
    role: "Senior Yazılım Geliştirici",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    social: "github"
  },
  {
    id: 4,
    name: "Ayşe Çelik",
    role: "Dijital Pazarlama Uzmanı",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    social: "instagram"
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">KİMİZ BİZ?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Markanızın Arkasındaki <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Güçlü Ekip</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Her biri alanında uzman, tutkulu ve yaratıcı zihinler. Başarınız için birlikte çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group relative">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] border border-slate-100 bg-slate-50 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-300 font-medium">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};