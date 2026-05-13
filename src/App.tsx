import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  MapPin, 
  Phone, 
  Award, 
  Anchor, 
  Factory, 
  Zap, 
  Settings, 
  Globe,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  MessageCircle
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Thank you! Your message has been sent.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-navy">
      {/* Execution/Floating Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
        <a 
          href="https://wa.me/8801975597476" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-gold font-heading font-bold text-xl tracking-wider uppercase">
            A. S. CHOWDHURY
          </span>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-slate-300">
            <a href="#home" className="hover:text-gold transition-colors">Home</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#skills" className="hover:text-gold transition-colors">Competencies</a>
            <a href="#experience" className="hover:text-gold transition-colors">Journey</a>
            <a href="#education" className="hover:text-gold transition-colors">Education</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy border-b border-white/10 px-6 py-8 flex flex-col space-y-6">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Competencies</a>
            <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Journey</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Education</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block border-l-2 border-gold pl-4">
              Executive Showcase
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Md. Abu Sayeed <br />
              <span className="text-gold tracking-tight">Chowdhury</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 font-light max-w-xl">
              Senior Operations Leader & <br className="hidden md:block" />
              <span className="text-white font-medium">Feed Mill Specialist</span>
            </p>
            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed italic border-l border-white/20 pl-6">
              "23+ Years of Excellence in Lean Manufacturing & Project Management across Singapore & Bangladesh."
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <a href="#contact" className="bg-gold text-navy px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-gold/10 flex items-center">
                Contact Form <ChevronRight className="ml-2 w-4 h-4" />
              </a>
              <div className="flex space-x-4">
                <a href="#" className="p-3 border border-white/10 hover:border-gold hover:text-gold transition-all rounded-full">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3 border border-white/10 hover:border-gold hover:text-gold transition-all rounded-full">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-6 border border-gold/10 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
              <div className="absolute -inset-6 border border-white/5 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 delay-100"></div>
              <div className="w-72 h-96 md:w-96 md:h-[520px] overflow-visible relative">
                <img 
                  src="https://i.ibb.co.com/xtsQz5mS/Untitled.png" 
                  alt="Md. Abu Sayeed Chowdhury"
                  className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-gold text-navy font-bold uppercase tracking-widest text-[10px] whitespace-nowrap shadow-xl">
                  Operations Excellence
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="about" className="py-24 bg-[#001a33] px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <Settings size={300} className="rotate-45" />
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <Briefcase className="w-12 h-12 text-gold mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 uppercase tracking-[0.2em]">Executive Summary</h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
              Highly accomplished operations professional with <span className="text-gold font-medium">23 years’ experience</span> in establishing and managing large-scale manufacturing units. 
              Proven track record in leading global workforces of <span className="text-white font-medium">300+ personnel</span>, orchestrating complex projects from inception to commissioning, 
              and maintaining the highest standards of quality, safety, and supply chain efficiency across <span className="text-gold font-medium">Singapore & Bangladesh</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section / By the Numbers */}
      <section className="py-20 bg-navy px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Storage Capacity", val: "42,000 MT", sub: "Silo Management" },
              { label: "Production Rate", val: "48 MT/H", sub: "Operations Excellence" },
              { label: "Global Workforce", val: "300+", sub: "Managed Staff" },
              { label: "Global Footprint", val: "24", sub: "Nationalities Managed" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <span className="text-4xl md:text-5xl font-bold text-gold mb-2 block">{stat.val}</span>
                <span className="text-white font-bold uppercase tracking-widest text-xs mb-1 block">{stat.label}</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Skillset</span>
          <h2 className="text-4xl font-bold text-white uppercase tracking-wider">Core Competencies</h2>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: <Factory />, title: "Feed Mill Ops", desc: "48 MT/H Production Capacity" },
            { icon: <Settings />, title: "Silo Management", desc: "42,000 MT Storage Systems" },
            { icon: <Anchor />, title: "Marine Engineering", desc: "Shipbuilding & Industry Specs" },
            { icon: <Zap />, title: "Power Generation", desc: "Gas & Diesel Generator Ops" },
            { icon: <Briefcase />, title: "Lean Manufacturing", desc: "Process Optimization & Efficiency" },
            { icon: <CheckCircle2 />, title: "Quality Assurance", desc: "FIFO & International Standards" },
            { icon: <Globe />, title: "ERP Ecosystems", desc: "SAP, Oracle, Tally Proficiency" },
            { icon: <Award />, title: "Team Leadership", desc: "Managing 300+ Large Workforce" }
          ].map((skill, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              className="bg-navy border border-white/5 p-8 hover:border-gold/50 transition-all group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(skill.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{skill.title}</h3>
              <p className="text-slate-400 leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Professional Journey (Timeline) */}
      <section id="experience" className="py-24 bg-[#001429] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Career</span>
            <h2 className="text-4xl font-bold text-white uppercase tracking-wider">Professional Journey</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:w-px before:h-full before:bg-white/10 before:top-0">
            {[
              { company: "Astha Feed Industries Ltd.", role: "General Manager (Factory Operation)", period: "2025 - Present", details: "Directing seven factories with 32,000 MT/Month capacity. Managing team of 300+ staff." },
              { company: "Index Agro Industries Ltd.", role: "General Manager (Operation)", period: "2015 - 2025", details: "Managed 48 MT/h capacity plants and 42,000 MT silo management. Completed multiple major projects." },
              { company: "Amrit Global Bangladesh Pvt. Ltd.", role: "Plant In charge", period: "2011 - 2015", details: "Overseeing operations across multiple districts including Dhaka, Mymensingh, and Pabna." },
              { company: "Star Feeds Limited", role: "General Manager (Plant)", period: "2009 - 2011", details: "Managed production capacity of 10 MT/hr. Focused on quality control and staff recruitment." },
              { company: "Jurong Machinery (JSPL), Singapore", role: "Project Supervisor", period: "1998 - 2003", details: "Naval electrical systems, ship distribution, and international maritime safety standards." }
            ].map((exp, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-navy z-10"></div>
                <div className="w-full md:w-[45%] bg-navy p-8 border border-white/5 hover:border-gold/30 transition-all">
                  <span className="text-gold font-bold mb-2 block">{exp.period}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                  <p className="text-slate-300 font-medium mb-4 italic">{exp.role}</p>
                  <p className="text-slate-400">{exp.details}</p>
                </div>
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Proficiency */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-widest border-l-4 border-gold pl-6">Technical Infrastructure</h2>
            <div className="space-y-6">
              {[
                { label: "Extruder Technology (Sinking/Floating)", val: "95%" },
                { label: "PLC & Automated Control Systems", val: "90%" },
                { label: "Generator Engineering (Gas/Diesel)", val: "85%" },
                { label: "ERP Systems (SAP, Oracle, Tally)", val: "92%" },
                { label: "AutoCAD & Technical Drafting", val: "80%" }
              ].map((tech, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 font-medium">{tech.label}</span>
                    <span className="text-gold">{tech.val}</span>
                  </div>
                  <div className="h-1 bg-white/10 w-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: tech.val }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-navy p-10 border border-white/5 relative overflow-hidden"
          >
            <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
            <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-widest">Global Footprint</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Exposed to multicultural work environments, collaborating with teams from over 24 different countries 
              including the USA, UK, Singapore, China, and Japan. International expertise built on rigorous standards 
              established during years of operations in Singapore.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 text-center">
                <span className="text-3xl font-bold text-gold block">24+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Nationalities</span>
              </div>
              <div className="p-4 border border-white/10 text-center">
                <span className="text-3xl font-bold text-gold block">23+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Years Exp.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Philosophy / Quote */}
      <section className="py-24 bg-[#000d1a] relative">
        <div className="max-w-4xl mx-auto px-6 text-center italic">
          <span className="text-6xl text-gold/20 font-serif absolute -top-10 left-10">"</span>
          <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed relative z-10">
            Creative problem-solver who encourages team members to follow the same strategy, 
            ensuring that innovation and efficiency drive every project toward peak performance.
          </p>
          <span className="text-6xl text-gold/20 font-serif absolute -bottom-20 right-10 leading-none">"</span>
        </div>
      </section>

      {/* Education & Continuous Learning */}
      <section id="education" className="py-24 bg-navy px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Academics</span>
            <h2 className="text-4xl font-bold text-white uppercase tracking-wider">Education & Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "PGD in Human Resource Management", 
                year: "2024", 
                inst: "Edupro-UK & ABP", 
                details: "Batch-19, Level 7 Diploma emphasizing leadership and workforce strategy." 
              },
              { 
                title: "PGD in Supply Chain Management", 
                year: "2022", 
                inst: "Bangladesh Skill Bank", 
                details: "Level 7 Qualification focused on logistics and efficient operations." 
              },
              { 
                title: "B.Sc. Engineering in EEE", 
                year: "2011", 
                inst: "America Bangladesh University", 
                details: "Electrical and Electronics Engineering foundation for industrial automation." 
              }
            ].map((edu, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-8 border border-white/5 bg-white/5 hover:translate-y-[-10px] transition-all duration-300"
              >
                <GraduationCap className="text-gold mb-6 w-10 h-10" />
                <span className="text-gold font-bold text-sm block mb-2">{edu.year}</span>
                <h3 className="text-xl font-bold text-white mb-4 uppercase leading-snug">{edu.title}</h3>
                <p className="text-slate-300 font-medium mb-3">{edu.inst}</p>
                <p className="text-slate-500 text-sm">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#000d1a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-widest">Connect for <br /><span className="text-gold">Operational Excellence</span></h2>
            <p className="text-slate-400 mb-12 text-lg">
              Available for strategic consulting, speaking engagements, or professional leadership opportunities 
              within the feed mill and manufacturing sectors globally.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 bg-navy border border-white/10 flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                  <Mail />
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Email Me</span>
                  <p className="text-white font-medium hover:text-gold transition-colors underline cursor-pointer">mdabusayeedchowdhury@gmail.com</p>
                  <p className="text-slate-400 text-sm italic">asha_bdsg@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 bg-navy border border-white/10 flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Call / WhatsApp</span>
                  <p className="text-white font-medium tracking-wide">+880 1975 597476</p>
                  <p className="text-slate-400 text-sm">+880 1712 857733</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 bg-navy border border-white/10 flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                  <Linkedin />
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">LinkedIn Profile</span>
                  <p className="text-white font-medium hover:text-gold transition-colors underline cursor-pointer">linkedin.com/in/md-abu-sayeed-chowdhury</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 bg-navy border border-white/10 flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                  <MapPin />
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Location</span>
                  <p className="text-white font-medium">Dhaka, Bangladesh (Available Globally)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-navy p-10 border border-white/5 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors disabled:opacity-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors disabled:opacity-50" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500">Message</label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors resize-none disabled:opacity-50"
              ></textarea>
            </div>
            
            {submitStatus.message && (
              <div className={`p-4 text-sm ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {submitStatus.message}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-navy font-bold py-5 uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6 bg-navy text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs uppercase tracking-[0.2em]">
          <p>© 2024 Md. Abu Sayeed Chowdhury. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
