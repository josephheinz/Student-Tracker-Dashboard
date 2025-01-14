<script>
  import Window from "../Window.svelte";
  import Container from "../Container.svelte";
  import Navbar from "../Navbar.svelte";
  const links = [{ href: "#tracker-main", text: "Home" }];
</script>

<Window title={"Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar {links} />
  <Container>asdf</Container>
</Window>
