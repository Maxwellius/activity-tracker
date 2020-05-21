
interface IDuration {
    hours: number;
    minutes: number;
}
export default class Duration {
    public hours: number;
    public minutes: number;

    constructor(nbMinutes?: number, newDuration?: IDuration){
        if (nbMinutes != null && newDuration === null || nbMinutes === null && newDuration != null) { 
            // XOR : Les deux paramètres ne doivent pas être renseignés en même temps
            if (nbMinutes != null) {
                this.minutes = nbMinutes % 60;
                // tslint:disable-next-line: no-bitwise
                this.hours = ~~ (nbMinutes / 60);
            } else {
                this.hours = newDuration.hours;
                this.minutes = newDuration.minutes;
            }
        }
    }
    static checkValidite(durationToCheck: string): {isValid : boolean, newDuration?: Duration}{
        const regex = /^[0-9]{1,2}:[0-9]{1,2}$/;
        const test = regex.test(durationToCheck);
        if (test) {
            const colonPosition = durationToCheck.search(':');
            const firstPart = durationToCheck.substring(0, colonPosition);
            const secondPart = durationToCheck.substring(colonPosition + 1, durationToCheck.length);
            return {
                isValid: true,
                // tslint:disable-next-line: radix
                newDuration : new Duration(null,{hours: parseInt(firstPart), minutes : parseInt(secondPart)})
            }
        } else {
            console.log(durationToCheck, 'Le format est invalide');
            return {
                isValid: false,
                newDuration: null
            }
        }
    }

    static checkValiditeByValue(duration: IDuration){
        return (duration.hours >= 0 && duration.hours < 24
            && duration.minutes >= 0 && duration.minutes < 60
            && Duration.isInt(duration.minutes)
            && Duration.isInt(duration.hours));
    }

    static isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
      }

    addMinutes(minutes: number){
        const totalMinutes = (this.hours * 60) + (this.minutes) + minutes;
        // tslint:disable-next-line: no-bitwise
        this.hours = ~~(totalMinutes / 60);
        this.minutes = totalMinutes % 60;
    }

    incrementHours(): boolean{
        if(this.hours < 23){
            this.hours++;
            return true;
        } else {
            return false;
        }
    }

    canIncrement(): boolean{
        return (this.hours < 23);
    }

    canDecrement(): boolean{
        return (this.hours > 0);
    }

    decrementHours(): boolean{
        if(this.hours > 0){
            this.hours--;
            return true;
        } else {
            return false;
        }
    }

    toString(): string{
        return this.hours + ':' + this.minutes;
    }



}