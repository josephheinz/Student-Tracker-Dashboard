import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
export let navLinks = writable([
  { href: "/", text: "Home" },
  { href: "/Students", text: "Students" },
]);
// globally subscribable and writable
export let students = writable<Student[]>([]);

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
