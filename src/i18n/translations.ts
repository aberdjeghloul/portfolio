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
      subtitle: 'Senior .NET Developer | DevOps & AWS | Scrum Master',
      available: 'Available',
      availableDetail: 'permanent or contract',
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
      subtitle: 'Senior .NET Developer | DevOps & AWS | Scrum Master',
      bio1: '22 years of experience in back-end .NET/C# development and agile project delivery, complemented by the Titre Professionnel Administrateur Système DevOps (RNCP level 6 — La Capsule, 2026) and the AWS Certified Solutions Architect – Associate certification (SAA-C03, November 2026).',
      bio2: 'A dual Dev & Ops culture that covers the full software lifecycle: from code to cloud infrastructure on AWS, CI/CD automation and production monitoring. DevOps is not a career change — it\'s a complement.',
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
      subtitle: 'Développeur .NET Senior | DevOps & AWS | Scrum Master',
      available: 'Disponible',
      availableDetail: 'CDI ou mission',
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
      subtitle: 'Développeur .NET Senior | DevOps & AWS | Scrum Master',
      bio1: '22 ans d\'expérience en développement back-end .NET/C# et en pilotage de projets agiles, complétés par le Titre Professionnel Administrateur Système DevOps (RNCP niveau 6 — La Capsule, 2026) et la certification AWS Certified Solutions Architect – Associate (SAA-C03, novembre 2026).',
      bio2: 'Une double culture Dev & Ops qui couvre l\'intégralité du cycle logiciel : du code à l\'infrastructure cloud AWS, en passant par l\'automatisation CI/CD et la supervision en production. Le DevOps n\'est pas une reconversion — c\'est un complément.',
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
