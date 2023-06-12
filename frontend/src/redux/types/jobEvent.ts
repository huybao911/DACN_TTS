export interface IJobEvent {
    _id: any;
    nameJob: string;
    gt: any;
    city: any;
    poster: any;
    quantity: number;
    quantityRemaining: number;
    salary: number;
    unitPrice: number;
    jobDescription: string;
    jobRequest: string;
    benefit: string;
    expirationDate: string;

    usersApplyJob:any;
    applyStatus: string;
    userApply: string;
    
    approve: string;
    readCV: string;
    update: string;
    delete: string;
  }