<script lang="ts">
  import { page } from "$app/stores";
  import { writable, get } from "svelte/store";
  import { getPunchoutById, Punchout } from "../../../store";

  import Window from "../../../Window.svelte";
  import Navbar from "../../../Navbar.svelte";
  import Container from "../../../Container.svelte";
  import StudentContainer from "../../../StudentContainer.svelte";
  import { onMount } from "svelte";

  $: ID = Number($page.params.id);
  let punchout = writable<Punchout | null>(null);

  onMount(async () => {
    punchout.set(await getPunchoutById(ID));
  });
</script>

<title>Punchout #{ID} | Student Tracker Dashboard</title>

<Window title={"Punchout Info Page"}>
  <Navbar />
  <Container>
    {#if $punchout !== null}
      <span>Punchout ID: {$punchout.id}</span>
    {/if}
  </Container>
</Window>
