export class Session {
    type: string; //SessionType
    nbPublications: number;
    nbVisits: number;
    duration: number; //Duration of the session in minutes
    comments: string;
    imagePath: string;

    constructor(type: string, nbPublications: number, nbVisits: number, duration: number, comments: string = "", imagePath: string = ""){
        this.type = type;
        this.nbPublications = nbPublications;
        this.nbVisits = nbVisits;
        this.duration = duration;
        this.comments = comments;
        this.imagePath = imagePath;
    }
}