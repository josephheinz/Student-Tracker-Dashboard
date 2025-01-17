<script lang="ts">
  const { punchout } = $props();

  const punchoutDate: Date = new Date(punchout.timeout);
  const punchoutBackDate: Date = new Date(punchout.timeback);
  const punchoutTimeDifference: number =
    Math.abs(punchoutDate.getTime() - punchoutBackDate.getTime()) / 1000;
  const punchoutDateFormat: string = `${punchoutDate.getFullYear()}/${punchoutDate.getMonth() + 1}/${punchoutDate.getDate()}`;
  const durationString: string = `${Math.floor(punchoutTimeDifference / 60)}m ${Math.floor(punchoutTimeDifference % 60)}s`;
</script>

<a
  class="
        sm:border-4 sm:border-black sm:rounded-md sm:py-2 sm:px-4 sm:m-1 sm:w-full sm:inline-block sm:flex sm:flex-col sm:justify-stretch sm:items-center sm:gap-1 sm:transition-all sm:hover:bg-slate-200
    "
  href="/Punchout/{punchout.id}"
>
  <span
    class="
        font-black
    ">#{punchout.id}</span
  ><br />
  <span>{punchoutDateFormat}</span><br />
  <span>Duration: {durationString}</span>
</a>
