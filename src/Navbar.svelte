<script>
  const { links } = $props();
</script>

<nav
  class="
        sm:w-full sm:h-fit sm:flex sm:justify-start sm:items-center sm:gap-2 sm:mb-4
    "
>
  {#each links as link}
    <a 
    href={link.href}
    class="underline text-sm"
    >{link.text}</a>
  {/each}
</nav>
