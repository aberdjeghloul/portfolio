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
      subtitle: 'DevOps & Cloud Engineer · Senior .NET Developer · 20+ years experience',
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
      subtitle: 'DevOps & Cloud Engineer · Senior .NET Developer · 20+ years experience',
      bio1: 'Senior software developer with 20+ years of experience in .NET development, now specialised in DevOps and cloud engineering. Passionate about infrastructure automation, CI/CD pipelines, and building resilient cloud architectures.',
      bio2: 'Currently completing a DevOps bootcamp, working on production-grade deployments on AWS with Terraform, Ansible, Docker Swarm, and GitLab CI/CD.',
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
      subtitle: 'Ingénieur DevOps & Cloud · Développeur .NET Senior · 20+ ans d\'expérience',
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
      subtitle: 'Ingénieur DevOps & Cloud · Développeur .NET Senior · 20+ ans d\'expérience',
      bio1: 'Développeur senior avec 20+ ans d\'expérience en développement .NET, spécialisé en ingénierie DevOps et cloud. Passionné par l\'automatisation d\'infrastructure, les pipelines CI/CD et la conception d\'architectures cloud résilientes.',
      bio2: 'En cours de formation DevOps intensive, avec des déploiements en production sur AWS avec Terraform, Ansible, Docker Swarm et GitLab CI/CD.',
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
