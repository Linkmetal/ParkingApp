export interface BasicUser {
    username: string;
    password: string;
}

  
export interface User {
    username: string;
    password: string;
    id: number; // C# server ID
    name?: string;
    surename?: string;
    email?: string;
    phone?: string;
    model?: string;
    licensePlate?: string;
    image?: string;
}