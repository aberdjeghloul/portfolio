export type Lang = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      about: 'About',
    },
    hero: {
      subtitle: 'Senior .NET Developer · Titre Pro Administrateur Système DevOps (RNCP 6)',
      aboutMe: 'About me',
    },
    projects: {
      title: 'Projects',
      live: 'Live',
      details: 'Details →',
      back: '← All projects',
    },
    blog: {
      title: 'Blog',
      back: '← All articles',
      readMore: 'Read →',
    },
    about: {
      title: 'About',
      subtitle: 'Senior .NET Developer · Titre Professionnel Administrateur Système DevOps (RNCP 6)',
      bio1: 'Senior .NET developer with 20+ years of experience, holding the Titre Professionnel Administrateur Système DevOps (RNCP level 6 — La Capsule, 2026). A dual expertise that covers the full application lifecycle: from code to infrastructure.',
      bio2: 'DevOps is not a career change — it\'s a complement. Combining deep .NET development skills with cloud infrastructure, CI/CD automation, and production operations on AWS.',
      skills: 'Skills',
      contact: 'Contact',
      groups: {
        cloud: 'Cloud & IaC',
        containers: 'Containers & Orchestration',
        cicd: 'CI/CD & Quality',
        monitoring: 'Monitoring',
        dev: 'Development',
      },
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets',
      blog: 'Blog',
      about: 'À propos',
    },
    hero: {
      subtitle: 'Développeur .NET Senior · Titre Pro Administrateur Système DevOps (RNCP 6)',
      aboutMe: 'À propos',
    },
    projects: {
      title: 'Projets',
      live: 'Live',
      details: 'Détails →',
      back: '← Tous les projets',
    },
    blog: {
      title: 'Blog',
      back: '← Tous les articles',
      readMore: 'Lire →',
    },
    about: {
      title: 'À propos',
      subtitle: 'Développeur .NET Senior · Titre Professionnel Administrateur Système DevOps (RNCP 6)',
      bio1: 'Développeur senior .NET avec 20+ ans d\'expérience, titulaire du Titre Professionnel Administrateur Système DevOps (RNCP niveau 6 — La Capsule, 2026). Une double compétence qui couvre l\'intégralité du cycle de vie d\'une application : du code à l\'infrastructure.',
      bio2: 'Le DevOps n\'est pas une reconversion — c\'est un complément. Maîtrise du développement .NET combinée à l\'infrastructure cloud, l\'automatisation CI/CD et l\'exploitation en production sur AWS.',
      skills: 'Compétences',
      contact: 'Contact',
      groups: {
        cloud: 'Cloud & IaC',
        containers: 'Conteneurs & Orchestration',
        cicd: 'CI/CD & Qualité',
        monitoring: 'Monitoring',
        dev: 'Développement',
      },
    },
  },
};

export function t(lang: Lang) {
  return translations[lang];
}

export const LANGS: Lang[] = ['en', 'fr'];
