import { MessageCircle, Target, FileText, Users, Lock, Scale, Briefcase, Settings } from 'lucide-react';

export const sidebarSections = [
  { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
  { id: 'discovery', label: 'Discovery Framework', icon: Target },
  { id: 'documents-checklist', label: 'Required Documents', icon: FileText },
  { id: 'brand-assets', label: 'Brand Assets', icon: Target },
  { id: 'documents', label: 'Brand Documents', icon: FileText },
  { id: 'transcripts', label: 'Meeting Transcripts', icon: Users },
  { id: 'logins', label: 'Client Credentials', icon: Lock },
  { id: 'legal', label: 'Legal & Technical', icon: Scale },
  { id: 'strategy', label: 'ICP & Strategy', icon: Briefcase },
  { id: 'progress', label: 'Onboarding Progress', icon: Settings }
];
