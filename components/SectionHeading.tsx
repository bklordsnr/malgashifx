interface SectionProps {
  title: string;
}

export const SectionHeading: React.FC<SectionProps> = ({ title }) => {
  return <span className="text-secondary-foreground font-medium text-xl capitalize">{title}</span>;
};
