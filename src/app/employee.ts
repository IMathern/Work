export interface Employee {
    id: number;
    actif : boolean;
    nom: string;
    prenom : string;
    sexe : string;
    dateNaissance : Date;
    adresse : string;
    ville : string;
    codePostal : string;
    emailProfessionnel : string;
    emailPersonnel : string;
    phoneProfessionnel : number;
    phonePersonnel : number;
    idProfession : number;
    idTeam : number;
    idSportivite : number;
    idQualification : number;
    idSector : number;
    dateCreation : Date;
    dateModification : Date;

  }