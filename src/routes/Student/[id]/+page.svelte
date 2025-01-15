<script lang="ts">
  import { page } from "$app/stores";
  $: ID = Number($page.params.id);
  import { students, navLinks, Student } from "../../../store";
  import { getAllStudents } from "../../../store";

  import Window from "../../../Window.svelte";
  import Navbar from "../../../Navbar.svelte";
  import Container from "../../../Container.svelte";
  import StudentContainer from "../../../StudentContainer.svelte";

  getAllStudents();

  let student: Student | undefined;

  // search for the current student
  students.subscribe(($students) => {
    student = $students.find((s) => s.id === ID);
  });
</script>

<title
  >{student?.firstName} {student?.lastName} | Student Tracker Dashboard</title
>

<Window title={"Student Info Page"}>
  <Navbar {navLinks} />
  <Container>
    <h1
      class="
        sm:font-black sm:text-3xl
    "
    >
      {student?.firstName}
      {student?.lastName}
    </h1>
    {#if student?.currentPunchout !== null}
      <h1
        class="
            sm:font-bold sm:text-lg sm:text-red-500
        "
      >
        Out
      </h1>
    {:else}
      <h1
        class="
            sm:font-bold sm:text-lg sm:text-green-500
        "
      >
        In
      </h1>
    {/if}
    <span>Age: {student?.age}</span><br />
    <span>Grade: {student?.grade}th</span>
  </Container>
</Window>
