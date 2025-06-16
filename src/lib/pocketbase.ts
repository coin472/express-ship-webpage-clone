import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090/');
export type ExpressUser = {
  collectionId:string
  collectionName: string
  created:string
  emailVisibility: boolean
  id: string
  updated: string
  verified:boolean 
};
type SignIn = {
  success: boolean;
  user?: ExpressUser;
  error?: string
}

export type ShipmentInput = {
  // Sender
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;

  // Recipient
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;

  // Package
  packageDesc: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  packageValue: number;

  // Options
  serviceType: "Express" | "Standard" | "Economy";
  signatureRequired?: boolean;
  insurance?: boolean;
};


export const signUp = async (email: string,password: string,passwordConfirm: string,name: string)=>{
    const user: ExpressUser = await pb.collection('expressUsers').create({
      email,
      password,
      passwordConfirm,
      name,
    });
    const verify = await pb.collection('expressUsers').requestVerification(email);
    console.log(verify)
    return {
      user,
    }
}

export const signIn = async (email: string, password: string): Promise<SignIn> => {
  try {
    const user = await pb.collection('ExpressUsers').authWithPassword(email, password);
    const record: ExpressUser = {
    id: user.record.id,
    collectionId: user.record.collectionId,
    collectionName: user.record.collectionName,
    created: user.record.created,
    updated: user.record.updated,
    emailVisibility: user.record.emailVisibility,
    verified: user.record.verified,
  };
    return {
      success: true,
      user: record,
    };
  } catch (error: any) {
    // PocketBase error structure
    if (error?.status === 400) {
      // Invalid credentials
      return {
        success: false,
        error: 'Invalid email or password.',
      };
    }

    if (error?.status === 403) {
      // Forbidden (maybe account not verified or disabled)
      return {
        success: false,
        error: 'Your account is restricted or unverified.',
      };
    }

    // Generic or unknown error
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
};

export const signOut = () => {
  pb.authStore.clear(); 
};

export const createShipment = async (
  senderName: string,
  senderPhone: string,
  senderAddress: string,
  senderCity: string,
  senderState: string,
  senderZip: string,

  recipientName: string,
  recipientPhone: string,
  recipientAddress: string,
  recipientCity: string,
  recipientState: string,
  recipientZip: string,

  packageDesc: string,
  weight: number,
  length: number,
  width: number,
  height: number,
  packageValue: number,

  serviceType: "Express" | "Standard" | "Economy",
  signatureRequired?: boolean,
  insurance?: boolean,

)=>{

  try {
      const shipment = {
      senderName,
      senderPhone,
      senderAddress,
      senderCity,
      senderState,
      senderZip,

      recipientName,
      recipientPhone,
      recipientAddress,
      recipientCity,
      recipientState,
      recipientZip,

      packageDesc,
      weight,
      length,
      width,
      height,
      packageValue,

      serviceType,
      signatureRequired,
      insurance,
      }

      const create = await pb.collection("shipment").create(shipment)
      console.log(create)
      if(!create.ok){
        return console.log(create)
      }
      return create
    
  } catch (error) {
    console.log(error)
  }


}

