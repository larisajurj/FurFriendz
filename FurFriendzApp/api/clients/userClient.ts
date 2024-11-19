mport { SpendWiseClient } from "../Base/BaseApiClients";
import { CategoryModel } from "../Models/CategoryModel"

export const UserClient = {
    urlPath:"user",
    //getCategories
    //ne va returna o lista de categorii
    getAllAsync():Promise<userModel[]>{
       /"fa un get de la urlPath"
    },
    getOneAsync(id:number):Promise<CategoryModel>{
        return SpendWiseClient.get<CategoryModel>(
            this.urlPath + "/GetCategory" + id).then(
                (response) => response.data
            );
    },
    createOneAsync(model:CategoryModel):Promise<CategoryModel>{
        return SpendWiseClient.post<CategoryModel>(
            this.urlPath + "/CreateCategory", model).then(
                (response) => response.data
            );
    },
    deleteOneAsync(id:number):Promise<any>{
        return SpendWiseClient.delete(
            this.urlPath + "/" + id).then(
                (response) => response.data
            );
    },
    updateOneAsync(id:number, model: CategoryModel):Promise<CategoryModel>{
        console.log("The id is: " + id + " and the model is: " + model.name);
        return SpendWiseClient.put(
            this.urlPath + "/" + id, model
        ).then(
            (response) => response.data
        )
    }

}