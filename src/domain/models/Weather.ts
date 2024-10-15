export class Weather {
    
    constructor(
        public main: string,
        public description: string,
        public temperature: number,
        public feels_like: number,
        public temp_min: number,
        public temp_max: number,
        public humidity: number
    ) { }
}
