<script lang="ts">
  import Window from "../Window.svelte";
  import Container from "../Container.svelte";
  import Navbar from "../Navbar.svelte";
  import { navLinks, students, Student, getAllStudents } from "../store";
  import StudentContainer from "../StudentContainer.svelte";
  import StudentsContainer from "../StudentsContainer.svelte";

  getAllStudents();
</script>

<title>Student Tracker Dashboard</title>

<Window title={"Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar {navLinks} />
  <h1 class="
    sm:font-bold sm:text-xl
  ">Students Currently Out:</h1>
  <StudentsContainer>
    {#each $students as student}
      {#if student?.currentPunchout !== null}
        <StudentContainer {student}/>
      {/if}
    {/each}
  </StudentsContainer>
</Window>
