import { Model } from "sequelize"

export const errorHelper = {
    getHelper(length: number) {
        if (length != 0) {
            return ('fetched successfully')
        }
        else {
            return ('none found')
        }
    },

    createHelper(model: Model) {
        if (model) {
            return ('created successfully')
        }
        else {
            return ('could not create new user')
        }
    },

    updateHelper(result: number) {
        if (result === 1) {
            return "updated successfully"
        }
        else {
            return "could not update, item does not exist"
        }
    },

    deleteHelper(result: number) {
        if (result === 1) {
            return "deleted successfully"
        }
        else {
            return "could not delete, item does not exist"
        }
    },

    cartHelper(result: number) {
        if (result === -3) {
            return "could not add item"
        }
        else if (result === -2) {
            return "user does not exist"
        }
        else if (result === -1) {
            return "product does not exist"
        }
        else if (result === 0) {
            return "sorry out of stock"
        }
        else {
            return "added to cart"
        }
    },

    orderHelper(result:number){
        if(result===1){
            return "checkout successful"
        }
        else{
            return "could not checkout"
        }
    }
}

