export interface User {
    _id: string;
    user: string;
    interest: string[];
    age: number;
    mobile: number;
    email: string;
}

// Initial dummy data
// export const initialUsers: User[] = [
//     {
//         id: "1",
//         user: "Harry Potter",
//         interest: ["Magic", "Quidditch"],
//         age: 17,
//         mobile: 1234567890,
//         email: "harry@hogwarts.edu",
//     },
//     {
//         id: "2",
//         user: "Hermione Granger",
//         interest: ["Books", "Magic", "S.P.E.W."],
//         age: 17,
//         mobile: 2345678901,
//         email: "hermione@hogwarts.edu",
//     },
//     {
//         id: "3",
//         user: "Ron Weasley",
//         interest: ["Chess", "Quidditch", "Food"],
//         age: 17,
//         mobile: 3456789012,
//         email: "ron@hogwarts.edu",
//     },
// ];
