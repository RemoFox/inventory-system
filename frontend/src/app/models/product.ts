export interface Product {
    
_id?:string;
name:string;
price:number;
quantity:number;
description?:string;
image?:string;
createdAt?:Date;
updatedAt?:Date;
  category?: {
    _id: string;
    name: string;
  };
}
