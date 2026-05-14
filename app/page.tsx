'use client'

import { useState } from 'react'
import { translations, type Language } from '@/lib/translations'
import { WeldingSparks } from '@/components/welding-sparks'
import {
  Wallet,
  CalendarDays,
  Clock,
  Bus,
  Home,
  FileText,
  Check,
  Phone,
  Mail,
  MapPin,
  Users,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'

export default function GrimosLanding() {
  const [lang, setLang] = useState<Language>('sk')
  const t = translations[lang]

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const trackContact = () => {
    // Meta Pixel
    if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq('track', 'Contact')
    }
    // Google Ads
    if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag('event', 'conversion', {
        'send_to': 'YOUR_GOOGLE_TAG_ID/YOUR_CONVERSION_LABEL',
        'event_category': 'Lead',
        'event_label': 'WhatsApp click'
      })
    }
  }

  const trackLead = () => {
    // Meta Pixel
    if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq('track', 'Lead')
    }
    // Google Ads
    if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag('event', 'conversion', {
        'send_to': 'YOUR_GOOGLE_TAG_ID/YOUR_CONVERSION_LABEL',
        'event_category': 'Lead',
        'event_label': 'Mam zaujem button'
      })
    }
  }

  const whatsappUrl = 'https://wa.me/421910344428?text=Zaujima%20ma%20pozicia%20zvaraca'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const phone = formData.get('phone')
    const email = formData.get('email')
    const experience = formData.get('experience')

    // Track Lead event in Meta Pixel
    if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq('track', 'Lead')
    }
    // Track Lead event in Google Ads
    if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag('event', 'conversion', {
        'send_to': 'YOUR_GOOGLE_TAG_ID/YOUR_CONVERSION_LABEL',
        'event_category': 'Lead',
        'event_label': 'Zvárač prihlaska'
      })
    }

    const subject = encodeURIComponent(`Prihláška - ${name}`)
    const body = encodeURIComponent(
      `Meno: ${name}\nTelefón: ${phone}\nEmail: ${email}\n\nSkúsenosti:\n${experience}`
    )
    window.location.href = `mailto:grimos@grimos.sk?subject=${subject}&body=${body}`
  }

  const offerIcons = [Wallet, CalendarDays, Clock, Bus, Home, FileText]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <div className="bg-[#1A1A1A] text-white text-[13px] py-2 px-4 text-center">
        {t.topbar}
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Slogan */}
            <div className="flex items-center gap-3">
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
                {t.nav.logo}
              </span>
              <span className="hidden sm:inline-block text-muted-foreground text-sm">
                — {t.nav.slogan}
              </span>
            </div>

            {/* Phone + Language Switcher */}
            <div className="flex items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackContact}
                className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                <span className="text-sm font-medium">{t.nav.phone}</span>
              </a>
              <div className="flex gap-1">
                {(['sk', 'ua', 'ru'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                      lang === l
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Welding Animation */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden">
        {/* Background Welding Animation */}
        <div className="absolute inset-0 z-0">
          <WeldingSparks />
        </div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-[#1A1A1A]/40 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded mb-4">
              {t.hero.badge}
            </span>
            <h1 className="font-heading text-4xl lg:text-[52px] font-bold text-white leading-tight mb-4">
              {t.hero.title}
            </h1>
            <p className="text-[17px] text-white/80 mb-6">
              {t.hero.subtitle}
            </p>
            <div className="mb-6">
              <span className="font-heading text-[48px] font-bold text-white whitespace-nowrap">
                {t.hero.salary}
              </span>
              <span className="text-white/70 text-lg ml-1">
                {t.hero.salaryPeriod}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => { trackLead(); scrollToForm(); }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackContact}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded font-medium hover:bg-white/10 transition-colors"
              >
                {t.hero.whatsapp}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {t.hero.response}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Čo ponúkame */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.offers.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.offers.items.map((item, index) => {
              const Icon = offerIcons[index]
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-[6px] p-6 shadow-sm"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 2 - Koľko zarobíš */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.earnings.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Standard */}
            <div className="bg-card border border-border rounded-[6px] p-6 shadow-sm">
              <p className="text-foreground font-medium mb-1">{t.earnings.standard.label}</p>
              <p className="text-primary font-medium mb-2">{t.earnings.standard.hours}</p>
              <p className="font-heading text-3xl font-bold text-foreground whitespace-nowrap">
                {t.earnings.standard.salary}
              </p>
            </div>
            {/* Active */}
            <div className="bg-card border border-border border-t-[3px] border-t-primary rounded-[6px] p-6 shadow-sm">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded mb-2">
                {t.earnings.active.badge}
              </span>
              <p className="text-foreground font-medium mb-1">{t.earnings.active.label}</p>
              <p className="text-primary font-medium mb-2">{t.earnings.active.hours}</p>
              <p className="font-heading text-3xl font-bold text-foreground whitespace-nowrap">
                {t.earnings.active.salary}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-center">{t.earnings.note}</p>
        </div>
      </section>

      {/* Section 3 - Čo potrebuješ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.requirements.title}
          </h2>
          <ul className="space-y-4 mb-8">
            {t.requirements.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-[#FDF2F2] border-l-[3px] border-primary p-4 rounded-r-[6px]">
            <p className="text-foreground">{t.requirements.infoBox}</p>
          </div>
        </div>
      </section>

      {/* Section 4 - Bývanie nie je problém */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.housing.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex items-center">
              <p className="text-muted-foreground italic">{t.housing.note}</p>
            </div>
            <div className="space-y-4">
              {t.housing.items.map((item, index) => {
                const icons = { home: Home, users: Users, mapPin: MapPin }
                const Icon = icons[item.icon as keyof typeof icons]
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-[6px] p-4 shadow-sm flex items-center gap-4"
                  >
                    <Icon className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-foreground">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - 3 kroky */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.steps.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.items.map((step, index) => (
              <div key={index} className="relative">
                <span className="absolute -top-4 -left-2 font-heading text-[120px] font-bold text-foreground/5 select-none pointer-events-none">
                  {step.number}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 - Prihláste sa */}
      <section id="contact" className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[34px] font-bold text-foreground border-l-[3px] border-primary pl-4 mb-10">
            {t.contact.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                {t.contact.questions}
              </h3>
              <p className="text-muted-foreground mb-8">{t.contact.questionsText}</p>
              <div className="space-y-4">
                <a
                  href="tel:+421910344428"
                  onClick={trackContact}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  {t.contact.phone}
                </a>
                <a
                  href="mailto:grimos@grimos.sk"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  {t.contact.email}
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t.contact.location}
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-card border border-border rounded-[6px] p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t.contact.form.name}*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-input rounded-[6px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent invalid:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t.contact.form.phone}*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-input rounded-[6px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent invalid:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-input rounded-[6px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t.contact.form.experience}
                  </label>
                  <textarea
                    name="experience"
                    rows={4}
                    placeholder={t.contact.form.experiencePlaceholder}
                    className="w-full px-4 py-2 border border-input rounded-[6px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="gdpr"
                    required
                    className="mt-1 accent-primary"
                  />
                  <label className="text-sm text-muted-foreground">
                    {t.contact.form.gdpr}*
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-[6px] font-medium hover:bg-primary/90 transition-colors"
                >
                  {t.contact.form.submit}
                </button>
              </form>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-sm">— {t.contact.form.or} —</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackContact}
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 rounded-[6px] font-medium hover:bg-whatsapp/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t.contact.form.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading text-xl font-bold mb-2">{t.footer.company}</p>
          <p className="text-white/70 mb-6">{t.footer.tagline}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 mb-6">
            <a href="mailto:grimos@grimos.sk" className="hover:text-white transition-colors">
              {t.footer.email}
            </a>
            <span>|</span>
            <a href="tel:+421910344428" className="hover:text-white transition-colors">
              {t.footer.phone}
            </a>
            <span>|</span>
            <span>{t.footer.location}</span>
          </div>
          <p className="text-white/50 text-sm">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
