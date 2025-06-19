import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");
export type FetchShipment = {
  collectionId: string;
  collectionName: string;
  cost: number;
  created: string;
  height: number;
  id: string;
  insurance: string; // or boolean if you want to convert it
  length: number;
  packageDescription: string;
  recipientAddress: string;
  recipientCity: string;
  recipientName: string;
  recipientPhone: number | string;
  recipientState: string;
  recipientZip: string;
  senderAddress: string;
  senderCity: string;
  senderName: string;
  senderPhone: number | string;
  senderState: string;
  senderZip: string;
  serviceType: string;
  signatureRequired: string; // or boolean if you want to convert it
  trackingId: string;
  updated: string;
  user: string;
  value: number;
  weight: number;
  width: number;
  status: string
};
export type ExpressUser = {
  collectionId: string;
  collectionName: string;
  created: string;
  emailVisibility: boolean;
  id: string;
  updated: string;
  verified: boolean;
  email: string;
  name: string;
  phone: number;
  address:string;
};
type SignIn = {
  success: boolean;
  user?: ExpressUser;
  error?: string;
};

export interface ShipmentInput {
  // Sender Information
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  
  // Recipient Information
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  
  // Package Information
  packageDescription: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  value: number;
  cost: number;
  trackingId: string
  
  // Service Options
  serviceType: string;
  signatureRequired: boolean;
  insurance: boolean;
  user?: string;
  status: "processing"|"in transit"|"delivered";
}

// export const currentUserId = pb.authStore.export()?.model?.id;


export const signUp = async (
  email: string,
  password: string,
  passwordConfirm: string,
  name: string
) => {
  const user: ExpressUser = await pb.collection("expressUsers").create({
    email,
    password,
    passwordConfirm,
    name,
    emailVisibility: true,
  });
  const verify = await pb.collection("expressUsers").requestVerification(email);
  return {
    user,
  };
};

export const signIn = async (
  email: string,
  password: string
): Promise<SignIn> => {
  try {
    const user = await pb.collection("ExpressUsers").authWithPassword(email, password);
    const record: ExpressUser = {
      id: user.record.id,
      collectionId: user.record.collectionId,
      collectionName: user.record.collectionName,
      created: user.record.created,
      updated: user.record.updated,
      emailVisibility: user.record.emailVisibility,
      verified: user.record.verified,
      email: user.record.email,
      name: user.record.name,
      phone: user?.record?.phone,
      address: user?.record?.address,
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
        error: "Invalid email or password.",
      };
    }

    if (error?.status === 403) {
      // Forbidden (maybe account not verified or disabled)
      return {
        success: false,
        error: "Your account is restricted or unverified.",
      };
    }

    // Generic or unknown error
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};

export const signOut = () => {
  pb.authStore.clear();
};

export const createShipment = async (newShipment: ShipmentInput) => {
  try {
    const shipment: ShipmentInput = {
      senderName:  newShipment.senderName,
      senderPhone:  newShipment.senderPhone,
      senderAddress:  newShipment.senderAddress,
      senderCity:  newShipment.senderCity,
      senderState:  newShipment.senderState,
      senderZip:  newShipment.senderZip,

      recipientName:  newShipment.recipientName,
      recipientPhone:  newShipment.recipientPhone,
      recipientAddress:  newShipment.recipientAddress,
      recipientCity:  newShipment.recipientCity,
      recipientState:  newShipment.recipientState,
      recipientZip:  newShipment.recipientZip,

      packageDescription:  newShipment.packageDescription,
      weight:  newShipment.weight,
      length:  newShipment.length,
      width:  newShipment.width,
      height:  newShipment.height,
      value:  newShipment.value,
      cost: newShipment.cost,
      trackingId: newShipment.trackingId,

      serviceType:  newShipment.serviceType,
      signatureRequired:  newShipment.signatureRequired,
      insurance:  newShipment.insurance,
      user: newShipment.user,
      status: newShipment.status

    };

    const create = await pb.collection("shipments").create(shipment);
    if (!create.ok) {
      return console.log("failed request") ;
    }
    return create;
  } catch (error) {
    console.log(error);
  }
};

export const getUserShipments = async (userId: string) => {
  try {
    const records = await pb.collection('shipments').getFullList({
      filter: `user = "${userId}"`,
      sort: '-created', // newest first
    });
    return records as FetchShipment[];
  } catch (error) {
    console.error('Error fetching user shipments:', error);
    return [];
  }
};
export const getShipmentByTrackingId = async (trackingId: string): Promise<FetchShipment | null> => {
  try {
    const shipment = await pb.collection('shipments').getFirstListItem<FetchShipment>(
      `trackingId = "${trackingId}"`,
    );
    return shipment;
  } catch (error) {
    console.error("Shipment not found or error:", error);
    return null;
  }
};

export const profileUpdate = async (name:string,address:string,phone: number,id:string): Promise<ExpressUser>=>{
  const data = {
    name,
    address,
    phone,
  }
 const record: ExpressUser = await pb.collection('expressUsers').update(id, data);
 return record
}


export const getUsers = async ():Promise<ExpressUser[]>=>{
  const records = await pb.collection('expressUsers').getFullList({
    $autoCancel: false,
  });
  return records as ExpressUser[]
}
export const getShipments = async ():Promise<FetchShipment[]>=>{
  const records = await pb.collection('shipments').getFullList({
    $autoCancel: false,
  });
  return records as FetchShipment[]
}