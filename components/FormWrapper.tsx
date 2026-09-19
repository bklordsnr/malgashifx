interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col items-center gap-5">{children}</div>
    </div>
  );
};

export default FormWrapper;
