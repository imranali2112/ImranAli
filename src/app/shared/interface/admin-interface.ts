import { Title } from "@angular/platform-browser";
import { EmailAuthCredential } from "firebase/auth";
 
export interface AdminInterface {
    about: AboutData;
    profile: profileData;
    service: serviceData;
    experience: ExperienceData;
    contact: contactData;
    testimonial: testimonialData; 
    projects: projectData;
    skill: skillData;

}

export interface AboutData {
    id: string,
    name: string;
    frontEnd: string;
    backEnd: string;
    education:string;
    experience: number;
    projects: number;
    clients: number;
    imageUrl: string;
}

export interface profileData {
    id?:string;
    name: string;
    email: String;
    contactNumber: number;
    description: string;
    linkdIn: string;
    fiverr: string;
    github: string;
    instagram: string;
    facebook: string; 
    image: string;
}

export interface serviceData {
    id: any
    title: string;
    description: string;
}

export interface ExperienceData {
    id?: any;
    title: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    createdAt?: Date;
}

export interface contactData{
    id?: any;
    name: string;
    email: EmailAuthCredential;
    subject: string;
    message: string;
}

export interface testimonialData{ 
    id?:any;
    title: string;
    description: string;
    name: string;
    companyName: string;
}

export interface projectData{
    id?:string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    projectUrl: string;
    projectImage: string;
}

export interface skillData{
    id?:any;
    title: string;
    imageUrl: string;
    createdAt: string;
}