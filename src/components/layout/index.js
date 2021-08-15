import { Container, Content, Footer } from "./styles/header_footer_template";

export default function HeaderFooterTemplate({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
      <Footer></Footer>
    </Container>
  );
}
