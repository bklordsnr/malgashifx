interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-8 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
