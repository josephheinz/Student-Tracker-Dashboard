<script>
    import Container from "./Container.svelte";
    const { children } = $props();
</script>

<Container>
    <div class="
        sm:w-full sm:h-full sm:grid sm:grid-cols-5 sm:gap-2
    ">
        {@render children?.()}
    </div>
</Container>