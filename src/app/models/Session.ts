import Duration from './Duration';
import { tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

export class Session {
    id: number;
    type: string; //SessionType
    nbPublications: number;
    nbVisits: number;
    duration: Duration; //Duration of the session in minutes
    comments: string;
    imagePath: string;
    date: string;
    storage: Storage;
    constructor(id: number, type: string, nbPublications: number, nbVisits: number, duration: Duration, date: string, comments: string = "", imagePath: string = ""){
        this.id = id;
        this.type = type;
        this.nbPublications = nbPublications;
        this.nbVisits = nbVisits;
        this.duration = duration;
        this.comments = comments;
        this.imagePath = imagePath;
        this.date = date;
    }
}