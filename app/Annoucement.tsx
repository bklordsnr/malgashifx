import Container from "@/components/Container";
import Rate from "./rate";

const News = async () => {
 

  return (
    <div className="bg-primary w-full">
      <Container>
        <div className="flex items-center py-4 justify-center text-primary-foreground">
          <div className="mx-auto text-sm text-start pr-4">
            <Rate />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default News;
