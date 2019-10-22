export interface ParkingLocation {
    _id?: string,
    username: string,
    timestamp: {
        in: number,
        out: number,
    };
    coords: {
        lat: number,
        long: number
    };
}
