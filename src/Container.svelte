<script>
  const { children } = $props();
</script>

<div
  class="
        sm:border-4 sm:border-black sm:rounded-md sm:p-4 sm:m-1
    "
>
  {@render children?.()}
</div>
