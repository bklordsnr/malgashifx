interface SectionProps {
  title: string;
}

export const SectionHeading: React.FC<SectionProps> = ({ title }) => {
  return <h2 className="text-secondary-foreground font-bold text-xl capitalize">{title}</h2>;
};
