<script lang="ts">
  import Window from "../../Window.svelte";
  import StudentsContainer from "../../StudentsContainer.svelte";
  import StudentContainer from "../../StudentContainer.svelte";
  import Navbar from "../../Navbar.svelte";
  import { navLinks, students, Student } from "../../store";
</script>

<title>Students | Student Tracker Dashboard</title>

<Window title={"Students | Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar {navLinks} />
  <StudentsContainer>
    {#each $students as student}
      <StudentContainer {student} />
    {/each}
  </StudentsContainer>
</Window>
