export const MockDatabase = {
    user: [
        { id: "1", username: "admi01", password: "admi123", rol: ""},
        { id: "2", username: "admi02", password: "admi456", rol: ""}
    ],

    tickets: [
        { id: "1", numbre: "000001", date: "10/12/2024", status: "En Progreso", conection: "Online", assiggnedTo: "1", responsable: "admi02"},
        { id: "2", numbre: "000321", date: "10/12/2024", status: "Solucionado", conection: "Offline", assiggnedTo: "1", responsable: "admi02"},
        { id: "3", numbre: "000340", date: "10/12/2024", status: "En Progreso", conection: "Offline", assiggnedTo: "1", responsable: "admi02"},
        { id: "4", numbre: "000340", date: "10/12/2024", status: "Abierto", conection: "Online", assiggnedTo: "2", responsable: "admi01"},
        { id: "5", numbre: "000340", date: "10/12/2024", status: "En Progreso", conection: "Offline", assiggnedTo: "2", responsable: "admi01"},
    ]
}