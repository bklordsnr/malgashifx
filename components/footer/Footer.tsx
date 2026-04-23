import Container from "../Container";

const Footer = () => {
  return (
    <footer className="border-t w-full py-8">
      <Container>
        <div>
          <div className="text-muted-foreground text-center text-sm ">
            &copy; {new Date().getFullYear()} Malgashi Traders
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
