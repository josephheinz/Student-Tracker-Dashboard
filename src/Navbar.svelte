<script>
  import { navLinks } from "./store";
</script>

<nav
  class="
        sm:w-full sm:h-fit sm:flex sm:justify-start sm:items-center sm:gap-2 sm:mb-4
    "
>
  {#each $navLinks as link}
    <a href={link.href} class="underline text-sm">{link.text}</a>
  {/each}
</nav>
