<script lang="ts">
  import { onMount } from "svelte";
  import Window from "../Window.svelte";
  import Container from "../Container.svelte";
  import Navbar from "../Navbar.svelte";
  import { students, getAllStudents, getAllPunchouts } from "../store";
  import StudentContainer from "../StudentContainer.svelte";
  import StudentsContainer from "../StudentsContainer.svelte";

  onMount(async () => {
    students.set(await getAllStudents());
    getAllPunchouts();
  });
</script>

<title>Student Tracker Dashboard</title>

<Window title={"Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar />
  <h1
    class="
    sm:font-bold sm:text-xl
  "
  >
    Students Currently Out:
  </h1>
  <StudentsContainer>
    {#each $students as student}
      {#if student?.currentPunchout !== null}
        <StudentContainer {student} />
      {/if}
    {/each}
  </StudentsContainer>
</Window>
