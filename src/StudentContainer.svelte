<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

  import { Student } from "./store";
  const { student } = $props();
</script>

<a
  class="
        sm:border-4 sm:border-black sm:rounded-md sm:p-4 sm:m-1 sm:w-full sm:inline-block sm:flex sm:justify-stretch sm:items-center sm:gap-2
    "
  style="background:{student.currentPunchout === null ? '#a5fc8a' : '#fc8a8a'};"
  href="/Student/{student.id}"
>
  <FontAwesomeIcon
    icon={faLocationDot}
    style="color:{student.currentPunchout === null
      ? '#259125'
      : '#912525'};font-size:2rem;"
  />
  <div
    class="
    sm:flex sm:flex-col sm:justify-between sm:items-start
  "
  >
    <span class="font-bold">{student.firstName} {student.lastName}</span>
    <span>ID: {student.id}</span>
  </div>
</a>
