<script lang="ts">
  import Window from "../Window.svelte";
  import Container from "../Container.svelte";
  import Navbar from "../Navbar.svelte";
  import { navLinks, students, Student, getAllStudents } from "../store";

  getAllStudents();
</script>

<title>Student Tracker Dashboard</title>

<Window title={"Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar {navLinks} />
</Window>
