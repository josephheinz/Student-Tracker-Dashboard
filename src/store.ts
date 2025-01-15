import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
export let navLinks = writable([
  { href: "/", text: "Home" },
  { href: "/Students", text: "Students" },
]);
// globally subscribable and writable
export let students = writable<Student[]>([]);

export const getAllStudents = async (): Promise<Student[]> => {
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
        if (!elem.isActive) return;
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
};

export class Student {
  firstName: string = "";
  lastName: string | null = "";
  id: number = 0;
  nfcId: string = "";
  currentPunchout: number | null = 0;
  isActive: boolean = true;

  constructor(
    firstName: string,
    lastName: string | null,
    id: number,
    nfcId: string,
    currentPunchout: number | null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.nfcId = nfcId;
    this.currentPunchout = currentPunchout;
  }
}
