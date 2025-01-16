import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
import * as signalR from "@microsoft/signalr";
export let navLinks = writable([
  { href: "/", text: "Home" },
  { href: "/Students", text: "Students" },
]);
// globally subscribable and writable
export let students = writable<Student[]>([]);
export let punchouts = writable<Punchout[]>([]);

export class Punchout {
  id: number = 0;
  reason: string = "Bathroom";

  nfcId: string | null = null;
  studentId: number = 0;
  duration: number = 310;
  timeback: string = "";
  timeout: string = "";

  constructor(
    id: number,
    reason: string,
    nfcId: string | null,
    studentId: number,
    duration: number,
    timeback: string,
    timeout: string
  ) {
    this.id = id;
    this.reason = reason;
    this.nfcId = nfcId;
    this.studentId = studentId;
    this.duration = duration;
    this.timeback = timeback;
    this.timeout = timeout;
  }
}

export class Student {
  age: number = 0;
  firstName: string = "";
  lastName: string | null = "";
  grade: number = 11;

  id: number = 0;
  nfcId: string = "";
  currentPunchout: number | null = 0;
  isActive: boolean = true;

  constructor(
    firstName: string,
    lastName: string | null,
    age: number,
    grade: number,
    id: number,
    nfcId: string,
    currentPunchout: number | null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.grade = grade;

    this.id = id;
    this.nfcId = nfcId;
    this.currentPunchout = currentPunchout;
  }
}

export const getPunchoutsByStudentId = async (
  id: number
): Promise<Punchout[]> => {
  let _p: Punchout[] = [];
  fetch(
    `https://student-tracker-api.azurewebsites.net/api/punchout/getPunchoutsByStudentId/${id}`,
    {
      method: "GET",
      headers: { ApiKey: "NFJejnqGdi" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // creates empty array to be filled by punchouts

      data.forEach((elem: Punchout) => {
        _p.push(
          new Punchout(
            elem.id,
            elem.reason,
            elem.nfcId,
            id,
            elem.duration,
            elem.timeback,
            elem.timeout
          )
        );
      });
      //console.log(_p)
      return _p;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  return _p;
};

export const getAllPunchouts = async (): Promise<Punchout[]> => {
  fetch("https://student-tracker-api.azurewebsites.net/api/punchout/getall", {
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
      // creates a temporary array which will overwrite the global punchouts array
      let _p: Punchout[] = [];
      data.forEach((elem: Punchout) => {
        _p.push(
          new Punchout(
            elem.id,
            elem.reason,
            elem.nfcId,
            elem.studentId,
            elem.duration,
            elem.timeback,
            elem.timeout
          )
        );

        punchouts.set(_p);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  return [];
};

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
      let _s: Array<Student> = [];
      data.forEach((elem: Student) => {
        if (!elem.isActive) return;
        _s.push(
          new Student(
            elem.firstName,
            elem.lastName,
            elem.age,
            elem.grade,
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

export const connection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("https://student-tracker-api.azurewebsites.net/punchoutHub", {
    accessTokenFactory: () => {
      return "NFJejnqGdi";
    },
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build();

connection
  .start()
  .then(function () {
    //console.log("Connection successful");
  })
  .catch(function (err) {
    return console.error(err.toString());
  });

connection.on("PunchoutCreated", function (punchout, student) {
  getAllStudents();
  getAllPunchouts();
});

connection.on("PunchoutClosed", function (info) {
  getAllStudents();
  getAllPunchouts();
});
