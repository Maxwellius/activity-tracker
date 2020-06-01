import Duration from './Duration';
import { tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

export class Session {
    id: number;
    type: string; //SessionType
    nbPublications: number;
    nbVisites: number;
    nbVideos: number;
    duration: Duration; //Duration of the session in minutes
    comments: string;
    imagePath: string;
    date: string;
    constructor(
        id: number,
        type: string,
        nbPublications: number,
        nbVisites: number,
        nbVideos: number,
        duration: Duration,
        date: string,
        comments: string = '',
        imagePath: string = ''
    ){
        this.id = id;
        this.type = type;
        this.nbPublications = nbPublications;
        this.nbVisites = nbVisites;
        this.nbVideos = nbVideos;
        this.duration = duration;
        this.comments = comments;
        this.imagePath = imagePath;
        this.date = date;
    }
}