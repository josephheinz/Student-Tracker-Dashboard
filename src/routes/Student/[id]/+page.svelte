<script lang="ts">
  import { page } from "$app/stores";
  import { writable, get } from "svelte/store";
  import {
    students,
    Student,
    getAllStudents,
    getPunchoutsByStudentId,
    Punchout,
  } from "../../../store";

  import Window from "../../../Window.svelte";
  import Navbar from "../../../Navbar.svelte";
  import Container from "../../../Container.svelte";
  import PunchoutContainer from "../../../PunchoutContainer.svelte";
  import StudentContainer from "../../../StudentContainer.svelte";
  import { onMount } from "svelte";

  $: ID = Number($page.params.id);

  let student = writable<Student | undefined>(undefined);
  let studentPunchouts = writable<Punchout[]>([]);
  let loading: boolean = true;

  onMount(async () => {
    // Fetch and set the students store
    const fetchedStudents = await getAllStudents();
    students.set(fetchedStudents);

    const $students = get(students);

    if (ID !== undefined) {
      // Find the student by ID
      const foundStudent = $students.find((s) => s.id === ID);
      student.set(foundStudent);

      // Fetch punchouts if the student exists
      if (foundStudent) {
        const punchouts = await getPunchoutsByStudentId(ID);
        studentPunchouts.set(punchouts);
      }
    }
    loading = false;
  });
</script>

<title
  >{$student?.firstName} {$student?.lastName} | Student Tracker Dashboard</title
>

{#if loading}
  <p>Loading...</p>
{:else}
  <Window title={"Student Info Page"}>
    <Navbar />
    <Container>
      <h1
        class="
    sm:font-black sm:text-3xl
    "
      >
        {$student?.firstName}
        {$student?.lastName}
      </h1>
      {#if $student?.currentPunchout !== null}
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
      <span>Age: {$student?.age}</span><br />
      <span>Grade: {$student?.grade}th</span><br />
      <span>Punchouts:</span><br />
      <div class="sm:grid sm:grid-cols-8 sm:gap-2">
        {#each $studentPunchouts as punchout}
          <PunchoutContainer {punchout} />
        {/each}
      </div>
    </Container>
  </Window>
{/if}
