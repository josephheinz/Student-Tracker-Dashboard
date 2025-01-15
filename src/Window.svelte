<script>
  const { title = "Title", id = " ", children } = $props();
</script>

<main
  class="
    relative
    sm:w-11/12 sm:h-11/12 sm:border-4 sm:border-black sm:my-4 sm:mx-auto sm:rounded-md sm:p-4
"
  {id}
>
  <span
    class="
        absolute bg-white p-2 -top-7 left-2 font-bold text-xl
        "
  >
    {title}
  </span>
  {@render children?.()}
</main>
