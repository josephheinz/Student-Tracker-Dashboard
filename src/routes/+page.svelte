<script lang="ts">
  import Window from "../Window.svelte";
  import Container from "../Container.svelte";
  import Navbar from "../Navbar.svelte";
  import { navLinks, students, Student } from "../store";

  async function getAllStudents(): Promise<Student[]> {
    fetch("https://student-tracker-api.azurewebsites.net/api/student/getall", {
      method: "GET",
      headers: { ApiKey: "NFJejnqGdi" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // creates a temporary array which will overwrite the global students array
        console.log(data);
        let _s: Array<Student> = [];
        data.forEach((elem: Student) => {
          if(!elem.isActive) return;
          _s.push(
            new Student(
              elem.firstName,
              elem.lastName,
              elem.id,
              elem.nfcId,
              elem.currentPunchout
            )
          );
        });

        students.set(_s);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    return [];
  }

  getAllStudents();
</script>

<title>Student Tracker Dashboard</title>

<Window title={"Student Tracker Dashboard"} id={"tracker-main"}>
  <Navbar {navLinks} />
</Window>
