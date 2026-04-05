const FormWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="h-full flex justify-center md:justify-start">
        <div className="max-w-[400px] w-full flex flex-col gap-5 items-center">
            {children}
        </div>
    </div>
  )
}

export default FormWrapper