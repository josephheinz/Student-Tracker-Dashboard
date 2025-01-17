<script lang="ts">
  import Window from "../../Window.svelte";
  import StudentsContainer from "../../StudentsContainer.svelte";
  import StudentContainer from "../../StudentContainer.svelte";
  import Navbar from "../../Navbar.svelte";
  import { students, getAllStudents, getAllPunchouts } from "../../store";
  import { onMount } from "svelte";

  onMount(async () => {
    students.set(await getAllStudents());
    getAllPunchouts();
  });
</script>

<title>Students | Student Tracker Dashboard</title>

<Window title={"Students | Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar />
  <StudentsContainer>
    {#each $students as student}
      <StudentContainer {student} />
    {/each}
  </StudentsContainer>
</Window>
