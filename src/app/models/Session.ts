import Duration from './Duration';
import { tick } from '@angular/core/testing';

export class Session {
    type: string; //SessionType
    nbPublications: number;
    nbVisits: number;
    duration: Duration; //Duration of the session in minutes
    comments: string;
    imagePath: string;
    date: string;

    constructor(type: string, nbPublications: number, nbVisits: number, duration: Duration, date: string, comments: string = "", imagePath: string = ""){
        this.type = type;
        this.nbPublications = nbPublications;
        this.nbVisits = nbVisits;
        this.duration = duration;
        this.comments = comments;
        this.imagePath = imagePath;
        this.date = date;
    }
}