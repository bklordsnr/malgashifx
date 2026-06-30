import Container from "../Container";

const Footer = () => {
  return (
    <footer className="border-t w-full py-8">
      <Container>
        <div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground ">
              &copy; {new Date().getFullYear()} Somalia Malgashi
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
